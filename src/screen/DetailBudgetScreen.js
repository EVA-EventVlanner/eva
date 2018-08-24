//import liraries
import React, { Component } from "react";
import { ScrollView, StyleSheet, Image } from "react-native";
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
// create a component
class DetailBudgetScreen extends Component {
  render() {
    if (this.props) {
      const { navigation } = this.props;
      const eventDetail = navigation.getParam("id");
      const imageUrl = eventDetail.imageUrl;
      console.log(eventDetail, " ini event detail");
      return (
        <ScrollView>
          <Container>
            <CardItem style={{ height: 200 }}>
              <Image
                source={{ uri: imageUrl }}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
            <Card style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
              <CardItem style={{ height: 80 }}>
                <Left>
                  <Body>
                    <Text> {eventDetail.eventName} </Text>
                    <Text note> {eventDetail.location} </Text>
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
                  <Thumbnail
                    source={{
                      uri: eventDetail.admin.imageProfile
                    }}
                  />
                  <Body>
                    <Text>{eventDetail.admin.name}</Text>
                    <Text>{eventDetail.admin.role[0]}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Left>
                  <Button
                    onPress={() => {
                      this.setModalVisible(true);
                    }}
                    disabled
                    transparent
                    textStyle={{ color: "#87838B" }}
                  >
                    <Icon name="md-cash" />
                    <Text style={{ color: "#1c82f0", marginLeft: -9 }}>
                      Budget : Rp .{" " + eventDetail.budget.toLocaleString()}
                    </Text>
                  </Button>
                </Left>
                <Right>
                  <Button
                    onPress={() => {
                      this.setModalVisible(true);
                    }}
                    disabled
                    rounded
                    style={{ width: 120 }}
                  >
                    <Icon
                      style={{ marginLeft: 50, paddingRight: 0 }}
                      name="md-cart"
                    />
                    <Text style={{ marginRight: 30, paddingLeft: 0 }}>
                      Add Item
                    </Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </Container>
        </ScrollView>
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
export default DetailBudgetScreen;
