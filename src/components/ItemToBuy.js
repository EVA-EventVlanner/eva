//import liraries
import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
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
class MyClass extends Component {
  render() {
    let item = this.props.item;
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
            <Text> Quantity: {item.quantity} </Text>
          </Body>
          <Body style={{ marginTop: 0 }}>
            <Button disabled onPress={() => this.methodMantao()} rounded>
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
