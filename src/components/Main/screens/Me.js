import React, { Component } from 'react';
import { Alert, ScrollView, View ,Image, SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Tile, List, ListItem, Button} from 'react-native-elements';
import { me } from '../config/data';
import firebase from 'firebase';

class Me extends Component {
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
    var user = firebase.auth().currentUser;
    return (
      <View>
        <SafeAreaView />

        <View style={styles.profile}>
          <Image
              style={{justifyContent:'center'}}
              source = {require('../../../images/baseline_account_circle_black_48pt_2x.png')}
          />
          <Text>{user.displayName}</Text>
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>Setting</Text>
        </TouchableOpacity>

        <List>
          <ListItem
            title="Full Name"
            rightTitle={user.displayName}
            hideChevron
          />
          <ListItem
            title="Email"
            rightTitle={user.email}
            hideChevron
          />
        </List>

        <List>
          <TouchableOpacity onPress={()=>{Alert.alert(`User ID`,user.uid)}}>
            <ListItem
              title="UserId"
              rightTitle={user.uid}
            />
          </TouchableOpacity>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    marginBottom: 20,
  },
  profile: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: 'gray',
    padding: 10,
    margin :20,
    marginBottom : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
  	textAlign : 'center',
    height: 20,
    fontWeight: '900',
    color: 'white'
  }
});
Me.defaultProps = { ...me };

export default Me;
