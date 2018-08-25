//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Image, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon,Right, Left, Body, Accordion } from 'native-base';
import {connect} from 'react-redux'
import {fetchingDataUser} from '../actions/eventActions'

// create a component
class MyProfile extends Component {
    constructor(props){
        super(props)
        this.state ={
            fakeData:[{
                id:"1",
                title: "Joget Joget Di Asgard",
                image: 'https://vignette.wikia.nocookie.net/marvelmovies/images/4/4f/AsgardDarkWorld.png/revision/latest/scale-to-width-down/640?cb=20140115064204',
                totalDebt: 1850000,
                moneyOwed: [{
                    itemNo: '1',
                    name: "Robot2 Terbang ",
                    value: 1000000
                },{
                    itemNo: '2',
                    name: "Gelas2 Bir yg d banting2",
                    value: 500000
                },{
                    itemNo: '3',
                    name: "Makanan yg ga stop2",
                    value: 350000
                }]
            },
            {   
                id:"2",
                title: "Joget Joget Di Hall of Asgard",
                image: 'https://vignette.wikia.nocookie.net/marvelmovies/images/d/de/HallOfAsgard1-Thor.png/revision/latest/scale-to-width-down/640?cb=20140311045004',
                totalDebt: 1850000,
                moneyOwed: [{
                    itemNo: '1',
                    name: "Bangkuny Mas Odin",
                    value: 1000000
                },{
                    itemNo: '2',
                    name: "Bangkunya Miss Freyja",
                    value: 500000
                },{
                    itemNo: '3',
                    name: "Bangkunya Mas Thor",
                    value: 350000
                }]
            },
            {   
                id:'3',
                title: "Joget Joget Di Odin's Vault",
                image: 'https://vignette.wikia.nocookie.net/marvelmovies/images/b/b9/Odin%27s_Vault.png/revision/latest/scale-to-width-down/640?cb=20140216062716',
                totalDebt: 4550000,
                moneyOwed: [{
                    itemNo: '1',
                    name: "Tesseract",
                    value: 1000000
                },{
                    itemNo: '2',
                    name: "Infinity Gauntlet",
                    value: 3500000
                },{
                    itemNo: '3',
                    name: "Eternal Flame",
                    value: 500000
                }]
            },
            {   
                id:'4',
                title: "Joget Joget Di BiFrost Bridge",
                image: 'https://vignette.wikia.nocookie.net/marvelmovies/images/1/16/Bifrost.jpg/revision/latest?cb=20110504130352',
                totalDebt: 4500,
                moneyOwed: [{
                    itemNo: '1',
                    name: "Bridge Polish",
                    value: 1000
                },{
                    itemNo: '2',
                    name: "Maintenance",
                    value: 3500
                }]
            },
            {   
                id:'5',
                title: "Joget Joget Di Observatory Heimdall",
                totalDebt: 4500,
                moneyOwed: [{
                    itemNo: '1',
                    name: "Heimdall's Sword polish",
                    value: 1000
                },{
                    itemNo: '2',
                    name: "Heimdall's Armor Polish",
                    value: 3500
                }] 
            }]
        }
    }

    async componentDidMount(){
        // // const token = await AsyncStorage.getItem('token')
        // const userId = await AsyncStorage.getItem('userId')
        // // // console.log("id: ", userId, " token: ", token)
        // console.log("dari mount: ", userId)
        // this.props.fetchingDataUser(userId)
        // console.log("this props did mount")
    }

    renderHeaderDisini(data, expanded) {
        console.log("RENDER HEADER: " , data.title )
        return (
          <View
            style={{ flexDirection: "row", padding: 10, alignItems: "center", backgroundColor: "#009BD2" }}
          > 
            <Left>
                <Text style={{ fontWeight: "600", color:"white"}}>
                {data.title} 
                </Text>
            </Left>
            <Right>
                <Text style={{ fontWeight: "600", color:"red", marginRight: 8}}> - USD {data.totalDebt} </Text>
            </Right>
            {expanded
                ? <Icon style={{ fontSize: 18, color:'white' }} name="remove-circle" />
                : <Icon style={{ fontSize: 18, color:'white' }} name="add-circle" />}
          </View>
        );
      }
      renderContentDisini(data) {

        console.log("RENDER Content: " , data.moneyOwed )
        return (
            <View>
                <Text style={{fontSize: 16, fontWeight:"500"}}> Debt for this event:  </Text>
                {data.moneyOwed.map(owed => (
                    <Text style={{padding: 10, color:"red"}}> <Text style={{fontWeight:"500", color: 'red'}}>{owed.name}</Text> : USD {owed.value} </Text>
                ))} 
          </View>
        );
      }
    render() {
        // console.log(this.props.events)
        // if (this.props.events.length===0) {
        //     return (
        //         <ActivityIndicator style={{justifyContent:'center',flex: 1}} />
        //     )
        // }
        // else {
            return(
            <Container>
                <Content>
                    <Card>
                        <CardItem style={{justifyContent:'center'}}>
                            <Text style={{textAlign:'center', fontSize:25, fontWeight:'500'}}> User's Name </Text>
                        </CardItem>
                        <CardItem style={{justifyContent:'center'}}>
                            <Image  
                            style={{
                                alignSelf: 'center',
                                height: 150,
                                width: 150,
                                borderWidth: 1,
                                borderRadius: 75
                            }}
                            source={{uri: 'https://wiki.gamedetectives.net/images/thumb/d/dd/Sombra_skull.png/400px-Sombra_skull.png'}}
                            resizeMode="cover"
                            />
                        </CardItem>
                        <CardItem style={{justifyContent:'center'}}>
                            <Button small rounded style={{padding:0, backgroundColor:'#009BD2'}}>
                                <Text style={{color:'white', padding: 0}}>Edit Profile</Text>
                            </Button>
                        </CardItem>
                    </Card>
                    <Accordion
                        dataArray={this.state.fakeData}
                        renderHeader={this.renderHeaderDisini}
                        renderContent={this.renderContentDisini}
                    />
                </Content>
          </Container>
        );
    }
    // }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

const mapStateToProps = (state) => {
    return {
      events : state.eventReducers.events
    }
  }
 const mapDispatchToProps = dispatch => {
  return {
      fetchingDataUser: (userId) => dispatch(fetchingDataUser(userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyProfile)
