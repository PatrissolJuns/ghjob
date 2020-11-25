import * as React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ABOUT, HOME} from '../urls/routes';
import Home from '../screens/Home';
import AboutScreen from '../screens/AboutScreen';

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
