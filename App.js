import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button, Icon} from 'native-base';
import LoginScreen from './src/screen/Login';
import RegisterScreen from './src/screen/Register'
import HomeScreen from './src/screen/Home'
import MyEventScreen from './src/screen/MyEvents'
import MyProfileScreen from './src/screen/MyProfile'
import DetailBudgetScreen from './src/screen/DetailBudgetScreen'
import ResultScreen from './src/screen/Result'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

const DrawerIcon = (props) =>  {

  return(
  <View>
      <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Icon name="menu" style={{padding: 10, marginLeft:10}} size={20}/>
      </TouchableOpacity>
  </View>
  );
};

const GoBack = (props) =>{
  console.log("Ini propsnya", props)
  return (
      <View>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" style={{padding: 10, marginLeft:10}} size={20} />
        </TouchableOpacity>
    </View>
  )
}
const DrawerBar = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    title: "Home"
  },
  MyEvents: {
    screen: MyEventScreen,
    navigationOptions:{
      title : 'My Events',
      headerTintColor: 'white',
    }
  },
  MyProfile: {
    screen: MyProfileScreen,
    navigationOptions: {
      title : 'My Profile',
      headerTintColor: 'white',
    }
  },
}, {
  
})


const StackNav = createStackNavigator({
  Login: { 
    screen: LoginScreen,
    navigationOptions:{
      title: "Login",
      headerTintColor: '#fff',
      headerLeft: null,
    }
 },
  Register: { 
    screen: RegisterScreen,
    navigationOptions:({navigation})  => ( {
      title: "Register",
      headerTintColor: '#fff',
      headerLeft : <GoBack navigation={navigation} />,
    })
  },
  Home: DrawerBar,
  DetailBudget: {
    screen: DetailBudgetScreen,
    navigationOptions: ({navigation})  => ({
      title: 'Detail',
      headerTintColor: 'white',
      headerLeft : <GoBack navigation={navigation} />
    })
  },
  Result: {
    screen: ResultScreen,
    navigationOptions: ({navigation})  => ({
      headerLeft : <GoBack navigation={navigation} />,
      title: 'Result',
      headerTintColor: 'white'
    })
  }
},
{
  initialRouteName: 'Login',
  // headerMode: 'float',
  navigationOptions: ({navigation})  => ({
    headerStyle: {
      backgroundColor: "#009BD2"
    },
    headerLeft : <DrawerIcon navigation={navigation} />,
  }),
});



export default class App extends Component{
  render() {
    return (
      <StackNav/>
    );
  }
}

