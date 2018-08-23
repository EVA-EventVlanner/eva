//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
// create a component
import {connect} from 'react-redux'
import {fetchingDataEvent} from '../actions/eventActions'
class CardEvent extends Component {
    componentDidMount () {

    }
    render() {
        const item = this.props.item
        return (
            <Card style={{flex: 0}}>
                  <CardItem>
                  <Left>
                     <Thumbnail source={{uri: 'Image URL'}} />
                     <Body>
                        <Text>NativeBase</Text>
                        <Text note>April 15, 2016</Text>
                     </Body>
                  </Left>
                  </CardItem>
                  <CardItem>
                  <Body>
                     <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
                     <Text>
                        {item.data}
                     </Text>
                  </Body>
                  </CardItem>
                  <CardItem>
                  <Left>
                     <Button transparent textStyle={{color: '#87838B'}}>
                        <Icon name="logo-github" />
                        <Text>1,926 stars</Text>
                     </Button>
                  </Left>
                  </CardItem>
               </Card>
        );
    }
}

// define your styles


//make this component available to the app
export default CardEvent;
