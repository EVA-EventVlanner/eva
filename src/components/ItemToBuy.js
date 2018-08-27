//import liraries
import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";

import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from "react-native-fetch-blob";
// import RNFetchBlob from "../../node_modules/react-native-fetch-blob/index";
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
import axios from 'axios'

// create a component
class MyClass extends Component {
	
	uploadToStorage() {
		console.log("openGallery");
		
		let mime = "application/octet-stream"

		var options = {
			title: "Select Avatar",
			customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
			storageOptions: {
				skipBackup: true,
				path: "images"
			}
		}

 		ImagePicker.showImagePicker(options, response => {
			console.log("Response = ", response)
 			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.customButton) {
				console.log("User tapped custom button: ", response.customButton);
			} else {
 				// format the image data 
				const image = {
					uri: response.uri,
					data: response.data,
					type: 'image/jpeg',
					name: 'myImage' + '-' + Date.now() + '.jpg'
				}
				
				let api_upload_uri = 'https://eva-server.ariefardi.xyz/vision/upload'
				 
				const imgBody = new FormData();
				
				const uploadUri =
				Platform.OS === "android" ? response.uri.replace("file://", "") : uri;
			
				let uploadBlob = null;
				
				fs.readFile(uploadUri, 'base64')
				.then ( function (data) {
					console.log('ini data abis reaf file ----> ', data)
					return Blob.build(data, { type: `${mime}; BASE64`})
				})
				.then(function (blob) {
					console.log('-----> ini blobnya  :', blob)
				})

				// append the image to the object with the title 'image'
				imgBody.append('image', image);

				console.log('ini img body ----> ',imgBody)

 				axios({
					url: api_upload_uri,
					method: 'post',
					body: imgBody,
					headers: {
						'Accept' : 'application/json',
						'Content-Type' : 'multipart/form-data',
					}
				 })
				.then( function (visionResult) {
					console.log(visionResult)
				})
				.catch( function (error) {
					console.error(error);
				})
			}
		})
	}




	render() {
		let item = this.props.item;
		console.log("=====>>>>", this.props)
		let {navigate} = this.props.navigation
		if (item !== undefined) {
		return (
			<Card style={{ height: 200, width: 150 }}>
			<CardItem>
				<Body
				style={{
					justifyContent: "center",
					alignContent: "center",
					alignItems: "center"
				}}
				>
				<Thumbnail
					source={{
					uri: item.imageItem
					}}
				/>
				</Body>
			</CardItem>
			<Body>
				<Text> {item.itemName} </Text>
			</Body>
			<Body style={{ marginTop: -30 }}>
				<Text> Item Qty: {item.quantity} </Text>
			</Body>
			<Body style={{ marginTop: 0 }}>
				<Button onPress={() => navigate("Result")} rounded>
				<Icon name="ios-camera" />
				</Button>
			</Body>
			</Card>
		);
		} else {
		return <ActivityIndicator />;
		}
	}
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default MyClass;
