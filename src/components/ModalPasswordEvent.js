//import liraries
import React, { Component } from 'react';
import {Modal, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Button, Icon, Item, Input, Body, Left, Right, Text} from 'native-base';
// create a component
class ModalPasswordEvent extends Component {
    state = {
        modalVisible: false,
      };
    
    setModalVisible(visible) {
    this.setState({modalVisible: visible});
    }
    goToDetail() {
        // console.log(this.props.navigation.navigate())
        this.setState({
            modalVisible: false
        })
        this.props.navigation.navigate('DetailBudget')
    }
    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    this.setModalVisible(!this.state.modalVisible)
                }}>
                <View style={{marginTop: 200}}>
                <Item  > 
                    <Input color={'grey'} placeholder="Input password" />
                </Item>
                    <Button color={'white'} style={{width:70, marginTop:10, marginLeft:'70%'}} onPress={() => {
                        this.goToDetail()
                    }} >
                    <Text 
                    style={{alignContent:'center', 
                    alignItems:'center',
                    padding:20}} > 
                    Join 
                    </Text>
                    </Button>
                </View>
                </Modal>
                <Button
                    onPress={() => {
                    this.setModalVisible(true);
                    }}
                    transparent textStyle={{color: '#87838B'}}>
                    <Icon style={{marginLeft:5,marginRight:5}} name="md-open" />
                    <Text style={{color:'#87838B'}} >Join as commite</Text>
                </Button>
            </View>
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
    },
});

//make this component available to the app
export default ModalPasswordEvent;
