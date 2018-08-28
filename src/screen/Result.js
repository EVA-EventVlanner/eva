//import liraries
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Right, Left, Body, Form, Picker } from 'native-base';
import {connect} from 'react-redux'
import {getEventById} from '../actions/eventActions'
import ModalEvent from '../components/ModalAddEvent'

// create a component
class Result extends Component {
    constructor(props){
        super(props)
        this.state={
           fakeData: [{
              name: "Sampoerna",
              price: 20000
           },
           {
            name: "Nü greentea",
            price: 10000
         },
         {
            name: "Frissian Flag",
            price: 5000
         },
         {
            name: "Kopiko",
            price: 10000
         }],
         selected: "key1"
        }
        this.onValueChange = this.onValueChange.bind(this);
    }
   
    async componentDidMount () {
      let id = this.props.navigation.getParam("id")._id;
      this.props.getEventById(id);
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

    verify(){
      alert("clicked verify")
    }

    generatePicker(){
       return(
         <Picker
         mode="dropdown"
         iosHeader="Select your SIM"
         iosIcon={<Icon name="ios-arrow-down-outline" />}
         style={{ width: 150 }}
         selectedValue={this.state.selected}
         onValueChange={this.onValueChange}
         >
            <Picker.Item label="Wallet" value="key0" />
            <Picker.Item label="ATM Card" value="key1" />
            <Picker.Item label="Debit Card" value="key2" />
            <Picker.Item label="Credit Card" value="key3" />
            <Picker.Item label="Net Banking" value="key4" />
         </Picker>
       )
    }

    render() {
        let visionResult = this.props.navigation.getParam("visionResult");

        console.log('vision result dari komponen result ---> ', visionResult)

        console.log("ini dari result: " , this.props)
        let itemList = this.props.event.items
        console.log("INI ITEM LIST: ", itemList)

         return (
               <Container>
                  <Content>
                     <Card>
                           <CardItem style={{justifyContent:'center'}}>
                              <Text style={{textAlign:'center', fontSize:25, fontWeight:'500'}}> Event Name </Text>
                           </CardItem>
                     </Card> 
                     <FlatList
                           data={visionResult.receiptItems}
                           renderItem={({ item, index }) => {
                              return (
                              <Card style={{ borderRadius: 10 }} key={String(index)}> 
                                 <CardItem>
                                       <Left>
                                          <Text style={{fontWeight:"600"}}>{item.item}</Text>
                                       </Left>
                                       <Right>
                                          {this.generatePicker()}
                                          {/* <Picker
                                             mode="dropdown"
                                             placeholderStyle={{ color: "black" }}
                                             style={{ width: 160 }}
                                             selectedValue={this.state.selected}
                                             onValueChange={this.onValueChange}
                                             >
                                             {itemList.map((eachItem,index) => (
                                                <Picker.Item label={eachItem.itemName} value={index} />
                                             ))} 
                                          </Picker> */}
                                       </Right>
                                 </CardItem>
                                 <CardItem>
                                    <Left>
                                       <Text style={{fontWeight:"600"}}>Rp {item.number}</Text>
                                    </Left>
                                    <Right>
                                    <Button
                                       onPress={() => {
                                          this.verify()
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
                              )
                           }}
                           keyExtractor={(item) => item._id}
                           />
                  </Content>
            </Container>
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

//make this component available to the app
const mapStateToProps = (state) => {
   return {
      event: state.eventReducers.event
   }
}

const mapDispatchToProps = dispatch => {
   return { getEventById: id => dispatch(getEventById(id)) };
};
 

export default connect(mapStateToProps,mapDispatchToProps)(Result)
