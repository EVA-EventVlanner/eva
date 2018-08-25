//import liraries
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Right, Left, Body } from 'native-base';
import {connect} from 'react-redux'
import {fetchingDataUser} from '../actions/eventActions'

// create a component
class MyEvents extends Component {
    constructor(props){
        super(props)
        this.state={
            anotherFake:[
                {
                    id:'1',
                    title: "Joget Joget Di BiFrost Bridge",
                    image: 'https://vignette.wikia.nocookie.net/marvelmovies/images/1/16/Bifrost.jpg/revision/latest?cb=20110504130352',
                    status: "member",
                },
                {
                    id:'2',
                    title: "Joget Joget Di Odin's Vault",
                    status: "admin",
                    image: 'https://vignette.wikia.nocookie.net/marvelmovies/images/b/b9/Odin%27s_Vault.png/revision/latest/scale-to-width-down/640?cb=20140216062716',
                },
                {
                    id:"3",
                    status: "admin",
                    title: "Joget Joget Di Hall of Asgard",
                    image: 'https://vignette.wikia.nocookie.net/marvelmovies/images/d/de/HallOfAsgard1-Thor.png/revision/latest/scale-to-width-down/640?cb=20140311045004',
                }]
        }
    }
    async componentDidMount () {
        // const token = await AsyncStorage.getItem('token')
        // console.log('ini token', token)
        // this.props.fetchingDataUser()
    }
    async triggerButton () {
        // const token = await AsyncStorage.getItem('token')
        // const userId = await AsyncStorage.getItem('userId')
        // console.log('ini token', token)
        // console.log('ini userId', userId)
    }
    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem style={{justifyContent:'center'}}>
                            <Text style={{textAlign:'center', fontSize:25, fontWeight:'500'}}> Hello, User's Name </Text>
                        </CardItem>
                        <CardItem style={{justifyContent:'center'}}>
                            <Text style={{textAlign:'center', fontSize:20}}> What would you like to do today? </Text>
                        </CardItem>
                    </Card> 
                    <FlatList
                        data={this.state.anotherFake}
                        renderItem={({ item, index }) => {
                            return (
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Text style={{fontWeight:"600"}}>{item.title}</Text>
                                    </Left>
                                    <Right>
                                        <Text style={{textAlign:'right',  color: item.status === "admin" ? 'red': 'blue' }}> <Text style={{fontWeight:"500"}}>Status: </Text>{item.status}</Text>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Thumbnail large square source={{uri: item.image}}/>
                                    </Left>
                                    <Right>
                                        <Button small rounded style={{padding:0, backgroundColor:'#009BD2'}}>
                                            <Text style={{color:'white', padding: 0}}> Join </Text>
                                        </Button>
                                    </Right>
                                </CardItem>
                            </Card>
                            )
                        }}
                        keyExtractor={(item) => item.id}
                        />
                    <Right> 
                        <TouchableOpacity
                            style={{
                                flex:1,
                                borderWidth:1,
                                borderColor:'rgba(0,0,0,0.2)',
                                alignItems:'center',
                                justifyContent:'center',
                                width:60,
                                height:60,
                                backgroundColor:'#009BD2',
                                borderRadius:100}}
                            >
                            <Icon style={{ fontSize: 30, color: "white"}} name="add" />
                        </TouchableOpacity>
                    </Right> 
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
      events : state.eventReducers.events
    }
  }
 const mapDispatchToProps = dispatch => {
  return {
      fetchingDataUser: () => dispatch(fetchingDataUser())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyEvents)
