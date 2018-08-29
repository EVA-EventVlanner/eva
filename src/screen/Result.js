//import liraries
import React, { Component } from "react";
import {
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView
} from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Right,
  Left,
  Body,
  Form,
  Picker
} from "native-base";
import { connect } from "react-redux";
import { getEventById } from "../actions/eventActions";
import ModalEvent from "../components/ModalAddEvent";
import ItemResultDetail from "../components/ItemResultDetail";

// create a component
class Result extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let id = this.props.navigation.getParam("id")._id;
    this.props.getEventById(id);
  }

  verify() {
    alert("clicked verify");
  }

  render() {
    let visionResult = this.props.navigation.getParam("visionResult");

    console.log("vision result dari komponen result ---> ", visionResult);

    console.log("ini dari result: ", this.props);
    let itemList = this.props.event.items;
    console.log("INI ITEM LIST: ", itemList);
    let type = this.props.navigation.getParam("type");
    console.log("ini type", type);
    return (
      <Container>
        <Content>
          <Card>
            <CardItem style={{ justifyContent: "center" }}>
              <Text
                style={{ textAlign: "center", fontSize: 25, fontWeight: "500" }}
              >
                {" "}
                Event Name{" "}
              </Text>
            </CardItem>
          </Card>
          {type === "transport" ? (
            <ScrollView>
              <Card style={{ borderRadius: 10 }}>
                <CardItem>
                  <Left>
                    <Text style={{ fontWeight: "600" }}>{type}</Text>
                  </Left>
                  <Right>
                    <ItemResultDetail
                      itemList={this.props.event.items}
                      type={this.props.event.items.itemName}
                    />
                  </Right>
                </CardItem>
                <CardItem>
                  <Left>
                    <Text style={{ fontWeight: "600" }}>Rp 13000</Text>
                  </Left>
                  <Right>
                    <Button
                      onPress={() => {
                        this.verify();
                      }}
                    >
                      <Text
                        style={{
                          alignContent: "center",
                          alignItems: "center",
                          padding: 20
                        }}
                      >
                        Verify
                      </Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            </ScrollView>
          ) : (
            <FlatList
              data={visionResult.receiptItems}
              renderItem={({ item, index }) => {
                return (
                  <Card style={{ borderRadius: 10 }} key={String(index)}>
                    <CardItem>
                      <Left>
                        <Text style={{ fontWeight: "600" }}>{item.item}</Text>
                      </Left>
                      <Right>
                        <ItemResultDetail
                          itemList={this.props.event.items}
                          type={this.props.event.items.itemName}
                          key={index}
                        />
                      </Right>
                    </CardItem>
                    <CardItem>
                      <Left>
                        <Text style={{ fontWeight: "600" }}>
                          Rp {item.number}
                        </Text>
                      </Left>
                      <Right>
                        <Button
                          onPress={() => {
                            this.verify();
                          }}
                        >
                          <Text
                            style={{
                              alignContent: "center",
                              alignItems: "center",
                              padding: 20
                            }}
                          >
                            Verify
                          </Text>
                        </Button>
                      </Right>
                    </CardItem>
                  </Card>
                );
              }}
              keyExtractor={item => item._id}
            />
          )}
        </Content>
      </Container>
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
const mapStateToProps = state => {
  return {
    event: state.eventReducers.event
  };
};

const mapDispatchToProps = dispatch => {
  return { getEventById: id => dispatch(getEventById(id)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);
