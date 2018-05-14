/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase';

export default class LoginForm extends Component {
  componentWillMount(){
    const firebaseConfig = {
      apikey: 'AIzaSyDt07oQIXGM4h0vKlnT2pzC7fYBWlVMwcs',
      authDomain: 'smart-hospital-777ef.firebaseapp.com'
    };

    firebase.initializeApp(firebaseConfig);
  }

  state = {
    email: '',
    password: '',
    authenticating: false
  }

  onPressSignIn(){
    this.setState({
      authenticating : true
    });
  }
  
  loginButton() {
    if (this.state.authenticating){
      return (
        <TouchableOpacity style={styles.buttonContainer} disabled={true}>
          <ActivityIndicator size='small' style={{height: 25}} />
        </TouchableOpacity>
      );
    }else{
      return(
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressSignIn()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      );
    }
  }

  renderCurrentState(){
    return (
      <View style={styles.container}>
        <TextInput 
        	placeholder="Email"
        	placeholderTextColor = "rgba(255,255,255,0.7)"
        	returnKeyType = "next"
        	keyboardType="email-address"
        	autoCapitalize= "none"
        	autoCorrect={false}
          onChangeText= {email => this.setState({email})}
          value = {this.state.email}
        	onSubmitEditing = {() => this.passwordInput.focus()}
        	style = {styles.input}
        />
        <TextInput 
        	placeholder="Password"
        	placeholderTextColor = "rgba(255,255,255,0.7)"
        	placholderAlign = "center"
        	returnKeyType = "go"
        	secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        	style = {styles.input}
        	ref= {(input) => this.passwordInput = input}  
        />
        <View style={styles.descContainer}>
          <Text style={styles.descText}>Don't have an account? <Text onPress={() => this.onPressSignIn()} style={{color:'red', textDecorationLine:'underline'}} >Sign Up.</Text></Text>
        </View>
        {this.loginButton()}
      </View> 
    );
  }

  render(){
    return (
        this.renderCurrentState()
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal : 10
  },
  loading: {
    height: 175
  },
  descContainer:{
    height : 20,
    //paddingHorizontal : 10,
    marginBottom: 5
  },
  descText:{
    color: '#FFFFFF',
    fontWeight: '400'
  },
  buttonContainer: {
    backgroundColor : '#2980b9',
    height : 50,
  	paddingVertical: 15
  },
  buttonText:{
  	textAlign : 'center',
  	color : '#FFFFFF',
  	fontWeight: '700'
  }
});
