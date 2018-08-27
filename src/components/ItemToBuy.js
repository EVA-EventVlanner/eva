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

import { Buffer } from '../buffer';

import ImagePicker from "react-native-image-picker";
import storageRef from "../firebase/firebase";
import RNFetchBlob from "react-native-fetch-blob";
// import RNFetchBlob from "../../node_modules/react-native-fetch-blob/index";
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
// import axios from 'axios'

// create a component
class MyClass extends Component {
	
	uploadImage(uri, mime = "application/octet-stream") {
		return new Promise((resolve, reject) => {
		
			const uploadUri =
			Platform.OS === "android" ? uri.replace("file://", "") : uri;
		
			let uploadBlob = null;
			const imageRef = storageRef.ref("receipt/" + response.fileName);
		
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

	openGallery () {
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
				// let source = { uri: response.uri };

				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				// console.log(source, " ini source");
				this.uploadImage(response.uri)
				.then(url => {
					console.log(url);
				})
				.catch(err => {
					console.log(err);
				});
			}
		});
	}

	uploadToFirebase () {
		
	}

	uploadStorageFromDocs () {
		console.log('opening gallery ..')
		
		ImagePicker.showImagePicker({ title: 'Select Image' }, (response) => {
			const body = new FormData();
			
			console.log('response.uri ---> ', response.uri)

			// format the image data 
			const image = {
			  uri: response.uri,
			  type: 'image/jpeg',
			  name: 'myImage' + '-' + Date.now() + '.jpg'
			}
		
			// Instantiate a FormData() object
		
			// append the image to the object with the title 'image'
			body.append('file', image);

			const url = 'https://eva-server.ariefardi.xyz/vision/upload'
		
			console.log('ini body (file) ---> ', body)
			// Perform the request. Note the content type - very important

			fetch('https://eva-server.ariefardi.xyz/vision/uploadtest', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'multipart/form-data',
				},
				body
			} )
			.then( function (response) {
				console.log('response server --> ', response)
			})
			.catch( function (err) {
				console.log(err)
			})

			// fetch(url, {
			// 	method: 'POST',
			// 	headers: {
			// 		'Accept': 'application/json',
			// 		'Content-Type': 'multipart/form-data',
			// 	},
			// 	body: imgBody
			// }).then(res => {
			// 	console.log(res)
			// }).catch(error => {
			// 	console.error(error);
			// });
		});
	}


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
				let api_upload_uri = 'https://eva-server.ariefardi.xyz/vision/upload'

				// console.log('----->  ini response uri : ', response.uri)
				// console.log('----->  ini base 64 data : ', response.data)
				
				// var binary = ''
				// var binary_string = window.atob(response.data);
				// var len = binary_string.length;
				// var bytes = new Uint8Array( len );
				// for (var i = 0; i < len; i++) {
				// 	binary += binary_string.charCodeAt(i);
				// }

				// console.log(binary)

				// method 2
				// var binary_string =  window.atob(response.data);
				// var len = binary_string.length;
				// var bytes = new Uint8Array( len );
				// for (var i = 0; i < len; i++)        {
				// 	bytes[i] = binary_string.charCodeAt(i);
				// }

				// let binary = Buffer.from(bytes.buffer)

				// console.log('ini bytes : ', bytes)
				// console.log('ini binary : ', binary)
			
				// const file = {
				// 	originalname: 'myImage' + '-' + Date.now() + '.jpg',
				// 	encoding: '7bit',
				// 	mimetype: 'image/jpeg',
				// 	buffer: binary,
				// 	size: response.fileSize }

				const image = {
					uri: response.uri,
					type: 'image/jpeg',
					name: 'myImage' + '-' + Date.now() + '.jpg'
				  }

				const formData = new FormData();
				formData.append('file', image)

				console.log('-----> ini data yg di tembak ke server : ', formData)
	
				fetch(api_upload_uri, {
					method: 'POST',
					headers: {
					  'Accept': 'application/json',
					  'Content-Type': 'multipart/form-data',
					},
					body: formData
				}).then(res => {
					console.log(res)
				}).catch(error => {
					console.error(error);
				});

				// axios.post(api_upload_uri, formData , { headers: {'content-type' : 'multipart/form-data'}})
				// .then( function (visionResult) {
				// 	console.log(visionResult)
				// })
				// .catch( function (error) {
				// 	console.error(error);
				// })
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
				<Button onPress={() => this.openGallery()} rounded>
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
