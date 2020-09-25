import * as types from "../types";

const initiate = {
  sessionId: "",
  token: "",
  apiKey: "46902654",
  name: "",
  role: "moderator",
  videoSelected: null,
  audioSelected: null,
  messages: [],
  title: "Sample Web RTC",
};

const roomPersistReducer = (state = initiate, action) => {
  switch (action.type) {
    case types.ROOM_P_RD:
      return { ...state, ...action.payload };
    case types.ADD_MESSAGE_RD:
      return { ...state, messages: [...state.messages, action.payload] };
    case types.END_CALL_RD:
      return {
        ...state,
        sessionId: "",
        token: "",
        apiKey: "46902654",
        name: "",
        role: "moderator",
        videoSelected: null,
        audioSelected: null,
        messages: [],
        title: "Sample Web RTC",
      };
    default:
      return state;
  }
};

export default roomPersistReducer;
