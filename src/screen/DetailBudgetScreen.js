//import liraries
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base'
// create a component
class DetailBudgetScreen extends Component {
    render() {
        if (this.props) {
            const {navigation} = this.props
            const eventDetail = navigation.getParam('id')
            const imageUrl = eventDetail.imageUrl
            console.log(eventDetail, ' ini event detail')
            return (
                <ScrollView>
                    <Container>
                        <CardItem style={{height:202}} >
                        <Image source={{uri: imageUrl}} style={{height: 200, width: null, flex: 1}} />
                        </CardItem>
                        <Card>
                        <CardItem style={{height:80}} >
                            <Left>
                                <Thumbnail source={{uri: 'http://pm1.narvii.com/6205/f7213a47a1c1a245f57636614c277539a382c08f_00.jpg'}} />
                                <Body>
                                <Text  > {eventDetail.eventName} </Text>
                                <Text note> {eventDetail.location} </Text>
                                </Body>
                            </Left>
                        </CardItem>
                        </Card>
                    </Container>
                </ScrollView>
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
    },
});

//make this component available to the app
export default DetailBudgetScreen;
