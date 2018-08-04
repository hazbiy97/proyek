import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';


export default class SignUp extends Component {
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
  }

  state = {
    name: '',
    email: '',
    password: '',
    retypePassword: '',
    authenticating: false
  }

  onPressSignUp(){
    this.setState({
      authenticating : true
    });
    const { name, email, password,retypePassword } = this.state;
    if(password === retypePassword){
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user = firebase.auth().currentUser) => {
        firebase.database().ref('users/' + user.uid).set({
          login: false,
          data:0,
        });
        
        firebase.database().ref('users/' + user.uid+'/0').set({
          heartBeat: 0,
          temperature: 0,
        });
        
        user.updateProfile({displayName: name})
        .then()
        .catch((error) => {alert("Error registrating your account\n"+error.code)})
        
        user.sendEmailVerification()
        .then(
          Alert.alert('Success',"Email verifivation sent",[{text: 'OK', onPress: () => firebase.auth().signOut().then(this.props.navigation.goBack())}]) 
          );
        
        this.setState({
          authenticating : false
        });
      })
      .catch((error) => {
        const { code, message } = error;
        errorCode = error.code;
        switch (errorCode){
          case 'auth/weak-password' :
            console.log("Weak Password");
            alert("Weak password!/nUse at least 6 characters");
            break;
          case 'auth/invalid-email':
            console.log("Invalid email");
            alert("Invalid email");
            break;
          case 'auth/email-already-in-use':
            console.log("Email already in use");
            alert("Email already in use");
            break;
          case 'auth/network-request-failed':
            console.log("Network connection error");
            alert("Network connection error");
            break;
          default:
            console.log("Error occured");
            alert("Error occured");
            break;
        }
        this.setState({
          authenticating : false
        });
      });
    }else{
      this.setState({
        authenticating : false
      });
      alert("Password doesn't match");
    }
  }
  
  signUpButton() {
    if (this.state.authenticating){
      return (
        <TouchableOpacity style={styles.buttonContainer} disabled={true}>
          <ActivityIndicator size='small' style={{height: 25}} />
          </TouchableOpacity>
      );
    }else{
      return(
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressSignUp()}>
          <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
      );
    }
  }

  renderCurrentState(){
    return (
      <View style={styles.container}>
        <View style={styles.formContainter}>
          <TextInput 
            borderColor='rgba(180,180,180,1)'
            borderWidth= {1}
            borderRadius= {8}
            placeholder="Full Name"
            placeholderTextColor = 'rgba(128,128,128,1)'
            returnKeyType = "next"
            keyboardType="email-address"
            autoCapitalize= "words"
            autoCorrect={false}
            onChangeText= {name => this.setState({name})}
            value = {this.state.name}
            onSubmitEditing = {() => this.email.focus()}
            style = {styles.input}
          />
          <TextInput 
            borderColor='rgba(180,180,180,1)'
            borderWidth= {1}
            borderRadius= {8}
            placeholder="Email"
            placeholderTextColor = 'rgba(128,128,128,1)'
            returnKeyType = "next"
            keyboardType="email-address"
            autoCapitalize= "none"
            autoCorrect={false}
            onChangeText= {email => this.setState({email})}
            value = {this.state.email}
            onSubmitEditing = {() => this.passwordInput.focus()}
            style = {styles.input}
            ref= {(input) => this.email = input}
          />
          <TextInput 
            borderColor='rgba(180,180,180,1)'
            borderWidth= {1}
            borderRadius= {8}
            placeholder="Password"
            placeholderTextColor = 'rgba(128,128,128,1)'
            placholderAlign = "center"
            returnKeyType = "next"
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            onSubmitEditing = {() => this.passwordReInput.focus()}  
            style = {styles.input}
            ref= {(input) => this.passwordInput = input}
          />
          <TextInput 
            borderColor='rgba(180,180,180,1)'
            borderWidth= {1}
            borderRadius= {8}
            placeholder="Re-type Password"
            placeholderTextColor = 'rgba(128,128,128,1)'
            placholderAlign = "center"
            returnKeyType = "go"
            secureTextEntry
            onChangeText={retypePassword => this.setState({ retypePassword })}
            value={this.state.retypePassword}
            onSubmitEditing = {() => this.onPressSignUp()}  
            style = {styles.input}
            ref= {(input) => this.passwordReInput = input}  
          />
          {this.signUpButton()}
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.descText}>Already have an account? <Text onPress={() => this.props.navigation.goBack()} style={{color:'black', textDecorationLine:'underline'}} >Sign In.</Text></Text>
        </View>
      </View> 
    )
  }

  render() {
    var { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <SafeAreaView/>
        {this.renderCurrentState()}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width : 200,
    height : 50
  },
  slogan :{
    color : '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  closeButton: {
    marginLeft: 5,
    marginTop: 5,
  },
  formContainter:{
    flexGrow:1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(245,245,245,1)',
    marginBottom: 10,
    color: 'black',
    paddingHorizontal : 10
  },
  loading: {
    height: 175
  },
  descContainer:{
    height : 40,
    paddingVertical : 10,
    borderTopColor: 'rgba(220,220,220,1)',
    borderTopWidth: 1.5,
    marginTop :10,
  },
  descText:{
    color:'gray',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 12,
  },
  buttonContainer: {
    borderColor:'rgba(180,180,180,1)',
    borderWidth: 1,
    borderRadius: 8,
  	paddingVertical: 10
  },
  buttonText:{
  	textAlign : 'center',
    height: 20,
    fontWeight: '700',
  }
});
