
import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Card, CardItem, Body } from 'native-base';
import { StackNavigator} from 'react-navigation';
import RegisterScreen from './Register'
import HomeScreen from './Home'

 const Navigate = StackNavigator({
   Register: { screen: RegisterScreen },
   Home: {screen: HomeScreen}
 });


class Login extends Component{
   constructor(props){
      super(props)
      this.state={
         username: '',
         password: '',
         hidePassword: true,
         eye: 'eye-off'
      }
   }

   handleChangeUsername(text){
      console.log(text)
      this.setState({
         username: text
      })
   }

   handleChangePassword(text){
      console.log(text)
      this.setState({
         password: text
      })
   }

   toggleDisplay() {
      this.setState({ hidePassword: !this.state.hidePassword })
      if(this.state.hidePassword === false){
         this.setState({
            eye: 'eye-off'
         })
      }
      if(this.state.hidePassword === true){
         this.setState({
            eye: 'eye'
         })
      }
   }


   Submit(e){
      // e.preventDefault();
      console.log("INI HASIL: ", this.state)
      this.props.navigation.navigate("Home")
      //Send state to db
   }

   render() {
      const { navigate } = this.props.navigation;
      return (
         <Container>
            <Content>
               <Card style={{flex: 1}}>
                  {/* <CardItem header style={{backgroundColor: "#009BD2"}}>
                     <Text style={styles.headerText}>Sign In</Text>
                  </CardItem> */}
                  <CardItem>
                     <Body>
                        <Form style={{width:'100%'}}>
                           <Item floatingLabel>
                              <Label>Username</Label>
                              <Input name="username" value={this.state.username} onChangeText={(text)=> this.handleChangeUsername(text)} />
                           </Item>
                           <Item floatingLabel last>
                              <Label>Password</Label>
                              <Input secureTextEntry={this.state.hidePassword} name="password" value={this.state.password} onChangeText={(text)=> this.handleChangePassword(text)}  />
                              <Icon name={this.state.eye} onPress={(e) => this.toggleDisplay(e)} color="white"/> 
                           </Item>
                        </Form>
                     </Body>
                  </CardItem>
                  <CardItem style={{flex:1, justifyContent:'center'}}>
                     <Text> Don't have an account? </Text>
                     <TouchableOpacity onPress={() => navigate('Register')} >
                        <Text style={{color:"#009BD2"}}>Register Here</Text>
                     </TouchableOpacity>
                  </CardItem>
                  <CardItem footer>
                     <Button block style={{backgroundColor: "#009BD2", width: '100%'}} onPress={(e)=>this.Submit(e)}>
                        <Text style={{color: "white", fontSize: 18}}>Sign In</Text>
                     </Button>
                  </CardItem>
               </Card>
            </Content>
         </Container>
      );
   } 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
   },
   headerText:{
      flex: 1, 
      // alignItems: 'center', 
      textAlign: 'center', 
      fontSize: 25, 
      color:'white'
   }
})


export default (Login);