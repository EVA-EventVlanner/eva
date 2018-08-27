//import liraries
import React, { Component } from "react";
import { View, StyleSheet, Modal, Platform, ScrollView } from "react-native";
import {
  Button,
  Icon,
  Item,
  Input,
  Body,
  Left,
  Right,
  Text,
  Thumbnail,
  CardItem
} from "native-base";
import ImagePicker from "react-native-image-picker";
import storageRef from "../firebase/firebase";
import RNFetchBlob from "react-native-fetch-blob";
import { connect } from "react-redux";
import { AddItemToEvent } from "../actions/eventActions";
// import RNFetchBlob from "../../node_modules/react-native-fetch-blob/index";
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

// create a component
class ModalAddItem extends Component {
  state = {
    modalVisible: false,
    itemName: null,
    itemPrice: null,
    quantity: null,
    eventId: this.props.eventId,
    avatarSource:
      "https://facebook.github.io/react-native/docs/assets/favicon.png"
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onChangeItemName(text) {
    this.setState({
      itemName: text
    });
  }
  onChangeItemPrice(text) {
    this.setState({
      itemPrice: text
    });
  }
  onChangeQuantity(text) {
    this.setState({
      quantity: text
    });
  }
  submitItem() {
    // console.log(this.props.eventId);
    this.props.AddItemToEvent(this.state);
  }

  uploadImage(response, mime = "application/octet-stream") {
    return new Promise((resolve, reject) => {
      const uploadUri =
        Platform.OS === "android"
          ? response.uri.replace("file://", "")
          : response.uri;

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
    console.log("openGallery");

    var options = {
      title: "Select Avatar",
      customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.uploadImage(response)
          .then(url => {
            console.log(url);
            this.setState({
              avatarSource: url
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  render() {
    return (
      <ScrollView style={{ marginTop: 10 }}>
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
                placeholder="Input item name"
                onChangeText={text => this.onChangeItemName(text)}
                style={{ marginTop: 20 }}
              />
            </Item>
            <Item>
              <Input
                color={"grey"}
                placeholder="Input price"
                onChangeText={text => this.onChangeItemPrice(text)}
                style={{ marginTop: 20 }}
              />
            </Item>
            <Item>
              <Input
                color={"grey"}
                placeholder="Input quantity"
                onChangeText={text => this.onChangeQuantity(text)}
                style={{ marginTop: 20 }}
              />
            </Item>
          </View>
          <CardItem>
            <Left>
              <Button
                onPress={() => {
                  this.openGallery();
                }}
                style={{ width: 100, marginTop: 20 }}
              >
                <Text style={{ paddingLeft: 30 }}> add image </Text>
              </Button>
            </Left>
            <Right>
              <Button
                onPress={() => {
                  this.submitItem();
                }}
                style={{ width: 100, marginTop: 20 }}
              >
                <Text style={{ paddingBottom: 3, paddingLeft: 20 }}>
                  {" "}
                  Submit{" "}
                </Text>
              </Button>
            </Right>
          </CardItem>
          <View>
            <Thumbnail
              style={{ marginLeft: "40.5%", marginTop: -60 }}
              square
              large
              source={{
                uri: this.state.avatarSource
              }}
            />
          </View>
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
      </ScrollView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#2c3e50"
  }
});

//make this component available to the app

const mapStateToProps = state => {
  return {
    events: state.eventReducers.events
  };
};
const mapDispatchToProps = dispatch => {
  return {
    AddItemToEvent: obj => dispatch(AddItemToEvent(obj))
  };
};

//make this component available to the app
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAddItem);
