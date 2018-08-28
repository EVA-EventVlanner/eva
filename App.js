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

// const HomeStack = createStackNavigator ({
//   Home: {
//     screen: HomeScreen,
//     navigationOptions: {
//       drawerLabel: 'Home',
//       title : 'Home',
//       headerTintColor: 'white',
//     }
//   },
//   DetailBudget: {
//     screen: DetailBudgetScreen,
//     navigationOptions: {
//       title: 'Detail',
//       headerTintColor: 'white'
//     }
//   },
//   Result: {
//     screen: ResultScreen,
//     navigationOptions:{
//       title: 'Result',
//       headerTintColor: 'white'
//     }
//   }
// },
// {
//   navigationOptions: {
//     headerStyle: {
//       backgroundColor: "#009BD2"
//     }
//   },
// })


const DrawerIcon = (props) =>  {

  return(
  <View>
      <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
          <Icon name="menu" style={{padding: 10, marginLeft:10}} size={20} color="white"/>
      </TouchableOpacity>
  </View>
  );
};

const GoBack = (props) =>{
  console.log("Ini propsnya", props)
  return (
      <View>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" style={{padding: 10, marginLeft:10}} size={20} color="white"/>
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
    navigationOptions: {
      title: "Register",
      headerTintColor: '#fff',
      headerLeft: null
    }
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

