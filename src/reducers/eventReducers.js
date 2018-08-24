const initialState = {
    events: [],
    token: '',
    userId: '',
    user: []
}

const eventReducer = (state = initialState, action) => {
    if (action.type==='SET_STATE_EVENT') {
        return {
            ...state,
            events: action.payload
        }
    }
    if (action.type==="SET_STATE_TOKEN") {
        return {
            ...state,
            token: action.payload.token,
            userId: action.payload.userId
        }
    }
    if (action.type==="SET_STATE_USER") {
        console.log(action.payload, ' ini action. payload')
        return {
            ...state,
            user: action.payload
        }
    }
    return state
}

export default eventReducer