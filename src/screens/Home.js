import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar, Image,
} from 'react-native';
import Interview from '../assets/images/interview.svg';
import Triple from '../assets/images/three-chevron-right.svg';
import {Colors, GENERAL_STYLE_SETTING, Typography} from '../styles';
import FontText from '../components/FontText';
import { Icon } from 'react-native-elements';

const Home = () => {
    return (
        <>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
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
                    <View style={styles.btnContainer}>
                        <View style={styles.btnLeft}>
                            <Text>
                                Get Started
                            </Text>
                        </View>
                        <View style={styles.btnRight}>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                {/*<Triple width={100} height={100} color={'red'} />*/}
                                <Image
                                    source={require('../assets/images/three-chevron-arrows-pointing-right.png')}
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
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    titleWrapper: {
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'red',
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
        // backgroundColor: 'green',
    },
    btnWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        // ...GENERAL_STYLE_SETTING.BUTTON_HEIGHT,
        height: 58,
    },
    btnLeft: {
        backgroundColor: Colors.WHITE,
        marginHorizontal: 15,
        ...Typography.FONT_BOLD,
    },
    btnRight: {
        backgroundColor: Colors.PRIMARY,
        height: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    }
});

export default Home;
