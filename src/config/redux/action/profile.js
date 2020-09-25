import * as types from "../types";

export const get_profile_lc = (payload) => ({
  type: types.GET_PROFILE_LC,
  payload,
});
export const profile_rd = (payload) => ({ type: types.PROFILE_RD, payload });
