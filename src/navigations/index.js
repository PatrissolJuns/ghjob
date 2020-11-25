import {connect} from 'react-redux';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import HomeNavigator from './HomeNavigator';
import {setAppLoading} from '../redux/actions';
import {HOME, ONBOARDING} from '../urls/routes';
import {getAsyncData} from '../service/asynsStorage';
import OnBoarding from '../screens/onboarding/OnBoarding';
import FullScreenLoader from '../components/FullScreenLoader';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class MainNavigator extends Component {
    state = {
        isNewUser: true,
    };

    componentDidMount() {
        this.isNewUser().catch(() => {})
    }

    isNewUser = () => {
        return new Promise((resolve, reject) => {
            getAsyncData('isNewUser')
                .then(() => {
                    this.setState({isNewUser: false}, () => {
                        this.props.setAppLoading(false);
                    });
                    resolve();
                })
                .catch(() => {
                    this.props.setAppLoading(false);
                    reject();
                })
        });
    };

    render() {
        return (
            <>
                {this.props.appLoading ? (
                    <FullScreenLoader />
                ) : (
                    <>
                        <StatusBar barStyle="dark-content" hidden />
                        <NavigationContainer>
                            <Stack.Navigator>
                                {this.state.isNewUser && (
                                    <Stack.Screen
                                        options={{
                                            headerShown: false,
                                        }}
                                        name={ONBOARDING}
                                        component={OnBoarding}
                                    />
                                )}
                                <Stack.Screen
                                    options={{
                                        headerShown: false,
                                    }}
                                    name={HOME}
                                    component={HomeNavigator}
                                />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    appLoading: state.appLoading,
});

export default connect(mapStateToProps, {setAppLoading})(MainNavigator);
