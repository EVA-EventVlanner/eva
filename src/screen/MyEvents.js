//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Button } from 'react-native';

// create a component
class MyEvents extends Component {
    async componentDidMount () {
        const token = await AsyncStorage.getItem('token')
        console.log('ini token', token)
        console.log('Component did mount')
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>MyEvents</Text>
                <Button style={{width:100}} title={'triggerToken'} />  
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
export default MyEvents;
