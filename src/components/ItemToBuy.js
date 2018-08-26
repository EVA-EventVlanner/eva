//import liraries
import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
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
import axios from 'axios'

// create a component
class MyClass extends Component {

	uploadToStorage() {
		console.log("openGallery");
		
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

				// let source = { uri: response.uri };
				// console.log('ini imagenya : ', response)

				// console.log('object image created : ', image)
				
				let api_upload_uri = 'https://eva-server.ariefardi.xyz/vision/upload'
				// let api_upload_uri = 'http://localhost:3000/vision/upload'

				const imgBody = new FormData();
				
				// append the image to the object with the title 'image'
				imgBody.append('image', image);
				
				// Perform the request. Note the content type - very important
				// fetch(api_upload_uri, {
				// 	method: 'POST',
				// 	headers: {
				// 		'Accept': 'application/json',
				// 		'Content-Type': 'multipart/form-data',
				// 	},
				// 	body: imgBody
				// })

				axios({
					url: api_upload_uri,
					method: 'post',
					data: imgBody,
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
				<Button onPress={() => this.uploadToStorage()} rounded>
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
