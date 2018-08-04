import React, { Component } from 'react';
import { Root, Tabs } from './config/router';
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

class App extends Component {
  render() {
    return <Root />;
  }
}

export default App;
