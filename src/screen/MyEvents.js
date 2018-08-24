//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Button } from 'react-native';
import {connect} from 'react-redux'
import {fetchingDataUser} from '../actions/eventActions'
// create a component
class MyEvents extends Component {
    async componentDidMount () {
        const token = await AsyncStorage.getItem('token')
        console.log('ini token', token)
        this.props.fetchingDataUser()
    }
    async triggerButton () {
        const token = await AsyncStorage.getItem('token')
        const userId = await AsyncStorage.getItem('userId')
        console.log('ini token', token)
        console.log('ini userId', userId)
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>MyEvents</Text>
                <Button style={{width:100}} title={'triggerToken'} onPress={this.triggerButton} />  
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
