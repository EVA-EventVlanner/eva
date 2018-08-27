const initialState = {
  events: [],
  event: "",
  token: "",
  userId: "",
  user: []
};

const eventReducer = (state = initialState, action) => {
  if (action.type === "SET_STATE_EVENT") {
    return {
      ...state,
      events: action.payload
    };
  }
  if (action.type === "SET_STATE_TOKEN") {
    return {
      ...state,
      token: action.payload.token,
      userId: action.payload.userId
    };
  }
  if (action.type === "SET_STATE_USER") {
    console.log(action.payload, " ini action. payload");
    return {
      ...state,
      user: action.payload
    };
  }
  if (action.type === "ADD_NEW_ITEM_TO_STATE") {
    console.log(action.payload, " ini payload dari reducers");
    // console.log(state,event.item)
    // let temp = state.event.items.concat(action.payload);
    // console.log(temp, " ini temp");
    return {
      ...state
    };
  }
  if (action.type === "SET_EVENT_BY_ID") {
    return {
      ...state,
      event: action.payload
    };
  }
  return state;
};

export default eventReducer;
