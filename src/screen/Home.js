import React, {Component} from 'react'
import { StyleSheet, Image, FlatList, ActivityIndicator} from 'react-native'
import CardEvent from '../components/CardEvent'
import {connect} from 'react-redux'
import {fetchingDataEvent} from '../actions/eventActions'

 class Home extends Component{
   componentDidMount () {
     this.props.fetchingDataEvent()
   }
   
   render() {
    console.log(this.props.events)
    if (this.props.events.length===0) {
      return (
        <ActivityIndicator style={{justifyContent:'center',flex: 1}} />
      )
    }
    else {
      return (
        <FlatList
          data={this.props.events}
          renderItem={({ item, index }) => {
            return (
               <CardEvent navigation={this.props.navigation} key={index} index={index} item={item} />       
            )
           }}
           keyExtractor={(item) => item._id}
        />
           )
    }
   } 
 } 

const mapStateToProps = (state) => {
    return {
      events : state.eventReducers.events
    }
  }
 const mapDispatchToProps = dispatch => {
  return {
      fetchingDataEvent: () => dispatch(fetchingDataEvent())
  }
}

//make this component available to the app
export default connect(mapStateToProps,mapDispatchToProps)(Home)
