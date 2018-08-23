const initialState = {
    events: []
}

const eventReducer = (state = initialState, action) => {
    if (action.type==='SET_STATE_EVENT') {
        return {
            ...state,
            events: action.payload
        }
    }
    return state
}

export default eventReducer