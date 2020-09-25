import * as types from "../types";

const initiate = {
  loading_stack: [],
  tmp_result: [],
};

const stateReducer = (state = initiate, action) => {
  switch (action.type) {
    case types.STATE_RD: {
      return { ...state, ...action.payload };
    }
    case types.SET_LOADING_RD: {
      return {
        ...state,
        loading_stack: [...state.loading_stack, action.payload],
      };
    }
    case types.LOADING_DONE_RD: {
      return {
        ...state,
        loading_stack: state.loading_stack.filter((e) => e !== action.payload),
      };
    }
    case types.SET_TMP_RD: {
      return {
        ...state,
        tmp_result: [...state.tmp_result, action.payload],
      };
    }
    case types.REMOVE_TMP_RD: {
      return {
        ...state,
        tmp_result: state.tmp_result.filter((e) => e.key !== action.payload),
      };
    }
    case types.LOGOUT_RD: {
      return { ...state, ...initiate };
    }
    default:
      return state;
  }
};

export default stateReducer;
