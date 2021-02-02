import {connect} from 'react-redux';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import HomeNavigator from './HomeNavigator';
import {setAppLoading, setBookmarkedJobs} from '../redux/actions';
import {HOME, HOW_TO_APPLY, JOB, ONBOARDING, SEARCH, BOOKMARKED_JOBS} from '../urls/routes';
import {getAsyncData} from '../service/asynsStorage';
import OnBoarding from '../screens/onboarding/OnBoarding';
import FullScreenLoader from '../components/FullScreenLoader';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HowToApply from '../screens/HowToApply';
import JobScreen from '../screens/JobScreen';
import {PRIMARY} from '../styles/colors';
import Search from '../screens/Search';
import BookmarkedJobs from '../screens/BookmarkedJobs';

const Stack = createStackNavigator();

class MainNavigator extends Component {
    state = {
        isNewUser: true,
    };

    componentDidMount() {
        this.isNewUser()
            .catch(() => {})
            .finally(async () => {
                try {
                    let bookmarkedJobs = await getAsyncData('bookmarkedJobs');
                    // console.log( "typeof bookmarkedJobs => ", typeof bookmarkedJobs, " bookmarkedJobs => ", bookmarkedJobs);
                    // console.log( "typeof JSON.parse(bookmarkedJobs) => ", typeof JSON.parse(bookmarkedJobs), " JSON.parse(bookmarkedJobs) => ", JSON.parse(bookmarkedJobs));
                    bookmarkedJobs = JSON.parse(bookmarkedJobs);
                    if (!bookmarkedJobs || !Array.isArray(bookmarkedJobs)) {
                        throw new Error("Unknown bookmarked jobs");
                    }

                    this.props.setBookmarkedJobs(bookmarkedJobs);

                } catch (e) {
                    console.log("e => ", e);
                    this.props.setBookmarkedJobs([]);
                }
            });
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
                                <Stack.Screen
                                    options={{
                                        headerShown: false,
                                    }}
                                    name={JOB}
                                    component={JobScreen}
                                />
                                <Stack.Screen
                                    options={{
                                        headerShown: false,
                                    }}
                                    name={SEARCH}
                                    component={Search}
                                />
                                <Stack.Screen
                                    options={{
                                        headerShown: false,
                                    }}
                                    name={BOOKMARKED_JOBS}
                                    component={BookmarkedJobs}
                                />
                                <Stack.Screen
                                    options={{
                                        headerStyle: {
                                            backgroundColor: PRIMARY,
                                        },
                                        headerTintColor: '#fff',
                                        headerTitleStyle: {
                                            fontWeight: 'bold',
                                        },
                                        // headerShown: false,
                                    }}
                                    name={HOW_TO_APPLY}
                                    component={HowToApply}
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
    bookmarkedJobs: state.bookmarkedJobs,
});

export default connect(mapStateToProps, {setAppLoading, setBookmarkedJobs})(MainNavigator);
