import * as React from 'react';
import Home from '../screens/Home';
import {ABOUT, HOME} from '../urls/routes';
import AboutScreen from '../screens/AboutScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName={HOME}>
            <Drawer.Screen name={HOME} component={Home} />
            <Drawer.Screen name={ABOUT} component={AboutScreen} />
        </Drawer.Navigator>
    )
};

export default HomeNavigator;
