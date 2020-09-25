import * as types from "../types";

const initiate = {
  login_status: false,
  key: "",
};

const authReducer = (state = initiate, action) => {
  switch (action.type) {
    case types.AUTH_RD:
      return { ...state, ...action.payload };
    case types.LOGOUT_RD:
      return { ...state, ...initiate };
    default:
      return state;
  }
};

export default authReducer;
