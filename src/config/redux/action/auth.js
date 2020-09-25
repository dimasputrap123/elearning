/**
 * name action lowercase dari types
 * do_login_lc => DO_LOGIN_LC
 */

import * as types from "../types";

export const login_lc = (payload) => ({ type: types.LOGIN_LC, payload });
export const logout_lc = () => ({ type: types.LOGOUT_LC });
export const logout_rd = () => ({ type: types.LOGOUT_RD });
export const auth_rd = (payload) => ({ type: types.AUTH_RD, payload });
