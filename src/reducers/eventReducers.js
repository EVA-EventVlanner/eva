const initialState = {
    events: [],
    token: '',
    userId: ''
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
    return state
}

export default eventReducer