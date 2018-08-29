//import liraries
import React, { Component } from "react";
import { View, ScrollView, AsyncStorage, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, DatePickerAndroid, Platform, ActivityIndicator } from "react-native";
import { Button, Icon, Item, Input, Body, Left, Right, Text, Form, Label, Card, CardItem, Thumbnail } from "native-base";
import axios from "axios";
import {connect} from 'react-redux'
import ImagePicker from "react-native-image-picker";
import storageRef from "../firebase/firebase";
import RNFetchBlob from "react-native-fetch-blob";
// import RNFetchBlob from "../../node_modules/react-native-fetch-blob/index";
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

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
        imageUrl: '',
        simpleDate: new Date(),
        simpleText: "Pick a Date",
        loading: false
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

  async showPicker(stateKey, options){
    try{
      const newState = {}
      const {action, year, month, day} = await DatePickerAndroid.open(options)

      if(action === DatePickerAndroid.dismissedAction){
        newState[`${stateKey}Text`] = 'dismissed'
        this.setState({
          simpleText: newState.simpleText
        })
      }
      else{
        const date = new Date(year, month, day)
        newState[`${stateKey}Text`] = date.toLocaleDateString()
        newState[`${stateKey}Date`] = date
        this.setState({
          simpleDate: newState.simpleDate,
          simpleText: newState.simpleText
        })
      }

      console.log("ini newstate! : ", newState)
      
    }
    catch ({code, message}){
      console.warn(`Error in example '${stateKey}': `, message)
    }
  }

  async onSubmit(){
    const token = await AsyncStorage.getItem('token')
    if(this.state.eventName != '' && this.state.password != '' && this.state.description != '' && this.state.budget != '' && this.state.imageUrl !== '' && this.state.simpleText !== "Pick a Date"){
      let newData = {
        eventName: this.state.eventName,
        password: this.state.password,
        budget: this.state.budget,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        deadlineDate: this.state.simpleText
      }
      this.setState({
        eventName: '',
        password: '',
        budget: '',
        description: '',
        imageUrl: '',
        simpleText: 'Pick a Date',
        simpleDate: new Date()
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
      this.setState({
        eventName: '',
        password: '',
        budget: '',
        description: '',
        imageUrl: '',
        simpleText: 'Pick a Date',
        simpleDate: new Date()
      });
      this.setModalVisible(!this.state.modalVisible)
  }

  uploadImage(response, mime = "application/octet-stream") {
		return new Promise((resolve, reject) => {
		
			const uploadUri =
			Platform.OS === "android" ? response.uri.replace("file://", "") : response.uri;
		
			let uploadBlob = null;
			const imageRef = storageRef.ref("item_photos/" + response.fileName);
		
			fs.readFile(uploadUri, "base64")
				.then(data => {
					return Blob.build(data, { type: `${mime};BASE64` });
				})
				.then(blob => {
					uploadBlob = blob;
					return imageRef.put(blob, { contentType: mime });
				})
				.then(() => {
					uploadBlob.close();
					return imageRef.getDownloadURL();
				})
					.then(url => {
					resolve(url);
				})
					.catch(err => {
					reject(err);
				});
		});
	}
	
	openGallery() {
		console.log("openGallery")

		var options = {
			title: "Select Avatar",
			customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
			storageOptions: {
				skipBackup: true,
				path: "images"
			}
		}

		ImagePicker.showImagePicker(options, response => {
			console.log("Response = ", response);
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {
        this.setState({
          loading: true,
        })
				// let source = { uri: response.uri };

				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				// console.log(source, " ini source");
				this.uploadImage(response)
				.then(url => {
          console.log("---> url : ", url);
          this.setState({
            imageUrl: url,
            loading: false
          })
				})
				.catch(err => {
					console.log(err);
				});
			}
		});
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
                     <Item floatingLabel>
                        <Label>Set Password for Event</Label>
                        <Input secureTextEntry={this.state.hidePassword} name="password"  onChangeText={(text)=> this.onchangePassword(text)}/>
                     </Item>
                     <Item floatingLabel>
                        <Label>Budget</Label>
                        <Input name="budget" onChangeText={(text)=> this.onchangeBudget(text)} />
                     </Item>
                     <Item floatingLabel>
                        <Label>Description </Label>
                        <Input name="description" onChangeText={(text)=> this.onchangeDescription(text)} />
                     </Item>
                     <Item inlineLabel style={{paddingTop: 35}}>
                        <Label style={{marginRight: 8}}>Image </Label>
                          { this.state.loading
                            ? <ActivityIndicator medium/>
                            : <Thumbnail medium square source={{uri: this.state.imageUrl}} style={{marginBottom: 5}}/>
                          }
                        <Right>
                          <Button 
                            style={{marginBottom: 5}}
                            small
                            onPress={() => {
                            this.openGallery();
                            }}
                          >
                            <Text> Open gallery </Text>
                          </Button>
                        </Right>
                     </Item>
                     <Item inlineLabel style={{paddingTop: 35}} last>
                        <Label>Select Date of Event </Label>
                        <TouchableWithoutFeedback onPress={this.showPicker.bind(this, 'simple', { date: this.state.simpleDate})}>
                        <Text> {this.state.simpleText} </Text>
                        </TouchableWithoutFeedback>
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
