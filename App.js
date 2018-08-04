/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { StackNavigator } from "react-navigation";
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import NavigatorIOSApp from './src/components/Main/Main'
/*
const Navigation = StackNavigator({
  Login: { screen: Login},
  Main: { screen: NavigatorIOSApp},
  SignUp: { screen: SignUp}
});
export default Navigation;
*/
export default class App extends Component {
  render() {
    return (
      //<Login />
      <NavigatorIOSApp />
    );
  }
}

