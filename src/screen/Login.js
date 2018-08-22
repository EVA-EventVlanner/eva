
import React, { Component } from 'react';
import {StyleSheet, Text} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon } from 'native-base';

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
      e.preventDefault();
      console.log("INI HASIL: ", this.state)

      //Send state to db
   }

   render() {
      return (
         <Container>
            <Content>
            <Header style={{backgroundColor: "#009BD2"}}> 
               <Text style={styles.headerText}> Sign In </Text> 
            </Header>
            <Form>
               <Item floatingLabel>
                  <Label>Username</Label>
                  <Input name="username" value={this.state.username} onChangeText={(text)=> this.handleChangeUsername(text)} />
               </Item>
               <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input secureTextEntry={this.state.hidePassword} name="password" value={this.state.password} onChangeText={(text)=> this.handleChangePassword(text)}  />
                  <Icon name={this.state.eye} onPress={(e) => this.toggleDisplay(e)} color="white"/> 
               </Item>
               <Button block style={{backgroundColor: "#009BD2"}} onPress={(e)=>this.Submit(e)}>
                  <Text style={{color: "white"}}>Sign In</Text>
               </Button>
            </Form>
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
      alignItems: 'center', 
      textAlignVertical: 'center', 
      fontSize: 25, 
      color:'white'
   }
})


export default (Login);