import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button} from 'native-base';
import LoginScreen from './src/screen/Login';
import RegisterScreen from './src/screen/Register'
import HomeScreen from './src/screen/Home'
import {createStackNavigator} from 'react-navigation';


const StackNav = createStackNavigator({
  Login: { 
    screen: LoginScreen,
    navigationOptions:{
      title: "Login",
      headerTintColor: '#fff',
    }
 },
  Register: { 
    screen: RegisterScreen,
    navigationOptions:{
      title: "Register",
      headerTintColor: '#fff',
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
        title: "Home",
        headerTintColor: 'white',
        headerLeft: null 
    }
  }
}, 
{
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: {
      backgroundColor: "#009BD2"
    }
  },
});

export default class App extends Component{
  render() {
    return (
      <StackNav/>
    );
  }
}

