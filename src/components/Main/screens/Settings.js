import React, { Component } from 'react';
import { 
  View,
  TouchableOpacity
 } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';
import { LoginStack } from '../config/router';

class Settings extends Component {
  componentWillMount(){
    const firebaseConfig = {
        apiKey: 'AIzaSyD86ea0QlrVd2MSr3Z0eHJBKgIcKtnMi5A',
        authDomain: 'scut-project.firebaseapp.com',
        databaseURL: "https://scut-project.firebaseio.com",
        projectId: "scut-project",
        storageBucket: "scut-project.appspot.com",
        messagingSenderId: "527713997669"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    console.log(firebase);
  }

  render() {
    var {navigate} = this.props.navigation
    var user = firebase.auth().currentUser;
    return (
      <View>{/*
        <List>
          <ListItem
            title="Notifications"
          />
          <ListItem
            title="Profile"
          />
          <ListItem
            title="Password"
          />
    </List>*/}
        <List>
          <TouchableOpacity 
            onPress = {() => {
              firebase.database().ref('users/' + user.uid).update({
                login: false,
              }).then(firebase.auth().signOut().then(navigate('LoginStack')));
            }}>
          <ListItem
            title="Sign Out"
            rightIcon={{ name: 'cancel' }}
          />
          </TouchableOpacity>
        </List>
      </View>
    );
  }
}

export default Settings;
