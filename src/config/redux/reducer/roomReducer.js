import * as types from "../types";
/**
 * publisher connection= (speaker+moderator) connection
 * subs=participant connection / stream (kalo participant bisa publish video)
 */
const initiate = {
  speakerStream: [],
  moderatorStream: [],
  publisherConnections:[],
  session: null,
  subs: [],
  connectionStatus: false,
  focusStream: "self",
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
