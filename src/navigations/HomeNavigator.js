import * as React from 'react';
import {Colors} from '../styles';
import Home from '../screens/Home';
import {ABOUT, HOME} from '../urls/routes';
import AboutScreen from '../screens/AboutScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName={HOME}
            drawerContentOptions={{
                activeTintColor: Colors.PRIMARY,
                activeBackgroundColor: 'rgba(255, 119, 100, 0.1)',
            }}
        >
            <Drawer.Screen name={HOME} component={Home} />
            <Drawer.Screen name={ABOUT} component={AboutScreen} />
        </Drawer.Navigator>
    )
};

export default HomeNavigator;
