import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import FontText from '../../components/FontText';
import {Colors, GENERAL_STYLE_SETTING, Typography} from '../../styles';
import FastImageBackground from '../../components/FastImageBackground';

const OnBoardingOne = ({onClick}) => {
    return (
        <FastImageBackground
            style={styles.container}
            source={require('../../assets/images/find_jobs.png')}
        >
            <View style={styles.wrapper}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>
                        Find a perfect job match
                    </Text>
                    <FontText style={styles.subTitle}>
                        Find your dream job is now much easier and faster like never before
                    </FontText>
                </View>
                <View style={styles.btnRoot}>
                    <View style={styles.btnWrapper}>
                        <TouchableOpacity
                            onPress={onClick}
                            activeOpacity={0.8}
                            style={styles.btnContainer}
                        >
                            <View style={styles.btnLeft}>
                                <Text style={styles.btnLeftText}>
                                    Next
                                </Text>
                            </View>
                            <View style={styles.btnRight}>
                                <View style={styles.btnIconWrapper}>
                                    <Image
                                        source={require('../../assets/images/three-chevron-arrows-pointing-right.png')}
                                        width={10}
                                        height={10}
                                        style={styles.btnIcon}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </FastImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.WHITE_THIN,
        flex: 1,
        // flexDirection: 'column',
        justifyContent: 'flex-end',
        // alignItems: 'space-between',
    },
    wrapper: {
        // flex: 1,
        backgroundColor: Colors.WHITE,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        padding: 20,
        // paddingTop: 50,
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING_HORIZONTAL,
    },
    titleWrapper: {
        // backgroundColor: 'red',
        // textAlign: 'center',
        // flex: 1,
        // justifyContent: 'center',
    },
    title: {
        ...GENERAL_STYLE_SETTING.BIG_TITLE_FONT_SIZE,
        ...Typography.FONT_BOLD,
        marginVertical: 10,
        // textAlign: 'center',
    },
    subTitle: {
        ...GENERAL_STYLE_SETTING.NORMAL_TEXT_FONT_SIZE,
        marginBottom: 20,
        // textAlign: 'center',
    },
    imgWrapper: {
        flex: 1,
        ...GENERAL_STYLE_SETTING.CENTER_HOR_VER,
        // maxHeight: '100%',
        // flex: 2,
        // justifyContent: 'center',
    },
    btnRoot: {
        paddingBottom: 20,
        // flex: 1,
        // backgroundColor: 'blue',
    },
    btnWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        height: 58,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    btnLeft: {
        marginHorizontal: 15,
        backgroundColor: Colors.WHITE,
    },
    btnLeftText: {
        color: Colors.PRIMARY,
        ...Typography.FONT_BOLD,
        fontSize: 16,
    },
    btnRight: {
        height: '100%',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.PRIMARY,
    },
    btnIconWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnIcon: {
        width: 25,
        height: 25,
        tintColor: Colors.WHITE
    },
});

export default OnBoardingOne;
