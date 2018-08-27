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
         selected: undefined
        }
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
      });
      console.log("onValueChange: ", this.state.selected)
    }

    verify(){
      alert("clicked verify")
    }

    render() {
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
                           data={this.state.fakeData}
                           renderItem={({ item, index }) => {
                              return (
                              <Card style={{ borderRadius: 10 }} key={String(index)}> 
                                 <CardItem>
                                       <Left>
                                          <Text style={{fontWeight:"600"}}>{item.name}</Text>
                                       </Left>
                                       <Right>
                                       <Picker
                                          mode="dropdown"
                                          placeholderStyle={{ color: "black" }}
                                          style={{ width: 160 }}
                                          selectedValue={this.state.selected}
                                          onValueChange={this.onValueChange.bind(this)}
                                          >
                                          {itemList.map((eachItem,index) => (
                                             <Picker.Item label={eachItem.itemName} value={index} />
                                          ))} 
                                          </Picker>
                                       </Right>
                                 </CardItem>
                                 <CardItem>
                                    <Left>
                                       <Text style={{fontWeight:"600"}}>Rp {item.price}</Text>
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
