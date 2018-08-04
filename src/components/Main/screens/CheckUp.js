import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  YellowBox,
  TextInput,
  Alert
} from 'react-native';
import { List, ListItem, Button} from 'react-native-elements';
import * as firebase from 'firebase';

import { users } from '../config/data';

class CheckUp extends Component {
  state = {
    hardwareID: '',
    hardwareIDError: false,
    listening: false,
    listened: false,
    historyData: null,
    data: null,
    loading: false
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

  updateData(dataInput){
    this.setState({
      data: dataInput,
      loading: false
    });

    if(!this.state.data){
      this.setState({
        hardwareIDError: true
      })
    }else{
      this.setState({
        hardwareIDError: false
      })
    }
  }

  onPressDoCheckUp(){
    if(this.state.hardwareID.length != 0){
      this.setState({
        loading: true,
        hardwareIDError: false,
        listening: true,
        listened: false
      });
      this.dataRetrieve = firebase.database().ref('hardware/' + this.state.hardwareID);
      this.dataRetrieve.on('value', (snapshot) => {
        this.updateData(snapshot.val());
      });
    }else{
      Alert.alert('Error','Insert your hardware ID');
    }
  }

  onPressStopCheckUp(){
    this.dataRetrieve.off();
    this.setState({
      listened: true,
      listening: false,
    });
  }

  onPressSaveData(){
    var user = firebase.auth().currentUser;
    var dataRef = firebase.database().ref('users/' + user.uid);
    dataRef.child('totalData').transaction((current_value) => {
      var total = ((current_value || 0) + 1);
      firebase.database().ref('users/' + user.uid + '/data/').child(total).set({
        id: total,
        bpm: this.state.data.bpm,
        spo: this.state.data.spo
      })
      return total;
    }).then(() => {
      Alert.alert('Success','Save successful');
      this.props.navigation.goBack();
    })
    .catch((error) => Alert.alert('Error','Error '+ error.code +' occured while saving'));;
  }

  listeningButton(){
    if(this.state.listening){
      return(
        <TouchableOpacity style = {styles.buttonContainer} onPress={() => this.onPressStopCheckUp()}>
          <Text style={styles.buttonText}>{'Stop Check Up'}</Text>
        </TouchableOpacity>
      )
    }else {
      return(
        <TouchableOpacity style = {styles.buttonContainer} onPress={() => this.onPressDoCheckUp()}>
          <Text style={styles.buttonText}>{'Do Check Up'}</Text>
        </TouchableOpacity>
      )
    }
  }
  
  saveButton(){
    if(this.state.listened && !this.state.hardwareIDError){
      return(
        <TouchableOpacity style = {styles.buttonContainer} onPress={() => this.onPressSaveData()}>
          <Text style={styles.buttonText}>{'Save Data'}</Text>
        </TouchableOpacity>
      )
    }
  }

  doListeningView(){
    var {loading, listened, listening, data} = this.state;
    if(this.state.listening && !this.state.loading || (this.state.listened && !this.state.hardwareIDError)){
      if(data){
        return(
          <View style={styles.historyContainer}>
            <View style={{padding: 10}}>
                <Text style={styles.buttonText}>Data</Text>
            </View>
            <View style={styles.historyContentContainer}>
              <List containerStyle={{ marginTop: 0, borderTopWidth: 0, borderBottomWidth: 0 }}>
                <ListItem
                  title={'BPM'}
                  rightTitle={data.bpm ? data.bpm.toString():'Error occured'}
                  rightTitleStyle={{color: 'black'}}
                  hideChevron
                />
                <ListItem
                  title={'SPO'}
                  rightTitle={data.spo ? data.spo.toString():'Error occured'}
                  rightTitleStyle={{color: 'black'}}
                  hideChevron
                />
              </List>
            </View>
          </View>
        )
      }else {
        return(
          <View style={styles.historyContainer}>
            <View style={{padding: 10}}>
                <Text style={styles.buttonText}>Hardware with id {this.state.hardwareID} not found!</Text>
            </View>
          </View>
        )
      }
    }
  }

  render() {
    const {database} = firebase;
    const user = firebase.auth().currentUser;
    return (
      <View style={styles.container}>
        <TextInput 
          borderColor='rgba(180,180,180,1)'
          borderWidth= {1}
          borderRadius= {8}
          backgroundColor= {this.state.listening ? 'rgba(220,220,220,1)': 'white'}
          placeholder="Hardware ID"
          placeholderTextColor = "gray"
          returnKeyType = "go"
          keyboardType="numeric"
          editable= {this.state.listening ? false: true}
          onChangeText= {hardwareID => this.setState({hardwareID})}
          value = {this.state.hardwareID}
          style = {styles.input}
        />
        {this.listeningButton()}
        {this.doListeningView()}
        {this.saveButton()}
      </View>
    );
  }
}

export default CheckUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  icon: {
    width : 50,
    height: 37.5,
  },
  infoContainer: {
    borderRadius: 8,
    backgroundColor: '#2DC5FF',
    padding: 10,
    marginTop :20,
  },
  buttonContainer: {
    borderRadius: 8,
    backgroundColor: '#2DC5FF',
    padding: 10,
    marginTop :20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContainer: {
    backgroundColor:'#2DC5FF',
    borderRadius: 8,
    borderWidth: 0,
    borderColor: 'white',
    marginTop :20,
  },
  historyContentContainer: {
    backgroundColor:'white', 
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  buttonText:{
  	textAlign : 'center',
    height: 20,
    fontWeight: '900',
    color: 'white'
  },
  input: {
    height: 40,
    paddingHorizontal : 10
  },
});