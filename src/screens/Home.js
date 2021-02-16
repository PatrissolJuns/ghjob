import {connect} from 'react-redux';
import {DARK} from '../styles/colors';
import React, { Component } from 'react';
import PlText from '../components/PLText';
import {Text} from 'react-native-elements';
import {JOB, SEARCH} from '../urls/routes';
import {getAllJobs} from '../redux/actions';
import HeaderPage from '../components/HeaderPage';
import JobItemWide from '../components/JobItemWide';
import NormalLoader from '../components/NormalLoader';
import JobItemCircle from '../components/JobItemCircle';
import BottomPadding from '../components/BottomPadding';
import languageData from '../components/programming-icons/data';
import {isCloseToBottom, isCloseToTop} from '../service/helper';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import {Colors, GENERAL_STYLE_SETTING, Typography} from '../styles';
import FetchFailedComponent from '../components/FetchFailedComponent';
import {RefreshControl, ScrollView, StyleSheet, View, Linking} from 'react-native';

/**
 * Home Screen
 */
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            showScrollLoader: false,
        }
    }

    componentDidMount() {
        this.loadData();

        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
        }
    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = (event) => {
        if (event && event.hasOwnProperty('url')) this.navigate(event.url);
    };

    navigate = (url) => {
        if (url) {
            const { navigate } = this.props.navigation;
            const route = url.replace(/.*?:\/\//g, '');
            const id = route.match(/\/([^\/]+)\/?$/)[1];
            const routeName = route.split('/')[0];

            if (routeName === 'ghjob' || routeName === 'www.m.ghjob.com') {
                navigate(JOB, {
                    jobId: id,
                });
            }
        }
    };

    loadData = () => {
        this.props.getAllJobs(this.props.allJobs.page)
            .then(() => {
                // Load more data since we only fetch 15 at time
                this.loadMoreData();
            });
    };

    loadMoreData = () => {
        if (this.props.allJobs.canLoadMore) {
            this.setState({showScrollLoader: true});
            this.props.getAllJobs(this.props.allJobs.page + 1).then(() => {
                this.setState({showScrollLoader: false});
            });
        }
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.props.getAllJobs(0, true).then(() => {
            this.setState({refreshing: false});
        });
    };

    render () {
        const { allJobs, loading, error, navigation } = this.props;
        const { refreshing, showScrollLoader } = this.state;

        /*if (loading && !showScrollLoader && !refreshing) {
            return (<FullScreenLoader />);
        }*/

        if (error) {
            return (<FetchFailedComponent onRetryClick={this.loadData} />)
        }

        const recentJobs = allJobs.data.slice(0, 10);
        const moreJobs = allJobs.data.slice(11, allJobs.data.length);
        return (
            <View style={styles.wrapper}>
                <FocusAwareStatusBar
                    animated
                    barStyle="dark-content"
                    backgroundColor={Colors.WHITE_LIGHT}
                />
                <HeaderPage
                    headerText={'Home'}
                    navigation={navigation}
                />
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    onScroll={({nativeEvent})=>{
                        if (isCloseToTop(nativeEvent)) {
                            // do something
                        }

                        if (isCloseToBottom(nativeEvent)) {
                            // do something
                            if (allJobs.canLoadMore && !showScrollLoader) {
                                this.loadMoreData();
                            }
                        }
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                            colors={[Colors.PRIMARY, Colors.SECONDARY]}
                        />
                    }
                >
                    <View style={{marginBottom: 15}}>
                        <Text h3 style={{color: DARK}}>Find your dream job</Text>
                    </View>
                    <View style={{marginBottom: 15}}>
                        <Text style={styles.sectionTitle}>Recent jobs</Text>
                    </View>
                    {loading && !showScrollLoader && !refreshing ? (
                        <NormalLoader />
                    ) : (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {recentJobs.map((job, index) => (
                                <JobItemCircle
                                    key={index}
                                    color={index % 2 !== 0 ? 'primary' : 'white'}
                                    job={job}
                                />
                            ))}
                        </ScrollView>
                    )}

                    <View style={[styles.sector]}>
                        <Text style={styles.sectionTitle}>Languages & Frameworks</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {languageData.map(({name, component}, index) => (
                            <PlText
                                key={index}
                                name={name}
                                component={component}
                                onPress={() => navigation.navigate(SEARCH, {
                                    searchParams: {
                                        searched: name
                                    }
                                })}
                            />
                        ))}
                    </ScrollView>

                    <View style={[styles.sector, {marginTop: 30}]}>
                        <Text style={styles.sectionTitle}>More jobs</Text>
                    </View>

                    <ScrollView>
                        {moreJobs.map((job, index) => (
                            <JobItemWide
                                key={index}
                                // color={i % 2 !== 0 ? 'primary' : 'white'}
                                job={job}
                            />
                        ))}
                    </ScrollView>
                    <BottomPadding
                        showLoader={showScrollLoader}
                        backgroundColor={Colors.WHITE_LIGHT}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: Colors.WHITE,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING,
    },
    wrapper: {
        flex: 1,
        backgroundColor: Colors.WHITE_LIGHT
    },
    sectionTitle: {
        ...Typography.FONT_BOLD,
        color: DARK,
        fontSize: 19,
    },
    mt_15: {
        marginVertical: 15,
    },
    mt_30: {
        marginVertical: 30,
    },
    sector: {
        marginTop: 30,
        marginBottom: 15
    }
});

const mapStateToProps = ({ allJobs }) => {
    return {
        allJobs: allJobs.member,
        error: allJobs.error,
        loading: allJobs.loading,
    };
};

export default connect(mapStateToProps, {getAllJobs})(Home);
