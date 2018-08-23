import React, {Component} from 'react'
import { StyleSheet, Image, FlatList} from 'react-native'
import CardEvent from '../components/CardEvent'
 class Home extends Component{
   constructor(props){
      super(props)
      this.state={
         fakeData: [
           {
            id: 1,
            data: 'a'
           }
        ]
      }
   }

   render() {
    return (
        <FlatList
          data={this.state.fakeData}
          renderItem={({ item, index }) => {
            return (
               <CardEvent item={item} />       
            )
           }}
           keyExtractor={(item) => item.id}
        />
    )
   } 
 }


const styles = StyleSheet.create({

})


export default (Home);