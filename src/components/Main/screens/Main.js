import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  YellowBox
} from 'react-native';
import { List, ListItem, Button} from 'react-native-elements';
import * as firebase from 'firebase';

import { users } from '../config/data';
//ignore bugs
YellowBox.ignoreWarnings(['Module RCTImageLoader requires',]);

class Main extends Component {
  state = {
    historyData: null
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
      historyData: dataInput
    })
  }

  componentDidMount(){
    var user = firebase.auth().currentUser;
    this.historyDataRetrieve = firebase.database().ref('users/' + user.uid);
    this.historyDataRetrieve.child('data').on('value', (snapshot) => {
        this.updateData(snapshot.val());
    });
  }

  componentWillUnmount(){
    this.dataRetrieve.off();
  }

  listView(){
    if (this.state.historyData){
      return this.state.historyData.map((historyDataMapped) => {
        if(historyDataMapped){
          return (
            <ListItem
              key={historyDataMapped.id}
              title={historyDataMapped ? 'BPM: ' + historyDataMapped.bpm.toString(): null}
              titleStyle={{color:'black',fontSize: 16}}
              rightTitle={historyDataMapped ? 'SPO: ' + historyDataMapped.spo.toString(): null}
              rightTitleStyle={{color:'black',fontSize: 16}}
              hideChevron
            />
          )
        }
      })
    }
  }

  render() {
    const {database} = firebase;
    const user = firebase.auth().currentUser;
    return (
      <View style={styles.container}>
        <View style = {{justifyContent: 'center',alignContent: "center", }}>
          <Text style={{paddingEnd: 100}}> <ImageBackground
            style={styles.icon}
            source={require('../../../images/iconImage.png')}/><Text  style={{color:'#2DC5FF', fontSize: 37.5}}> SCUT</Text></Text> 
        </View>

        <View style = {styles.infoContainer}>
          <Text style={{color:'white', fontSize: 37.5}}>{user.displayName}</Text>
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('CheckUp')}>
            <Text style={styles.buttonText}>Check Up</Text>
        </TouchableOpacity>

        <View style={styles.historyContainer}>
          <View style={{padding: 10}}>
              <Text style={styles.buttonText}>History</Text>
          </View>
          
            <View style={styles.historyContentContainer}>
              <List containerStyle={{ marginTop: 0, marginBottom: 0}}>
              <ScrollView bounces= {false}>
                  {this.listView()}
              </ScrollView>
              </List>
            </View>
        </View>
      </View>
    );
  }
}

export default Main;

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
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 8,
    backgroundColor: '#2DC5FF',
    padding: 10,
    marginTop :20,
    marginBottom :20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContainer: {
    flex:1,
    backgroundColor:'#2DC5FF',
    borderRadius: 8,
    borderWidth: 0,
    borderColor: 'white',
    paddingBottom: 40
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
  }
});