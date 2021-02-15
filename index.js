import App from './App';
import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import store from "./src/redux/appStore";
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import {processNotification, saveNewJobs} from './src/components/HandleNotifications';

// Set PushNotification
PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        // console.log("TOKEN: ", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        // process the notification
        processNotification(notification);

        // Save new jobs
        if (notification.data && notification.data.hasOwnProperty('ids')) {
            saveNewJobs(notification.data);
        }

        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
        // console.log("ACTION: ", notification.action);
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function(err) {
        // console.error(err.message, err);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
});

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    // console.log('Message handled in the background! ', remoteMessage);
});

const AppStore = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
};

AppRegistry.registerComponent(appName, () => AppStore);
