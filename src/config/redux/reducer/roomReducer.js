import * as types from "../types";

const initiate = {
  speakerStream: null,
  moderatorStream: null,
  session: null,
  subs: [],
  connectionStatus: false,
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
