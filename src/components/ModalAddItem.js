//import liraries
import React, { Component } from "react";
import { View, StyleSheet, Modal } from "react-native";
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
// create a component
class ModalAddItem extends Component {
  state = {
    modalVisible: false,
    password: null
  };
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  onchangePassword(text) {
    this.setState({
      password: text
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
