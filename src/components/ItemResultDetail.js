//import liraries
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Right, Left, Body, Form, Picker } from 'native-base';

// create a component
class ItemResultDetail extends Component {
    constructor(props){
        super(props)
        this.state={
           selected: 0
        }
        this.onValueChange = this.onValueChange.bind(this);
    }
   
    onValueChange(value) {
       console.log("VALUE?? ", value)
       let key = value
      this.setState({
        selected: key
      }, function () {
         console.log("onValueChange: ", this.state.selected)
      });
    }

    render() {
         let {itemList} = this.props
         console.log("item detail props: ", this.props)
         return (
               <Picker
                  mode="dropdown"
                  style={{ width: 160 }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange}
                  >
                  {itemList.map((eachItem,index) => (
                     <Picker.Item label={eachItem.itemName} value={index} />
                  ))} 
               </Picker>
         );
      }   
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    }
});


export default ItemResultDetail
