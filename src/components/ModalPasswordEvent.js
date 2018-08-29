//import liraries
import React, { Component } from "react";
import { Modal, TouchableOpacity, View, StyleSheet } from "react-native";
import { Button, Icon, Item, Input, Body, Left, Right, Text, Card, CardItem, Label} from "native-base";
import axios from "axios";

import store from '../store/store'

// create a component
class ModalPasswordEvent extends Component {
	state = {
		modalVisible: false,
		password: null
	}

	componentDidMount() {
		console.log('user id di modal password : ', this.props.userId)
	}

	async checkMemberStatus(){
		let userId = store.getState().eventReducers.userId
		let eventId = this.props.eventId
		let event = this.props.event

		const {data} = await axios.post(`https://eva-server.ariefardi.xyz/events/${eventId}/nopassword/${userId}`)
		console.log("ini hasil dari userId check member status: ", data);

		if(data.NeedPassword === true){
			alert(data.message)
		}
		else{
			alert("Welcome Back!")
			
			this.props.navigation.navigate("DetailBudget", {
				id: event
			})

			this.setState({
				modalVisible: false
			})
		}
	}

	setModalVisible(visible) {
		this.setState({ modalVisible: visible })
	}

	onchangePassword(text) {
		this.setState({
			password: text
		})
	}

	goToDetail() {
		let userId = store.getState().eventReducers.userId

		console.log('ini user id dari state : ', userId)

		if (!this.state.password) {
			alert("Password can't be null")
		} else {
			let password = this.state.password
			let eventId = this.props.eventId
			let event = this.props.event
			console.log(password, "ini loh")
		
			axios.post(`https://eva-server.ariefardi.xyz/events/${eventId}/login/${userId}`, {
				password
			})
			.then(({ data }) => {
				if (data.message === "Password is wrong") {
					alert(data.message)
				} else {
					alert("Berhasil Login")

					this.setState({
						modalVisible: false
					})
					
					this.props.navigation.navigate("DetailBudget", {
						id: event
					})
				}
			})
			.catch(err => {
				alert("Terjadi error tidak terduga");
			})
		}
	}

	render() {
		return (
			<View style={{ marginTop: 22 }}>
				<Modal
				animationType="slide"
				transparent={false}
				visible={this.state.modalVisible}
				onRequestClose={() => {
					this.setModalVisible(!this.state.modalVisible);
				}}
				>
				<View style={{ marginTop: 200 }}>
					<Card>
						<CardItem>
							<Item>
								<Label>Input password</Label>
								<Input
									color={"grey"}
									onChangeText={text => this.onchangePassword(text)}
								/>
							</Item>
						</CardItem>
						<CardItem>
							<Left>
								<TouchableOpacity onPress={()=>{this.checkMemberStatus()}} >
									<Text style={{color:"#009BD2"}}>I'm already a member</Text>
								</TouchableOpacity>
							</Left>
							<Right>
								<Button
								color={"white"}
								style={{ width: 70, marginTop: 10, marginLeft: "70%" }}
								onPress={() => {
									this.goToDetail();
								}}
								>
									<Text
										style={{
										alignContent: "center",
										alignItems: "center",
										padding: 20
										}}
									>
										Join
									</Text>
								</Button>
							</Right>
						</CardItem>
					</Card>
				</View>
				</Modal>
				<Button
				onPress={() => {
					this.setModalVisible(true);
				}}
				transparent
				textStyle={{ color: "#87838B" }}
				>
				<Icon style={{ marginLeft: 5, marginRight: 5 }} name="md-open" />
				<Text style={{ color: "#87838B" }}>Join as commitee</Text>
				</Button>
			</View>
		);
	}
}

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#2c3e50"
	}
});

//make this component available to the app
export default ModalPasswordEvent;
