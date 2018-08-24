import store from '../store/store'
import axios from 'axios'
export function fetchingDataEvent () {
    return(dispatch)=> {
        axios.get('https://eva-server.ariefardi.xyz/events')
        .then(({data})=> {
            console.log(data)
            let result = data.events
            return dispatch(setEventsState(result))
        })
    } 
}

export function setEventsState (payload) {
    return {
        type: 'SET_STATE_EVENT',
        payload: payload
    }
}
export function saveToken (obj) {
    return (dispatch)=> {
        return dispatch(setTokenToState(obj))
    }
}

export function setTokenToState (payload) {
    return {
        type: 'SET_STATE_TOKEN',
        payload: payload
    }
}

export function fetchingDataUser (token) {
    return (dispatch) => {
        let id = store.getState().eventReducers.userId
        axios.get('https://eva-server.ariefardi.xyz/users/'+id)
        .then(({data})=> {
            console.log(data.user, ' ini data user')
            return dispatch(setUserToState(data.user))
        })
    }
}

export function setUserToState (payload) {
    return {
        type: 'SET_STATE_USER',
        payload
    }
}