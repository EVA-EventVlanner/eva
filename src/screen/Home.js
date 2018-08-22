import React, {Component} from 'react'
import { StyleSheet, Image, FlatList} from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

 class Home extends Component{
   constructor(props){
      super(props)
      this.state={
         fakeData: [{
            id: 1,
            data: 'a'
         },
         {
            id: 2,
            data: 'b'
         },
         {
            id: 3,
            data: 'c'
         },
         {
            id: 4,
            data: 'd'
         },
         {
            id: 5,
            data: 'e'
         },
         {
            id: 6,
            data: 'f'
         },
         {
            id: 7,
            data: 'g'
         }]
      }
   }

   render() {
    return (
        <FlatList
          data={this.state.fakeData}
          renderItem={({ item, index }) => {
            return (
               <Card style={{flex: 0}}>
                  <CardItem>
                  <Left>
                     <Thumbnail source={{uri: 'Image URL'}} />
                     <Body>
                        <Text>NativeBase</Text>
                        <Text note>April 15, 2016</Text>
                     </Body>
                  </Left>
                  </CardItem>
                  <CardItem>
                  <Body>
                     <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
                     <Text>
                        {item.data}
                     </Text>
                  </Body>
                  </CardItem>
                  <CardItem>
                  <Left>
                     <Button transparent textStyle={{color: '#87838B'}}>
                        <Icon name="logo-github" />
                        <Text>1,926 stars</Text>
                     </Button>
                  </Left>
                  </CardItem>
               </Card>
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