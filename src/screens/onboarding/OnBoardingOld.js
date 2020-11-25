import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar, Image, TouchableOpacity,
} from 'react-native';
import Interview from '../../assets/images/interview.svg';
import {Colors, GENERAL_STYLE_SETTING, Typography} from '../../styles';
import FontText from '../../components/FontText';
import {setAsyncData} from '../../service/asynsStorage';
import {HOME} from '../../urls/routes';

const OnBoarding = (props) => {

    const onStartedClick = () => {
        props.navigation.navigate(HOME);
        setAsyncData('isNewUser', 'true');
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>
                        GET JOB
                    </Text>
                    <FontText style={styles.subTitle}>
                        Find your dream job here
                    </FontText>
                </View>
                <View style={styles.imgWrapper}>
                    <Interview width={542} height={189} />
                </View>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onStartedClick}
                        style={styles.btnContainer}
                    >
                        <View style={styles.btnLeft}>
                            <Text style={{...Typography.FONT_BOLD}}>
                                Get Started
                            </Text>
                        </View>
                        <View style={styles.btnRight}>
                            <View style={styles.btnIconWrapper}>
                                <Image
                                    source={require('../../assets/images/three-chevron-arrows-pointing-right.png')}
                                    width={10}
                                    height={10}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: Colors.WHITE
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.THIRD,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleWrapper: {
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        ...GENERAL_STYLE_SETTING.EXTRA_BIG_TITLE_FONT_SIZE,
        marginVertical: 10,
        textAlign: 'center',
    },
    subTitle: {
        ...GENERAL_STYLE_SETTING.TITLE_TEXT_FONT_SIZE,
        textAlign: 'center',
    },
    imgWrapper: {
        flex: 2,
        justifyContent: 'center',
    },
    btnWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnContainer: {
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
        ...Typography.FONT_BOLD,
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
    }
});

export default OnBoarding;
