import Job from '../models/Job';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {tags} from '../service/helper';
import {Icon} from 'react-native-elements';
import {HOW_TO_APPLY} from '../urls/routes';
import HTML from 'react-native-render-html';
import {getOneJobById} from '../urls/backend';
import FontText from '../components/FontText';
import {toggleBookmarkedJob} from '../redux/actions';
import FullScreenLoader from '../components/FullScreenLoader';
import {Colors, GENERAL_STYLE_SETTING, Typography} from '../styles';
import FetchFailedComponent from '../components/FetchFailedComponent';
import {
    View,
    Alert,
    Image,
    Share,
    Linking,
    Dimensions,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const width = Dimensions.get('window').width;
const tagsColors = tags.reduce((acc, b) => ({...acc, [b]: {color: Colors.DARK}}), {});

class JobScreen extends Component {
    constructor(props) {
        super(props);
        this.jobId = this.props.route.params.jobId;

        this.state = {
            job: null,
            activeTab: 0,
            loading: false,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.setState({loading: true});
        getOneJobById(this.props.route.params.jobId)
        // getOneJobById("1731001f-91e1-415e-a865-898a9f1279fa")
            .then(job => this.setState({job: new Job(job)}))
            .catch(() => {
                Alert.alert("An error occur. Please try again later");
            })
            .finally(() => this.setState({loading: false}));
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.route.params.jobId !== this.props.route.params.jobId) {
            this.loadData();
        }
    }

    onBackPressed = () => {
        this.props.navigation.goBack();
    };

    handleOnTabChange = () => {
        this.setState(prevState => ({
            activeTab: prevState.activeTab === 0 ? 1 : 0
        }));
    };

    /**
     * Open navigation intent
     */
    handleUrlPress = async () => {
        const url = this.state.job.company.url;
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    };

    /**
     * Share a job
     */
    handleOnShare = async () => {
        try {
            const result = await Share.share({
                message: `Hi, Please check out this job: ${this.state.job.title}. Don't forget to download GhJob to get more jobs`,
                url: this.state.job.url
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    handleOnBookmarkedPress = () => {
        this.props.toggleBookmarkedJob(this.state.job.id);
    };

    render() {
        const { job, activeTab, loading } = this.state;
        const { bookmarkedJobs } = this.props;

        if (loading) {
            return (<FullScreenLoader />)
        }

        if (!job) {
            return (<FetchFailedComponent onRetryClick={this.loadData} />)
        }

        const isBookmarked = bookmarkedJobs.includes(job.id);

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                        onPress={() => this.onBackPressed()}
                    >
                        <Icon
                            type="ionicon"
                            name='arrow-back'
                            color={Colors.DARK}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                        onPress={this.handleOnShare}
                    >
                        <Icon
                            type="ionicon"
                            color={Colors.DARK}
                            name='ios-share-social-outline'
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.details}>
                    <View style={styles.imgWrapper}>
                        <Image
                            source={{uri: job.company.logo}}
                            style={styles.img}
                        />
                    </View>
                    <FontText style={styles.title}>
                        {job.title}
                    </FontText>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.locationWrapper}>
                            <Icon
                                size={14}
                                type="ionicon"
                                color={Colors.PRIMARY}
                                name='calendar-outline'
                                style={{marginRight: 2}}
                            />
                            <FontText style={styles.subTitle}>
                                {job.createdAt.fromNow()}
                            </FontText>
                        </View>
                        <View style={[styles.locationWrapper, {marginLeft: 5}]}>
                            <Icon
                                size={14}
                                type="ionicon"
                                color={Colors.PRIMARY}
                                name='location-outline'
                            />
                            <FontText style={styles.subTitle}>
                                {job.location}
                            </FontText>
                        </View>
                    </View>
                </View>
                <View style={styles.tabs}>
                    {['Description', 'Company'].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                            onPress={this.handleOnTabChange}
                            style={[
                                styles.tabItem,
                                activeTab === index ? styles.tabItemBlack : {},
                                index === 0 ? {} : {marginLeft: 10}
                            ]}
                        >
                            <FontText style={[
                                styles.tabItemText,
                                activeTab === index ? styles.tabItemTextBlack : {},
                            ]}
                            >
                                {item}
                            </FontText>
                        </TouchableOpacity>
                    ))}
                </View>

                {activeTab === 0 ? (
                    <ScrollView style={[styles.content]}>
                        <HTML
                            html={job.description}
                            // html={job.descNoTags}
                            // tagsStyles={{...tagsColor}}
                            // tagsStyles={{...tagsColor}}
                            // contentWidth={width}
                            imagesMaxWidth={width}
                        />
                    </ScrollView>
                ) : (
                    <View style={{flex: 1, alignItems: 'center', }}>
                        <View style={{
                            // flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            maxWidth: '80%',
                            backgroundColor: Colors.WHITE,
                            padding: 20,
                            marginVertical: 20,
                            borderRadius: 20,
                        }}>
                            <Image
                                source={{uri: job.company.logo}}
                                style={styles.img}
                            />
                            <FontText style={[styles.subTitle, {fontSize: 20, marginVertical: 20, ...Typography.FONT_BOLD}]}>
                                {job.company.name}
                            </FontText>
                            <TouchableOpacity hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP} onPress={this.handleUrlPress}>
                                <FontText style={[styles.subTitle, {color: Colors.PRIMARY, ...Typography.FONT_BOLD}]}>
                                    {job.company.url}
                                </FontText>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonsWrapper}>
                        <TouchableOpacity
                            style={styles.buttonsIcon}
                            onPress={this.handleOnBookmarkedPress}
                            hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                        >
                            <Icon
                                name={isBookmarked ? "heart" : "hearto"}
                                type="antdesign"
                                color={Colors.PRIMARY}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            hitSlop={GENERAL_STYLE_SETTING.HIT_SLOP}
                            // onPress={this.toggleOverlay}
                            onPress={() => this.props.navigation.navigate(HOW_TO_APPLY, {
                                howToApply: job.howToApply
                            })}
                            style={[
                                styles.buttonsApply,
                            ]}
                        >
                            <FontText style={{color: Colors.WHITE, ...Typography.FONT_BOLD}}
                            >
                                Apply jor this job
                            </FontText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect(({bookmarkedJobs}) => ({bookmarkedJobs}), {toggleBookmarkedJob})(JobScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: Colors.WHITE_LIGHT,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_HORIZONTAL,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_TOP,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    details: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgWrapper: {
        // backgroundColor: 'blue',
        marginBottom: 10,
        borderRadius: 20,
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    img: {
        borderRadius: 20,
        width: 80,
        height: 80
    },
    title: {
        fontSize: 17,
        marginTop: 8,
        // maxWidth: '80%',
        // textAlign: 'left',
        // backgroundColor: 'red',
        color: Colors.BLACK,
        ...Typography.FONT_BOLD,
    },
    subTitle: {
        ...GENERAL_STYLE_SETTING.NORMAL_TEXT_FONT_SIZE,
        // marginVertical: 8,
        color: Colors.BLACK,
    },
    locationWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    tabItem: {
        backgroundColor: "#f3f4f8",
        borderRadius: 15,
        ...GENERAL_STYLE_SETTING.SMALL_BUTTON_PADDING,
        // ...GENERAL_STYLE_SETTING.BUTTON_HEIGHT,
    },
    tabItemBlack: {
        backgroundColor: Colors.DARK,
    },
    tabItemTextBlack: {
        color: Colors.WHITE,
    },
    tabItemText: {
        color: Colors.GRAY_DARK,
    },
    content: {
        marginVertical: 20,
        marginBottom: GENERAL_STYLE_SETTING.BUTTON_HEIGHT.height + 5,
        backgroundColor: Colors.WHITE,
        padding: 15,
        borderRadius: 15,
    },
    buttonsContainer: {
        // backgroundColor: 'red',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    buttonsWrapper: {
        flex: 1,
        paddingVertical: 15,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_HORIZONTAL,
        flexDirection: 'row',
        backgroundColor: Colors.WHITE,
    },
    buttonsIcon: {
        // flex: 1,
        width: 50,
        borderWidth: 1,
        borderRadius: 10,
        ...GENERAL_STYLE_SETTING.CENTER_HOR_VER,
        borderColor: Colors.PRIMARY,
    },
    buttonsApply: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 10,
        ...GENERAL_STYLE_SETTING.CENTER_HOR_VER,
        borderColor: Colors.PRIMARY,
        backgroundColor: Colors.PRIMARY,
        ...GENERAL_STYLE_SETTING.BUTTON_HEIGHT,
    }
});
