import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LoginScreen from './src/screen/Login';
import RegisterScreen from './src/screen/Register'
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

