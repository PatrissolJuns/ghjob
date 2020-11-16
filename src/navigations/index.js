import Home from '../screens/Home';
import {HOME} from '../urls/routes';
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();

class MainNavigator extends Component {
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name={HOME}
                            component={Home}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        );
    }
}

export default MainNavigator;
