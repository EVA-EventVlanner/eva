//import liraries
import React, { Component } from "react";
import { View, StyleSheet, Modal, Platform } from "react-native";
import {
  Button,
  Icon,
  Item,
  Input,
  Body,
  Left,
  Right,
  Text
} from "native-base";
import ImagePicker from "react-native-image-picker";
import storageRef from "../firebase/firebase";
import RNFetchBlob from "react-native-fetch-blob";
// import RNFetchBlob from "../../node_modules/react-native-fetch-blob/index";
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
		
// create a component
class ModalAddItem extends Component {
	state = {
		modalVisible: false,
		password: null,
		avatarSource: ""
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	onchangePassword(text) {
		this.setState({
		password: text
		});
	}

	uploadImage(uri, mime = "application/octet-stream") {
		return new Promise((resolve, reject) => {
		
			const uploadUri =
			Platform.OS === "android" ? uri.replace("file://", "") : uri;
		
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

	render() {
		return (
		<View style={{ marginTop: 22 }}>
			<Modal
			animationType="slide"
			transparent={false}
			visible={this.state.modalVisible}
			onRequestClose={() => {
				this.setModalVisible(!this.state.modalVisible);
			}}
			>
			<View style={{ marginTop: 200 }}>
				<Item>
				<Input
					color={"grey"}
					placeholder="Input password"
					onChangeText={text => this.onchangePassword(text)}
				/>
				</Item>
			</View>
			<Button
				onPress={() => {
				this.openGallery();
				}}
			>
				<Text> Open gallery </Text>
			</Button>
			</Modal>
			<Button
			onPress={() => {
				this.setModalVisible(true);
			}}
			rounded
			style={{ width: 120 }}
			>
			<Icon style={{ marginLeft: 50, paddingRight: 0 }} name="md-cart" />
			<Text style={{ marginRight: 35, paddingLeft: 0 }}>Add Item</Text>
			</Button>
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
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app
export default ModalAddItem;
