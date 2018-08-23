//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
// create a component
import {connect} from 'react-redux'
import {fetchingDataEvent} from '../actions/eventActions'
class CardEvent extends Component {
    render() {
        const item = this.props.item
        const imgUrl = item.imageUrl
        return (
            <Card style={{flex: 0}}>
                  <CardItem>
                  <Left>
                     <Body>
                        <Text> {item.eventName} </Text>
                        <Text note>Creator: {item.admin.username} </Text>
                     </Body>
                  </Left>
                  </CardItem>
                  <CardItem>
                  <Body>
                     <Image source={{uri: imgUrl}} style={{height: 200, width: '100%', alignContent:'center',alignItems:'center'}}/>
                     <Text style={{marginTop:10}} >
                        {item.description}
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

// const mapStateToProps = (state) => {
//     return {
//       data : state.pmReducer.accounts
//     }
//   }
  const mapDispatchToProps = dispatch => {
    return {
        fetchingDataEvent: () => dispatch(fetchingDataEvent())
    }
  }

//make this component available to the app
export default connect(null,mapDispatchToProps)(CardEvent)

