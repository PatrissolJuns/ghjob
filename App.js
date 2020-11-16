import 'react-native-gesture-handler';
import React, {Component} from 'react';
import MainNavigator from "./src/navigations";

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
