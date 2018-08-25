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
<<<<<<< HEAD
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
      alert("Password can't be null");
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
            alert(data.message);
          } else {
            alert("Berhasil Login");
            this.setState({
              modalVisible: false
            });
            this.props.navigation.navigate("DetailBudget", {
              id: event
            });
          }
        })
        .catch(err => {
          alert("Terjadi error tidak terduga");
        });
=======
    state = {
        modalVisible: false,
      };
    
    setModalVisible(visible) {
    this.setState({modalVisible: visible});
    }
    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible)
                }}>
                <View style={{marginTop: 200}}>
                <Item  > 
                    <Input color={'grey'} placeholder="Underline Textbox" />
                </Item>
                    <Button color={'white'} style={{width:50, marginTop:10}} onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                    }} >
                    <Text 
                    style={{alignContent:'center', 
                    alignItems:'center',
                    padding:10}} > 
                    Join 
                    </Text>
                    </Button>
                </View>
                </Modal>
                <Button
                    onPress={() => {
                    this.setModalVisible(true);
                    }}
                    transparent textStyle={{color: '#87838B'}}>
                    <Icon style={{marginLeft:5,marginRight:5}} name="md-open" />
                    <Text style={{color:'#87838B'}} >Join as commitee</Text>
                </Button>
            </View>
        );
>>>>>>> c94e42a82635c6f8d8f0720c0d1d393cb0038f42
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
