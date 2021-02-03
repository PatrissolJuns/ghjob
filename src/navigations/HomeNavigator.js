import * as React from 'react';
import Home from '../screens/Home';
import {Typography} from '../styles';
import {ABOUT, HOME} from '../urls/routes';
import FontText from '../components/FontText';
import AboutScreen from '../screens/AboutScreen';
import {ImageBackground, View} from 'react-native';
import WhiteLogoSvg from '../assets/images/white_logo.svg';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {GHJOB_LOGO_GRAY, GHJOB_LOGO_WHITE} from '../styles/colors';
import {DrawerItemList, DrawerContentScrollView} from '@react-navigation/drawer';

function CustomDrawerContent(props) {
    return (
        <>
            <ImageBackground
                style={{flex: 1}}
                source={require('../assets/images/colored_background.jpg')}
            >
                <DrawerContentScrollView {...props}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            marginTop: 20,
                            marginBottom: 30,
                        }}
                    >
                        <WhiteLogoSvg
                            width={70}
                            height={70}
                        />
                        <FontText
                            style={{
                                fontSize: 40,
                                color: GHJOB_LOGO_WHITE,
                                ...Typography.FONT_BOLD,
                            }}
                        >
                            h <FontText style={{color: GHJOB_LOGO_GRAY}}>Job</FontText>
                        </FontText>
                    </View>


                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </ImageBackground>
        </>
    );
}

const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={CustomDrawerContent}
            initialRouteName={HOME}
            drawerContentOptions={{
                inactiveTintColor: GHJOB_LOGO_GRAY,
                activeTintColor: GHJOB_LOGO_WHITE,
                activeBackgroundColor: 'rgba(255, 255, 255, 0.2)',
                labelStyle: {
                    ...Typography.FONT_BOLD
                }
            }}
        >
            <Drawer.Screen name={HOME} component={Home} />
            <Drawer.Screen name={ABOUT} component={AboutScreen} />
        </Drawer.Navigator>
    )
};

export default HomeNavigator;
