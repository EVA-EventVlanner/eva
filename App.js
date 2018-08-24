import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button} from 'native-base';
import LoginScreen from './src/screen/Login';
import RegisterScreen from './src/screen/Register'
import HomeScreen from './src/screen/Home'
import MyEventScreen from './src/screen/MyEvents'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

const DrawerBar = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',
      title : 'Home',
      headerTintColor: 'white',
    }
  },
  MyEvents: {
    screen: MyEventScreen,
    navigationOptions: {
      title : 'My Events',
      headerTintColor: 'white',
    }
  },
}, {
  navigationOptions: {
    drawerIcon: 'md-home',
  }
})

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
  Home: DrawerBar
}, 
{
  initialRouteName: 'Login',
  navigationOptions: {
    headerStyle: {
      backgroundColor: "#009BD2"
    },
    headerLeft: null
  },
});



export default class App extends Component{
  render() {
    return (
      <StackNav/>
    );
  }
}

