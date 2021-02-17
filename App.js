import 'react-native-gesture-handler';
import React, {Component} from 'react';
import MainNavigator from "./src/navigations";
import initMoment from './src/service/momentService';
import {sendTokenToServer} from './src/urls/backend';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import {getAsyncData, setAsyncData} from './src/service/asynsStorage';

initMoment();


/**
 * Request user permission
 * @returns {Promise<boolean>}
 */
async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    return authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
}


/**
 * Get token from firebase
 * @returns {Promise<string | never>}
 */
const getToken = () => {
    return messaging().getToken().then((fcmToken) => fcmToken);
};

/**
 * Process token
 * @returns {Promise<void>}
 */
const processToken = async () => {
    try {
        await requestUserPermission();
        getAsyncData('fcmToken')
            .catch(async () => {
                const token = await getToken();
                sendTokenToServer(token)
                    .then(async (response) => {
                        if (response && response.code === "DUPLICATED_TOKEN") {
                            await setAsyncData('fcmToken', token)
                            // .then(() => console.log("Token storage persisted"))
                            // .catch(() => console.log("error while persisting token storage"));
                        }
                    })
                    .catch(() => null);
                    // .catch(() => console.log("error while sending token to server"));
            })
    } catch (e) {}
};

class App extends Component {
    componentDidMount() {
        SplashScreen.hide();

        processToken();

        this.unsubscribe = messaging().onMessage(async remoteMessage => {
        });
    }

    render() {
        return (
            <>
              <MainNavigator />
            </>
        );
    }
}

export default App;
