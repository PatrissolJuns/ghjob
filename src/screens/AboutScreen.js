import React from 'react';
import {ABOUT_LINKS} from '../config';
import FontText from '../components/FontText';
import {Linking, StyleSheet, Alert} from 'react-native';
import WhiteLogoSvg from "../assets/images/white_logo.svg";
import {GENERAL_STYLE_SETTING, Typography} from '../styles';
import {GHJOB_LOGO_GRAY, GHJOB_LOGO_WHITE} from '../styles/colors';
import FastImageBackground from '../components/FastImageBackground';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const AboutScreen = () => {
    const handleOnNavigateToLink = (link) => {
        // Checking if the link is supported for links with custom URL scheme.
        Linking
            .canOpenURL(link)
            .then(supported => {
                if (supported) {
                    Linking
                        .openURL(link)
                        .catch(error => {
                            Alert.alert("Something went wrong while opening the link. Please try later");
                        })
                } else {
                    Alert.alert("You don't have a correct app to open this link. Please download one first.");
                }
            })
            .catch(error => {
                Alert.alert("Something went wrong while opening the link. Please try later");
            });
    };

    return (
        <>
            <FocusAwareStatusBar
                animated
                barStyle="light-content"
                backgroundColor={"#d01f2d"}
            />
            <FastImageBackground
                style={styles.container}
                source={require('../assets/images/colored_background.jpg')}
            >
                <WhiteLogoSvg
                    width={70}
                    height={70}
                />

                <FontText style={styles.title}>
                    GhJob
                </FontText>

                <FontText style={styles.paragraph}>
                    GhJob is the right place to find your dream job.
                    We gather here the most popular companies and organizations around the world.
                    All you have to do is to apply and let your skills do the rest. Finding a job has never been easier!
                    {"\n"}
                    {"\n"}
                    Being a <FontText style={{fontStyle: 'italic'}}>Github jobs</FontText> implementation in React-Native, the app is completely <FontText onPress={() => handleOnNavigateToLink(ABOUT_LINKS.PROJECT)} style={styles.projectLink}>open source</FontText> and you're welcome to contribute.
                    However, we're not responsible for any bad usage of this app.
                </FontText>

                <FontText style={styles.footer}>
                    Version 1.0.0 © 2020 Designed by <FontText onPress={() => handleOnNavigateToLink(ABOUT_LINKS.AUTHOR)} style={styles.name}>PatrissolJuns</FontText>
                </FontText>

            </FastImageBackground>
        </>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...GENERAL_STYLE_SETTING.SCREEN_PADDING,
    },
    title: {
        color: GHJOB_LOGO_WHITE,
        marginBottom: 10,
        ...Typography.FONT_BOLD,
        ...GENERAL_STYLE_SETTING.BIG_TITLE_FONT_SIZE,
    },
    paragraph: {
        color: GHJOB_LOGO_GRAY,
        textAlign: 'justify',
        marginTop: 40,
        marginBottom: 30,
    },
    projectLink: {
        color: GHJOB_LOGO_WHITE,
        textDecorationLine: 'underline',
        ...Typography.FONT_BOLD,
    },
    footer: {
        color: GHJOB_LOGO_GRAY,
        textAlign: 'center',
        ...Typography.FONT_BOLD,
    },
    name: {
        // color: '#b4bfca',
        color: '#FFF',
        textDecorationLine: 'underline',
        ...Typography.FONT_BOLD,
    }
});
