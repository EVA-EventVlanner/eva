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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.event.items !== this.props.event.items ) {
      let id = this.props.navigation.getParam("id")._id;
      console.log("Update budget???")
      this.props.getEventById(id);
    }
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
            style={{ height: 70, width: "100%", flex: 1 }}
          />
          <Card style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
            <CardItem style={{ height: 80 }}>
              <Left>
                <Body>
                  <Text style={{fontSize: 30, fontWeight:"500", textAlign:'center', marginTop: 15}}> {event.eventName} </Text>
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
                  <Text style={{fontWeight: "500", fontSize: 18 }}>{event.admin.name}</Text>
                  <Text style={{color:"#BA55D3"}}>{event.admin.role[0]}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{ color: "#1c82f0", marginLeft: -9, fontWeight:"600" }}>
                  Budget :<Text style={{color: 'black'}}> Rp {" " + event.budget.toLocaleString()}</Text>
                </Text>
                <Text style={{ color: "#1c82f0", marginLeft: -9, fontWeight:"600" }}>
                  Remains :<Text style={{color: 'red'}}> Rp {" " + event.currentBudget.toLocaleString()}</Text>
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
          <ScrollView horizontal style={{height:520}}>
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
