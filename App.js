import 'react-native-gesture-handler';
import React, {Component} from 'react';
import MainNavigator from "./src/navigations";
import initMoment from './src/service/momentService';
import initAxios from './src/service/api';

initMoment();
initAxios();

class App extends Component {
  render() {
    return (
        <>
          <MainNavigator />
        </>
    );
  }
}

export default App;
