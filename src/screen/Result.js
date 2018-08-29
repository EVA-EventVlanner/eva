//import liraries
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Right, Left, Body, Form, Picker } from 'native-base';
import {connect} from 'react-redux'
import {getEventById, fetchingDataUser} from '../actions/eventActions'
import ModalEvent from '../components/ModalAddEvent'
import ItemResultDetail from '../components/ItemResultDetail'
import axios from 'axios'
import store from '../store/store'

// create a component
class Result extends Component {
    constructor(props){
        super(props)
        this.state = {
            indexListSelected: 0,
            userId: '',
            eventId: '',
            itemId: ''
        }

        this.getItemIndexSelector = this.getItemIndexSelector.bind(this)
    }
   
    async componentDidMount () {
      let id = this.props.navigation.getParam("id")._id;
      this.props.getEventById(id);
      this.props.getUserData()
    }

    getItemIndexSelector(indexOfList) {
        // console.log('ini index dari selector list ---> ', indexOfList)

        this.setState({
            indexListSelected: indexOfList
        }, function () {
            let userId = store.getState().eventReducers.userId
            this.setState({
                eventId: this.props.event._id,
                itemId: this.props.event.items[this.state.indexListSelected]._id,
                userId : userId
            }, function () {
                console.log('this.state after setstate value --> ', this.state)
            })
        })
    }

    verify(){
        // alert("clicked verify")

        console.log('userId : ', this.state.userId)
        console.log('eventId : ', this.state.eventId)
        console.log('itemId : ', this.state.itemId)

        axios.post(`https://eva-server.ariefardi.xyz/events/${this.state.eventId}/item/${this.state.itemId}/buy/${this.state.userId}`, {
            receiptPrice: 5000
        })
        .then( function (res) {
            console.log(res)
            alert('Verify Suceess')
        })
        .catch( function (err) {
            console.log('error verify ---> ', err)
            alert('Verify Failed')
        })
    }

    finishVerify () {
        this.props.navigation.navigate("Home")
    }

    render() {
        console.log('ini get user dari render : ', this.props.getUser)

        let visionResult = this.props.navigation.getParam("visionResult");

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
                                          <ItemResultDetail itemList={this.props.event.items} getIndex={ this.getItemIndexSelector } key={index} />
                                       </Right>
                                 </CardItem>
                                 <CardItem>
                                    <Left>
                                       <Text style={{fontWeight:"600"}}>Rp {" " + item.number.toLocaleString()}</Text>
                                    </Left>
                                    <Body>
                                        <Text style={{fontWeight:"600"}}> Qty : {item.quantity ? item.quantity : 1 }</Text>
                                    </Body>
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
                           <Card>
                               <CardItem style={{justifyContent:'center'}}>
                                   <Body>
                                       <Button onPress={() => {
                                                this.finishVerify()
                                            }}
                                       >
                                           <Text>
                                               Finish
                                           </Text>
                                       </Button>
                                   </Body>
                               </CardItem>
                           </Card>
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
      event: state.eventReducers.event,
      getUser :  state.eventReducers.user
   }
}

const mapDispatchToProps = dispatch => {
    return {
        getEventById: id => dispatch(getEventById(id)),
        getUserData: () => dispatch(fetchingDataUser())
    }
};
 

export default connect(mapStateToProps,mapDispatchToProps)(Result)