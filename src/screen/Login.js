
import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity , AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Card, CardItem, Body } from 'native-base';
// import { CreateStackNavigator} from 'react-navigation';
import RegisterScreen from './Register'
import HomeScreen from './Home'
import axios from 'axios'
import {connect} from 'react-redux'
import {saveToken} from '../actions/eventActions'

class Login extends Component{
   constructor(props){
      super(props)
      this.state={
         username: '',
         password: '',
         hidePassword: true,
         eye: 'eye-off',
         token: 'token',
         getToken: 'get token'
      }
   }

   handleChangeUsername(text){
      // console.log(text)
      this.setState({
         username: text
      })
   }

   handleChangePassword(text){
      // console.log(text)
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


   async Submit(e){
      try {
        let obj = {
          username: this.state.username,
          password: this.state.password
        }
        const {data} = await axios.post('https://eva-server.ariefardi.xyz/users/login', obj)
        // console.log(data)
        console.log('----------> BARU MASUK nih abis di login')
        AsyncStorage.setItem("token", `${data.token}`)
        AsyncStorage.setItem("userId", `${data.found._id}`)
        
        let temp = {
          token: data.token,
          userId: data.found._id
        }

        console.log(temp)

        this.props.navigation.navigate('Home', {
            userId: data.found._id,
        })

        this.props.saveToken(temp)
        alert(data.message)
      } catch(err) {
        alert('there is some error')
        console.log(err)
      }
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
                           <Item>
                              <Label>Username</Label>
                              <Input name="Username" onChangeText={(text)=> this.handleChangeUsername(text)} />
                           </Item>
                           <Item>
                              <Label>Password</Label>
                              <Input secureTextEntry={this.state.hidePassword} name="password"  onChangeText={(text)=> this.handleChangePassword(text)}  />
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
const mapStateToProps = (state) => {
  return {
    token : state.eventReducers.token,
    userId : state.eventReducers.userId
  }
}
const mapDispatchToProps = dispatch => {
return {
    saveToken: (token) => dispatch(saveToken(token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)