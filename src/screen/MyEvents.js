//import liraries
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Right, Left, Body } from 'native-base';
import {connect} from 'react-redux'
import {fetchingDataUser} from '../actions/eventActions'
import ModalEvent from '../components/ModalAddEvent'

// create a component
class MyEvents extends Component {
    constructor(props){
        super(props)
    }
    
    async componentDidMount () {
        const token = await AsyncStorage.getItem('token')
        console.log('ini token dari myevent', token)
        this.props.getUserData()
        
    }

    goToEvent(item){
        console.log("ini item: ", item)
        this.props.navigation.navigate("DetailBudget", {
            id: item
        })
    }

    render() {
        console.log("ini dari event: " , this.props.getUser)
        if(this.props.getUser.length === 0){
            return (
                <ActivityIndicator large style={{justifyContent:'center',flex: 1}} />
            )
        }
        else{
            let {name, imageProfile, events, role} = this.props.getUser
            return (
                <Container>
                    <Content>
                        <Card>
                            <CardItem style={{justifyContent:'center'}}>
                                <Text style={{textAlign:'center', fontSize:25, fontWeight:'500'}}> Hello, {name} </Text>
                            </CardItem>
                            <CardItem style={{justifyContent:'center'}}>
                                <Text style={{textAlign:'center', fontSize:20}}> What would you like to do today? </Text>
                            </CardItem>
                        </Card> 
                        <FlatList
                            data={events}
                            renderItem={({ item, index }) => {
                                return (
                                <Card style={{ borderRadius: 10 }} key={String(index)}> 
                                    <CardItem bordered style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, borderBottomWidth:0, borderTopWidth:1.5, borderWidth:2,  borderColor: role[index] === "admin" ? '#BA55D3': '#009BD2', }}>
                                        <Left>
                                            <Text style={{fontWeight:"600"}}>{item.eventName}</Text>
                                        </Left>
                                        <Right>
                                            <Text style={{textAlign:'right',  color: role[index] === "admin" ? '#BA55D3': '#009BD2' }}> <Text style={{fontWeight:"500"}}>Status: </Text>{role[index]}</Text>
                                        </Right>
                                    </CardItem>
                                    <CardItem bordered  style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopWidth: 1, borderBottomWidth:1.5, borderWidth: 2, borderColor: role[index] === "admin" ? '#BA55D3': '#009BD2', }}>
                                        <Left>
                                            <Thumbnail large square source={{uri: item.imageUrl}} style={{flex:1}}/>
                                        </Left>
                                        <Right>
                                            <Button medium rounded style={{padding:0, backgroundColor:'#009BD2'}} onPress={() => { this.goToEvent(item)}}>
                                                <Text style={{color:'white', padding: 0}}> View Event </Text>
                                            </Button>
                                        </Right>
                                    </CardItem>
                                </Card>
                                )
                            }}
                            />
                        <Right> 
                            <ModalEvent/>
                        </Right> 
                    </Content>
              </Container>
            );
        }
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
      getUser :  state.eventReducers.user
    }
  }
 const mapDispatchToProps = dispatch => {
  return {
    getUserData: () => dispatch(fetchingDataUser())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyEvents)
