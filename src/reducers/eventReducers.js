const initialState = {

}

const eventReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TEST':
            return state
        default:
            return state
    }
}

export default eventReducer