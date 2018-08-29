import store from "../store/store";
import axios from "axios";
export function fetchingDataEvent() {
  return dispatch => {
    axios.get("https://eva-server.ariefardi.xyz/events").then(({ data }) => {
      console.log(data);
      let result = data.events;
      return dispatch(setEventsState(result));
    });
  };
}

export function setEventsState(payload) {
  return {
    type: "SET_STATE_EVENT",
    payload: payload
  };
}
export function saveToken(obj) {
  return dispatch => {
    return dispatch(setTokenToState(obj));
  };
}

export function setTokenToState(payload) {
  return {
    type: "SET_STATE_TOKEN",
    payload: payload
  };
}

export function fetchingDataUser(id) {
  return dispatch => {
    axios
      .get("https://eva-server.ariefardi.xyz/users/" + id)
      .then(({ data }) => {
        return dispatch(setUserToState(data.user));
      });
  };
}

export function setUserToState(payload) {
  return {
    type: "SET_STATE_USER",
    payload
  };
}

export function addEvent(obj) {
  return dispatch => {
    console.log("ini add event", obj);
    dispatch();
  };
}

export function addToEventsState(payload) {
  return {
    type: "ADD_EVENT_TO_STATE",
    payload
  };
}

export function getEventById(id) {
  return dispatch => {
    console.log("from action", id);
    let url = "https://eva-server.ariefardi.xyz/events/" + id;
    axios.get(url).then(({ data }) => {
      console.log(data, " data axios");
      return dispatch(setEventByIdToState(data.event));
    });
  };
}
export function setEventByIdToState(payload) {
  console.log(" ini masuk gak dari siin", payload);
  return {
    type: "SET_EVENT_BY_ID",
    payload
  };
}

export function AddItemToEvent(obj) {
  let temp = {
    itemName: obj.itemName,
    itemPrice: obj.itemPrice,
    quantity: obj.quantity,
    imageItem: obj.avatarSource
  };
  console.log("ini temp", temp);
  return dispatch => {
    axios
      .post(`https://eva-server.ariefardi.xyz/events/${obj.eventId}/item`, temp)
      .then(({ data }) => {
        console.log(data, " data axios post item");

        return dispatch(setNewItemToStateEvent(data.getEvent));
      });
  };
}

export function setNewItemToStateEvent(payload) {
  return {
    type: "ADD_NEW_ITEM_TO_STATE",
    payload
  };
}
