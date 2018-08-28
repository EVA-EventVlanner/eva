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

import ImagePicker from "react-native-image-picker";
import storageRef from "../firebase/firebase";
import RNFetchBlob from "react-native-fetch-blob";
// import RNFetchBlob from "../../node_modules/react-native-fetch-blob/index";
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
import axios from "axios";

// create a component
class MyClass extends Component {
  constructor(props) {
    super(props);
  }

  uploadToGoogleStorage() {
    ImagePicker.showImagePicker({ title: "Select Image" }, response => {
      //   console.log("ini response image picker : ", response);

      //   console.log("ini response.uri awal --> ", response.uri);

      //   response.uri = "file://" + response.uri;
      //   response.path = "file://" + response.path;

      //   console.log("ini response.uri baru ---> ", response.uri);

      // format the image data
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let image = {
          uri: response.uri,
          type: response.type,
          name: "myImage" + "-" + Date.now() + ".jpg"
        };

        // Instantiate a FormData() object
        let imgBody = new FormData();

        // append the image to the object with the title 'image'
        imgBody.append("image", image);
        let url = `https://eva-server.ariefardi.xyz/vision/analyzelink`;

        console.log("imgBody sent to server --> ", imgBody);

        // Perform the request. Note the content type - very important
        axios
          .post(url, { type: "transport" })
          .then(res => {
            let visionResult = res.data.result;

            console.log("ini vision result --> ", visionResult);

            this.props.navigation.navigate("Result", {
              visionResult: visionResult
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  }

  render() {
    let item = this.props.item;
    console.log("=====>>>>", this.props);
    let { navigate } = this.props.navigation;
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
            {/* <Button onPress={() => navigate("Result")} rounded> */}
            <Button onPress={() => this.uploadToGoogleStorage()} rounded>
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
