import 'react-native-gesture-handler';
import React, {Component} from 'react';
import initAxios from './src/service/api';
import MainNavigator from "./src/navigations";
import initMoment from './src/service/momentService';
import SplashScreen from 'react-native-splash-screen';

initMoment();
initAxios();

class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
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
