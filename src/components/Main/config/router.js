import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Settings from '../screens/Settings';
import Me from '../screens/Me';
import LoginScreen from '../screens/Login/Login';
import SignUp from '../screens/Login/SignUp';
import Main from '../screens/Main';
import Splash from './splash';
import CheckUp from '../screens/CheckUp';

export const MainStack = StackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      title: 'SCUT'
    },
  },
  CheckUp: {
    screen: CheckUp,
    navigationOptions: {
      title: 'Check Up'
    },
  },
});

export const Tabs = TabNavigator({
  Main: {
    screen: MainStack,
    navigationOptions: {
      tabBarLabel: 'Main',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: 'Me',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const LoginStack = StackNavigator({
  Login: { 
    screen: LoginScreen,
    navigationOptions: {
        gesturesEnabled: false,
        header: null
    },
  },
  SignUp: { 
    screen: SignUp,
    navigationOptions: {
      title: 'Register',
      headerLeft: null
    },
  }
},
{
  mode: 'modal',
});

export const Root = StackNavigator({
  Splash: {
    screen: Splash
  },
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  LoginStack: {
    screen: LoginStack,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
  gesturesEnabled: false
});