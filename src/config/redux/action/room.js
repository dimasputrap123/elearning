import * as types from "../types";
export const join_lc = (payload) => ({ type: types.JOIN_LC, payload });
export const room_rd = (payload) => ({ type: types.ROOM_RD, payload });
export const room_p_rd = (payload) => ({ type: types.ROOM_P_RD, payload });
export const pub_connection_lc = (payload) => ({
  type: types.PUB_CONNECTIONS_LC,
  payload,
});
export const add_message_rd = (payload) => ({
  type: types.ADD_MESSAGE_RD,
  payload,
});
export const send_message_lc = (payload) => ({
  type: types.SEND_MESSAGE_LC,
  payload,
});
export const end_call_lc = (payload) => ({ type: types.END_CALL_LC, payload });
export const end_call_rd = () => ({ type: types.END_CALL_RD });
