import * as types from "../types";

const initiate = {
  speakerStream: [],
  moderatorStream: [],
  session: null,
  subs: [],
  connectionStatus: false,
  messageData: {
    name: "",
    message: "",
  },
};

const roomReducer = (state = initiate, action) => {
  switch (action.type) {
    case types.ROOM_RD:
      return { ...state, ...action.payload };
    case types.END_CALL_RD:
      return { ...state, ...initiate };
    default:
      return state;
  }
};

export default roomReducer;
