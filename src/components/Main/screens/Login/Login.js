import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  YellowBox,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase';
//ignore bugs
YellowBox.ignoreWarnings(['Module RCTImageLoader requires',]);

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    authenticating: false,
    user: null
  }

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

  onPressSignIn(){
    this.setState({
      authenticating : true
    });
    const { email, password } = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      this.setState({authenticating:false});
      if (user.emailVerified){
        this.props.navigation.navigate('Tabs');
        firebase.database().ref('users/' + user.uid).update({
          login: true,
        });
      }else{
        alert("Please verify your email address")
        //firebase.auth().signOut();
      }
    })
    .catch((error) => {
      const { code, message } = error;
      this.setState({authenticating:false});
      errorCode = error.code;
      switch (errorCode){
        case 'auth/weak-password' :
          console.log("Network connection error");
          alert("Network connection error");
          break;
        case 'auth/invalid-email':
          console.log("Invalid email");
          alert("Invalid email");
          break;
        case 'auth/user-not-found':
          console.log("User not found");
          alert("User not found");
          break;
        case 'auth/network-request-failed':
          console.log("Network connection error");
          alert("Network connection error");
          break;
        case 'auth/wrong-password':
          console.log("Wrong password");
          alert("Wrong password");
          break;
        default:
          console.log("Error occured");
          alert("Error occured");
          break;
      }
    });
  }
  
  loginButton() {
    if (this.state.authenticating){
      return(
        <TouchableOpacity style={styles.buttonContainer} disabled={true}>
          <ActivityIndicator size='small' style={{height: 20}} />
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onPressSignIn()}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      )
    }
  }

  loginForm(){
    var {database} = firebase;
    return (
      <View>
        <View style={styles.formContainer}>
          <TextInput 
            borderColor='rgba(180,180,180,1)'
            borderWidth= {1}
            borderRadius= {8}
            placeholder="Email"
            placeholderTextColor = "gray"
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
            borderColor='rgba(180,180,180,1)'
            borderWidth= {1}
            borderRadius= {8}
            placeholder="Password"
            placeholderTextColor = "gray"
            placholderAlign = "center"
            returnKeyType = "go"
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            onSubmitEditing = {() => this.onPressSignIn()}
            style = {styles.input}
            ref= {(input) => this.passwordInput = input}  
          />
          {this.loginButton()}
        </View> 
        <View style={styles.descContainer}>
          <Text style={styles.descText}>Don't have an account? <Text onPress={() => this.props.navigation.navigate('SignUp')} style={{color:'black'}} >Sign Up.</Text></Text>
        </View>
      </View>
    )
  }

  render() {
    var { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style = {styles.logo}
            source = {require('../../../../images/loginImage.jpg')}
          />
          <Text style={styles.sloganText}>Group 2 Production{'\n'}Copyright @2018</Text>
        </View>
        <View >
          {this.loginForm()}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width : 200,
    height : 50
  },
  sloganText:{
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
    marginBottom: 5,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    marginBottom: 15,
    paddingHorizontal : 10
  },
  loading: {
    height: 175
  },
  descContainer:{
    height : 40,
    paddingVertical : 10,
    borderTopColor: 'rgba(180,180,180,1)',
    borderTopWidth: 1.5,
    marginTop :10,
  },
  descText:{
    color:'gray',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 12,
  },
  border:{
    borderColor:'rgba(180,180,180,1)',
    borderWidth: 1,
    borderRadius: 8,
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
  	fontWeight: '700'
  }
});
