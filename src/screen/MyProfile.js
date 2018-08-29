//import liraries
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  AsyncStorage,
  ActivityIndicator,
  FlatList
} from "react-native";
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
  Right,
  Left,
  Body,
  Accordion
} from "native-base";
import { connect } from "react-redux";
import { fetchingDataUser } from "../actions/eventActions";
import store from "../store/store";
// create a component
class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    let id = store.getState().eventReducers.userId;
    console.log("ini id", id);
    this.props.fetchingDataUser(id);
    console.log("this prop did mount: ");
  }

  renderHeaderDisini(data, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          backgroundColor: "#009BD2"
        }}
      >
        <Left>
          <Text style={{ fontWeight: "600", color: "white" }}>
            {data.eventName.eventName}
          </Text>
        </Left>
        <Right>
          <Text style={{ fontWeight: "600", color: "red", marginRight: 8 }}>
            {" "}
            - Rp {data.debt}{" "}
          </Text>
        </Right>
        {expanded ? (
          <Icon style={{ fontSize: 18, color: "white" }} name="remove-circle" />
        ) : (
          <Icon style={{ fontSize: 18, color: "white" }} name="add-circle" />
        )}
      </View>
    );
  }
  renderContentDisini(data) {
    return (
      <View>
        <Text style={{ fontSize: 16, fontWeight: "500" }}>
          Debt for this event:{" "}
        </Text>
        <Card transparent>
          <CardItem>
            <Left>
              <Text style={{ fontWeight: "500", color: "red" }}>
                {data.itemName.itemName}
              </Text>
            </Left>
            <Right>
              <Thumbnail source={{ uri: data.itemName.imageItem }} />
            </Right>
          </CardItem>
        </Card>
      </View>
    );
  }
  render() {
    let { name, imageProfile, debt, events } = this.props.getUser;
    console.log(debt, " ini adalah debt saya");
    // console.log(this.props.getUser, " ini get user");
    if (this.props.getUser.length === 0) {
      return (
        <ActivityIndicator style={{ justifyContent: "center", flex: 1 }} />
      );
    } else {
      return (
        <Container>
          <Content>
            <Card>
              <CardItem style={{ justifyContent: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 25,
                    fontWeight: "500"
                  }}
                >
                  {" "}
                  {name}{" "}
                </Text>
              </CardItem>
              <CardItem style={{ justifyContent: "center" }}>
                <Image
                  style={{
                    alignSelf: "center",
                    height: 150,
                    width: 150,
                    borderWidth: 1,
                    borderRadius: 75
                  }}
                  source={{ uri: imageProfile }}
                  resizeMode="cover"
                />
              </CardItem>
            </Card>
            <Accordion
              dataArray={debt}
              renderHeader={this.renderHeaderDisini}
              renderContent={this.renderContentDisini}
            />
          </Content>
        </Container>
      );
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

const mapStateToProps = state => {
  console.log(state.eventReducers, " ini dari store");
  return {
    getUser: state.eventReducers.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchingDataUser: id => dispatch(fetchingDataUser(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile);
