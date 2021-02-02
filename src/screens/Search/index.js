import Filters from './Filters';
import Job from '../../models/Job';
import React, {Component} from 'react';
import {Icon} from 'react-native-elements';
import {searchJobs} from '../../urls/backend';
import Animated from "react-native-reanimated";
import {FONT_BOLD} from '../../styles/typography';
import BottomSheet from 'reanimated-bottom-sheet';
import JobItemWide from '../../components/JobItemWide';
import {Colors, GENERAL_STYLE_SETTING} from '../../styles';
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

/**
 * Main Search Feature
 */
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searched: '',
            showFilter: false,
            filters: {
                location: '',
                fullTime: false,
                publishedAt: '',
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

    // sheetRef = null;
    sheetRef = React.createRef();

    fall = new Animated.Value(1);

    renderHeader = () => <View style={styles.header} />;

    renderContent = () => (
        <View style={{
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
        }}>
            <Filters
                onFilterDone={(data) => this.onApplyFilter(data)}
            />
        </View>
    );

    onSearchChange = (text) => {
        this.setState(
            {searched: text},
            () => this.performSearch()
        )
    };

    onFilterPress = () => {
        this.setState(prevState => ({showFilter: !prevState.showFilter}));
    };

    onApplyFilter = (data) => {
        this.setState(
            {
                filters: {
                    location: data.location,
                    fullTime: data.fullTime,
                    publishedAt: data.publishedAt,
                },
                page: 0,
                showFilter: false,
            },
            () => {
                this.performSearch();
            }
        );
    };

    render() {
        const { searched, showFilter, loading, error, jobs, canLoadMore, showScrollLoader, refreshing } = this.state;

        if (error) {
            return (<FetchFailedComponent onRetryClick={this.loadData} />)
        }

        if (this.sheetRef && this.sheetRef.current) this.sheetRef.current.snapTo(showFilter ? 0 : 1);

        return (
            <>
                <ScrollView>
                    {showFilter && (<View style={styles.layer} />)}
                    <CustomHeaderPage
                        title="Search"
                        onBackPressed={() => this.props.navigation.goBack()}
                    />
                    {/*<View style={[styles.container, showFilter ? {backgroundColor: Colors.GRAY_MEDIUM} : {}]}>*/}
                    <View style={[styles.container]}>
                        <View style={styles.searchWrapper}>
                            <TextInput
                                value={searched}
                                style={styles.searchInput}
                                placeholder={"Full Stack"}
                                onChangeText={text => this.onSearchChange(text)}
                            />
                            <TouchableOpacity
                                hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                                onPress={this.onFilterPress}
                                style={styles.searchFilterBtn}
                            >
                                <Icon
                                    name='equalizer'
                                    color={Colors.WHITE}
                                    type="simple-line-icon"
                                />
                            </TouchableOpacity>
                        </View>

                        {loading && !showScrollLoader && !refreshing ? (
                            <View style={{height}}>
                                <ActivityIndicator
                                    size="large"
                                    animating={true}
                                    color={Colors.PRIMARY}
                                    style={{
                                        marginVertical: 15,
                                        backgroundColor: "transparent"
                                    }}
                                />
                            </View>
                        ) : (
                            <View style={{marginVertical: 15}}>
                                {jobs.map((job, index) => (
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
                    // snapPoints={[450, 300, 0]}
                    snapPoints={[550, 100, 0]}
                    borderRadius={40}
                    initialSnap={1} // To hide initially
                    callbackNode={this.fall} // To handle animation
                    renderHeader={showFilter ? null : this.renderHeader}
                    renderContent={this.renderContent}
                    enabledBottomInitialAnimation={true}
                    enabledGestureInteraction={false}
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
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_HORIZONTAL,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_TOP,
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
        zIndex: 0
    },
    searchCountText: {
        color: Colors.DARK,
    }
});
