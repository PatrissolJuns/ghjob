import _ from 'lodash';
import Filters from './Filters';
import NotFound from './NotFound';
import Job from '../../models/Job';
import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import {searchJobs} from '../../urls/backend';
import Animated from "react-native-reanimated";
import MaterialChip from '../../components/Chip';
import {FONT_BOLD} from '../../styles/typography';
import BottomSheet from 'reanimated-bottom-sheet';
import JobItemWide from '../../components/JobItemWide';
import {getPublishedAtTime} from '../../service/helper';
import {Colors, GENERAL_STYLE_SETTING} from '../../styles';
import PublishedTimeType from '../../enums/PublishedTimeType';
import CustomHeaderPage from '../../components/CustomHeaderPage';
import FetchFailedComponent from '../../components/FetchFailedComponent';
import {
    View,
    TextInput,
    ScrollView,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

const height = Dimensions.get('window').height;

const defaultFilters = {
    location: '',
    fullTime: false,
    publishedAt: {name: "Any time", value: PublishedTimeType.ANY_TIME},
};

/**
 * Main Search Feature
 */
class Search extends Component {
    constructor(props) {
        super(props);

        const searchParams = this.props.route.params ? this.props.route.params.searchParams : null;

        this.state = {
            searched: searchParams && searchParams.searched ? searchParams.searched : '',
            showFilter: false,
            filters: {
                fullTime: searchParams && searchParams.fullTime
                    ? searchParams.fullTime : defaultFilters.fullTime,
                location: searchParams && searchParams.location
                    ? searchParams.location : defaultFilters.location,
                publishedAt: searchParams && searchParams.publishedAt
                    ? searchParams.publishedAt : defaultFilters.publishedAt,
            },
            jobs: [],
            error: null,
            loading: false,
            page: 1,
            canLoadMore: true,
            showScrollLoader: false,
            refreshing: false,
        }
    }

    componentDidMount() {
        this.performSearch();
    }

    performSearch = (shouldRefresh = true) => {
        this.setState({loading: true});
        searchJobs(
            this.state.searched.length === 0 ? null : this.state.searched,
            this.state.filters.fullTime,
            this.state.filters.location.length === 0 ? null : this.state.filters.location,
            this.state.page,
        )
            .then(result => {
                const data = result.map(j => new Job(j));
                this.setState(prevState => ({
                    jobs: shouldRefresh ? data : [...prevState.jobs, ...data],
                    loading: false,
                    error: null,
                    canLoadMore: result.length !== 0
                }));
            })
            .catch(error => {
                this.setState({error, loading: false});
            })
    };

    debounceSearch = () => {
        if (!this.debouncedFn) {
            this.debouncedFn = _.debounce(this.performSearch, 500);
        }
        this.debouncedFn();
    };

    // sheetRef = null;
    sheetRef = React.createRef();

    fall = new Animated.Value(1);

    renderHeader = () => <View style={styles.header} />;

    renderContent = () => (
        <View style={styles.renderContent}>
            <Filters
                fullTime={this.state.filters.fullTime}
                location={this.state.filters.location}
                publishedAt={this.state.filters.publishedAt}
                onFilterDone={(data) => this.onApplyFilter(data)}
            />
        </View>
    );

    onSearchChange = (text) => {
        this.setState(
            {searched: text},
            () => this.debounceSearch()
        )
    };

    onFilterPress = () => {
        this.setState(prevState => ({showFilter: !prevState.showFilter}));
    };

    onHideShowFilter = (shouldShow) => {
        this.setState({showFilter: shouldShow});
    };

    onApplyFilter = (data) => {
        const performNewSearch = this.state.filters.fullTime !== data.fullTime
            || this.state.filters.location !== data.location;

        this.setState(
            {
                filters: {
                    fullTime: data.fullTime,
                    location: data.location,
                    publishedAt: data.publishedAt,
                },
                page: 1,
                showFilter: false,
            },
            () => {
                if (performNewSearch)
                    this.performSearch();
            }
        );
    };

    render() {
        const { searched, showFilter, loading, error, jobs, filters, canLoadMore, showScrollLoader, refreshing } = this.state;

        let filteredJobs = jobs;

        if (error) {
            return (<FetchFailedComponent onRetryClick={this.loadData} />)
        }

        if (this.sheetRef && this.sheetRef.current) this.sheetRef.current.snapTo(showFilter ? 0 : 1);

        if (
            PublishedTimeType.getStaticValueList().includes(filters.publishedAt.value)
            && filters.publishedAt.value !== PublishedTimeType.ANY_TIME
        ) {
            filteredJobs = jobs.filter(j => getPublishedAtTime(filters.publishedAt.value).isBefore(j.createdAt));
        }

        return (
            <>
                <ScrollView style={styles.container}>
                    {showFilter && (<View style={styles.layer} />)}
                    <CustomHeaderPage
                        title="Search"
                        onBackPressed={() => this.props.navigation.goBack()}
                    />
                    <View style={styles.wrapper}>
                        <View style={styles.searchWrapper}>
                            <TextInput
                                value={searched}
                                style={styles.searchInput}
                                placeholder={"Full Stack"}
                                onChangeText={text => this.onSearchChange(text)}
                            />
                            <TouchableOpacity
                                hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                                onPress={() => this.onHideShowFilter(true)}
                                style={styles.searchFilterBtn}
                            >
                                <Icon
                                    name='equalizer'
                                    color={Colors.WHITE}
                                    type="simple-line-icon"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.filtersWrapper}>
                            {filters.fullTime && (
                                <MaterialChip
                                    text="Full Time"
                                    onDelete={() => this.setState(
                                        prevState => ({filters: {
                                            ...prevState.filters,
                                            fullTime: defaultFilters.fullTime
                                        }}),
                                        () => this.performSearch()
                                    )}
                                    leftIcon={(
                                        <Icon
                                            name="clock-time-twelve-outline"
                                            type="material-community"
                                        />
                                    )}
                                />
                            )}

                            {filters.location.length > 0 && (
                                <MaterialChip
                                    text={filters.location}
                                    onDelete={() => this.setState(
                                        prevState => ({filters: {
                                                ...prevState.filters,
                                                location: defaultFilters.location
                                            }}),
                                        () => this.performSearch()
                                    )}
                                    leftIcon={(
                                        <Icon
                                            name="map-marker-outline"
                                            type="material-community"
                                        />
                                    )}
                                />
                            )}

                            {filters.publishedAt.value !== PublishedTimeType.ANY_TIME && (
                                <MaterialChip
                                    text={filters.publishedAt.name}
                                    onDelete={() => this.setState(
                                        prevState => ({filters: {
                                                ...prevState.filters,
                                                publishedAt: defaultFilters.publishedAt
                                            }})
                                    )}
                                    leftIcon={(
                                        <Icon
                                            name="calendar-month-outline"
                                            type="material-community"
                                        />
                                    )}
                                />
                            )}
                        </View>

                        {loading && !showScrollLoader && !refreshing ? (
                            <View style={{height}}>
                                <ActivityIndicator
                                    size="large"
                                    animating={true}
                                    color={Colors.PRIMARY}
                                    style={{marginVertical: 15}}
                                />
                            </View>
                        ) : (
                            <View style={{marginVertical: 15}}>
                                {filteredJobs.length === 0 ? (
                                    <NotFound />
                                ) : filteredJobs.map((job, index) => (
                                    <JobItemWide
                                        key={index}
                                        job={job}
                                    />
                                ))}
                            </View>
                        )}

                    </View>
                </ScrollView>
                <BottomSheet
                    ref={this.sheetRef}
                    // snapPoints={[550, 100, 0]}
                    snapPoints={[550, 0, 0]}
                    borderRadius={40}
                    initialSnap={2} // To hide initially
                    callbackNode={this.fall} // To handle animation
                    renderContent={this.renderContent}
                    enabledBottomInitialAnimation={true}
                    enabledContentGestureInteraction={true}
                    onCloseEnd={() => this.onHideShowFilter(false)}
                />
            </>
        );
    }
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: Colors.WHITE_LIGHT,
    },
    wrapper: {
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_HORIZONTAL,
    },
    layer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(189, 185, 199, 0.5)',
        zIndex: 10
    },
    searchWrapper: {
        // flex: 1,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        backgroundColor: Colors.FORM_BG,
        paddingHorizontal: 20,
        marginRight: 10,
        borderRadius: 10,
        ...FONT_BOLD,
        ...GENERAL_STYLE_SETTING.TEXT_INPUT_FONT_SIZE,
        ...GENERAL_STYLE_SETTING.BUTTON_HEIGHT,
        ...GENERAL_STYLE_SETTING.BUTTON_PADDING,
    },
    searchFilterBtn: {
        width: 50,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: Colors.PRIMARY,
        ...GENERAL_STYLE_SETTING.CENTER_HOR_VER,
        borderColor: Colors.PRIMARY,
    },
    header: {
        width: '100%',
        height: 100,
        backgroundColor: 'transparent',
        // backgroundColor: 'red',
        zIndex: 0
    },
    searchCountText: {
        color: Colors.DARK,
    },
    renderContent: {
        // flex: 1,
        // flexDirection: "column",
        width: '100%',
        height: '100%',
        // padding: 20,
        // backgroundColor: '#2c2c2fAA',
        backgroundColor: Colors.WHITE,
        // paddingTop: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        /*shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.4,*/
    },
    filtersWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    }
});
