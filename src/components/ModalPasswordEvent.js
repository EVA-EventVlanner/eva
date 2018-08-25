//import liraries
import React, { Component } from "react";
import { Modal, TouchableOpacity, View, StyleSheet } from "react-native";
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
import axios from "axios";
// create a component
class ModalPasswordEvent extends Component {
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
  goToDetail() {
    if (!this.state.password) {
      // alert("Password can't be null");
      console.log('password can not be null')
    } else {
      let password = this.state.password;
      let eventId = this.props.eventId;
      let event = this.props.event;
      console.log(password, "ini loh");
      axios
        .post(`https://eva-server.ariefardi.xyz/events/${eventId}/login`, {
          password
        })
        .then(({ data }) => {
          if (data.message === "Password is wrong") {
            // alert(data.message);
            console.log(data.message)
          } else {
            // alert("Berhasil Login");
            console.log('berhasil login')
            this.setState({
              modalVisible: false
            });
            this.props.navigation.navigate("DetailBudget", {
              id: event
            });
          }
        })
        .catch(err => {
          // alert("Terjadi error tidak terduga");
          console.log("Terjadi error tidak terduga");
        });
    }
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
            <Button
              color={"white"}
              style={{ width: 70, marginTop: 10, marginLeft: "70%" }}
              onPress={() => {
                this.goToDetail();
              }}
            >
              <Text
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  padding: 20
                }}
              >
                Join
              </Text>
            </Button>
          </View>
        </Modal>
        <Button
          onPress={() => {
            this.setModalVisible(true);
          }}
          transparent
          textStyle={{ color: "#87838B" }}
        >
          <Icon style={{ marginLeft: 5, marginRight: 5 }} name="md-open" />
          <Text style={{ color: "#87838B" }}>Join as commite</Text>
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
export default ModalPasswordEvent;
