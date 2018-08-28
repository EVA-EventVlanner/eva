//import liraries
import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  View
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
  Left,
  Body,
  Right
} from "native-base";
import ItemToBuy from "../components/ItemToBuy";
import ModalAddItem from "../components/ModalAddItem";
import { connect } from "react-redux";
import { getEventById } from "../actions/eventActions";
import store from "../store/store";
// create a component
class DetailBudgetScreen extends Component {
  componentDidMount() {
    console.log(" componend did mount from detail screem");
    let id = this.props.navigation.getParam("id")._id;
    this.props.getEventById(id);
  }
  render() {
    if (this.props.event) {
      const { navigation } = this.props;
      const event = this.props.event;

      console.log('event ---> ', event)

      const eventDetail = navigation.getParam("id");
      const imageUrl = event.imageUrl;
      // console.log(imageUrl, " ini event detail");
      return (
        <ScrollView>
          <Image
            source={{ uri: imageUrl }}
            style={{ height: 202, width: null, flex: 1 }}
          />
          <Card style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
            <CardItem style={{ height: 100 }}>
              <Left>
                <Body>
                  <Text> {event.eventName} </Text>
                  <Text note> {event.location} </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Button
                  rounded
                  large
                  style={{ width: 200, height: 35, marginLeft: -120 }}
                >
                  <Text style={{ fontSize: 12, marginLeft: 100 }}>
                    {" "}
                    POSTED BY{" "}
                  </Text>
                </Button>
              </Left>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: event.admin.imageProfile }} />
                <Body>
                  <Text>{event.admin.name}</Text>
                  <Text>{event.admin.role[0]}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{ color: "#1c82f0", marginLeft: -9 }}>
                  Budget : Rp {" " + event.budget.toLocaleString()}
                </Text>
                <Text style={{ color: "#1c82f0", marginLeft: -9 }}>
                  Remains : Rp {" " + event.currentBudget.toLocaleString()}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left></Left>
              <Right>
                <ModalAddItem eventId={event._id} />
              </Right>
            </CardItem>
          </Card>
          <ScrollView horizontal>
            {event.items.map((item, index) => (
              <ItemToBuy navigation={this.props.navigation} key={index} item={item} />
            ))}
            {event.items.map((item, index) => (
              <ItemToBuy navigation={this.props.navigation} key={index} item={item} />
            ))}
          </ScrollView>
          <ScrollView horizontal>
            {event.items.map((item, index) => (
              <ItemToBuy navigation={this.props.navigation} key={index} item={item} />
            ))}
            {event.items.map((item, index) => (
              <ItemToBuy navigation={this.props.navigation} key={index} item={item} />
            ))}
          </ScrollView>
        </ScrollView>
      );
    } else {
      return (
        <View>
          <ActivityIndicator size={75} />
        </View>
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

//make this component available to the app
const mapStateToProps = state => {
  console.log(state.eventReducers, " ini dari state mapstateprops");
  return {
    event: state.eventReducers.event
  };
};
const mapDispatchToProps = dispatch => {
  return { getEventById: id => dispatch(getEventById(id)) };
};

//make this component available to the app
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailBudgetScreen);
