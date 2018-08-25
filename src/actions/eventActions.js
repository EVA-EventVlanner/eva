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
<<<<<<< HEAD
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
=======
export function saveToken (obj) {
    return (dispatch)=> {
        console.log("from saveToken:", obj)
        return dispatch(setTokenToState(obj))
    }
>>>>>>> c94e42a82635c6f8d8f0720c0d1d393cb0038f42
}

export function fetchingDataUser(token) {
  return dispatch => {
    let id = store.getState().eventReducers.userId;
    axios
      .get("https://eva-server.ariefardi.xyz/users/" + id)
      .then(({ data }) => {
        console.log(data.user, " ini data user");
        return dispatch(setUserToState(data.user));
      });
  };
}

<<<<<<< HEAD
export function setUserToState(payload) {
  return {
    type: "SET_STATE_USER",
    payload
  };
=======
export function fetchingDataUser (userId) {
    let id = store.getState().eventReducers.userId
    console.log("ini dri fetching id: ", id)
    return (dispatch) => {
        axios.get('https://eva-server.ariefardi.xyz/users/'+userId)
        .then(({data})=> {
            console.log(data.user, ' ini data user')
            return dispatch(setUserToState(data.user))
        })
    }
>>>>>>> c94e42a82635c6f8d8f0720c0d1d393cb0038f42
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
