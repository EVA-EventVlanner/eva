//import liraries
import React, { Component } from "react";
import { View, ScrollView, AsyncStorage, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Button, Icon, Item, Input, Body, Left, Right, Text, Form, Label, Card, CardItem } from "native-base";
import axios from "axios";
import {connect} from 'react-redux'

// create a component
class ModalAddEvent extends Component {
  constructor(props){
    super(props)
      this.state = {
        modalVisible: false,
        eventName: '',
        password: '',
        budget: '',
        description: '',
        imageUrl: ''
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

   onchangeEventName(text) {
      this.setState({
         eventName: text
      });
   }

   onchangePassword(text) {
      this.setState({
         password: text
      });
   }

   onchangeBudget(text) {
      this.setState({
         budget: text
      });
   }

   onchangeDescription(text) {
      this.setState({
         description: text
      });
   }

  onchangeImageUrl(text) {
      this.setState({
         imageUrl: text
      });
  }

  async onSubmit(){
    const token = await AsyncStorage.getItem('token')
    if(this.state.eventName != '' && this.state.password != '' && this.state.description != '' && this.state.budget != '' && this.state.imageUrl !== ''){
      let newData = {
        eventName: this.state.eventName,
        password: this.state.password,
        budget: this.state.budget,
        description: this.state.description,
        imageUrl: this.state.imageUrl
      }
      this.setState({
        eventName: '',
        password: '',
        budget: '',
        description: '',
        imageUrl: ''
      });

      const {data} = await axios.post('https://eva-server.ariefardi.xyz/events', newData, { headers:{token: token}})
      console.log("Balik dari axios buat confirmation: ", data)
      this.setModalVisible(!this.state.modalVisible)
    }
    else{
      alert("Please fill in all fields!")
    }
  }

  onCancel(){
      e.preventDefault();
      this.setState({
        eventName: '',
        password: '',
        budget: '',
        description: '',
        imageUrl: ''
      });
      this.setModalVisible(!this.state.modalVisible)
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
        >
          <ScrollView style={{paddingTop: 80}}>
            <Card>
               < CardItem>
                  <Form style={{width:'100%'}}>
                     <Item floatingLabel>
                        <Label>Event Name</Label>
                        <Input name="eventName" onChangeText={(text)=> this.onchangeEventName(text)} />
                     </Item>
                     <Item floatingLabel last>
                        <Label>Set Password for Event</Label>
                        <Input secureTextEntry={this.state.hidePassword} name="password"  onChangeText={(text)=> this.onchangePassword(text)}  />
                        <Icon name={this.state.eye} onPress={(e) => this.toggleDisplay(e)} color="white"/> 
                     </Item>
                     <Item floatingLabel>
                        <Label>Budget</Label>
                        <Input name="budget" onChangeText={(text)=> this.onchangeBudget(text)} />
                     </Item>
                     <Item floatingLabel last>
                        <Label>Description </Label>
                        <Input name="description" onChangeText={(text)=> this.onchangeDescription(text)} />
                     </Item>
                     <Item floatingLabel>
                        <Label>Image Url </Label>
                        <Input name="imageUrl" onChangeText={(text)=> this.onchangeImageUrl(text)} />
                     </Item>
                  </Form>
               </ CardItem>
               <CardItem footer>
                  <Left>
                     <Button style={{backgroundColor: "#8B008B"}} onPress={(e)=> this.onCancel() }>
                        <Text style={{color: "white", fontSize: 18}}>Cancel</Text>
                     </Button>
                  </Left>
                  <Right>
                     <Button style={{backgroundColor: "#009BD2"}} onPress={(e)=>this.onSubmit()}>
                        <Text style={{color: "white", fontSize: 18}}>Add Event</Text>
                     </Button>
                  </Right>
               </CardItem>
            </Card>
          </ScrollView>
        </Modal>
         <TouchableOpacity
            style={{
               flex:1,
               borderWidth:1,
               borderColor:'rgba(0,0,0,0.2)',
               alignItems:'center',
               justifyContent:'center',
               width:60,
               height:60,
               backgroundColor:'#009BD2',
               borderRadius:100}}
               onPress={() => {
                  this.setModalVisible(true);
               }}
            >
            <Icon style={{ fontSize: 30, color: "white"}} name="add" />
         </TouchableOpacity>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

//make this component available to the app
export default ModalAddEvent;
