import * as types from "../types";

export const state_rd = (payload) => ({
  type: types.STATE_RD,
  payload,
});
export const set_loading_rd = (payload) => ({
  type: types.SET_LOADING_RD,
  payload,
});
export const loading_done_rd = (payload) => ({
  type: types.LOADING_DONE_RD,
  payload,
});
export const set_tmp_rd = (payload) => ({
  type: types.SET_TMP_RD,
  payload,
});
export const remove_tmp_rd = (payload) => ({
  type: types.REMOVE_TMP_RD,
  payload,
});
