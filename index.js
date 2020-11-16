import React from 'react';
import App from './App';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import store from "./src/redux/appStore";
import {name as appName} from './app.json';

const AppStore = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
};

AppRegistry.registerComponent(appName, () => AppStore);
