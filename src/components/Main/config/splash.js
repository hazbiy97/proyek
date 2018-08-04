import React, {Component} from 'react';
import {View,ActivityIndicator,SafeAreaView} from 'react-native';
import * as firebase from 'firebase';


export default class Splash extends Component {
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
  
  componentDidMount() {
    var {navigate} = this.props.navigation;
    //navigate('LoginStack')
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        firebase.database().ref('/users/' + user.uid +'/login').once('value').then(
          (snapshot) => {
            this.authSubscription()
            snapshot.val() ? navigate('Tabs') : firebase.auth().signOut() ;
          }
        )
      }else{
        this.authSubscription()
        navigate('LoginStack')
      }
    })
  }

  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    //this.authSubscription();
  }

  render() {
    return (
    <View style={{flexGrow: 1,justifyContent: 'center'}}>
      <SafeAreaView/>
      <View >
      <ActivityIndicator size= 'large'> </ActivityIndicator>
      </View>
    </View>
      );
  }
}