import * as types from "../redux/types";
import { auth_rd, logout_rd } from "../redux/action/auth";
import { requestPost } from "../api/request";
import { createLogic } from "redux-logic";
import url from "../api/url";
import Cookies from "js-cookie";
// import { room_p_rd } from "../redux/action/room";
import { batchActions } from "redux-batched-actions";
import { v4 } from "uuid";

export const doLogin = createLogic({
  type: types.LOGIN_LC,
  latest: true,
  validate({ action }, allow, reject) {
    const { email, password } = action.payload;
    if (email === "" || password === "") {
      reject(action);
    } else {
      allow(action);
    }
  },
  process({ action }, dispatch, done) {
    const key = "login_lc";
    requestPost(url.login, action.payload, key, true)
      .then(({ response, actions }) => {
        console.log(response);
        const key = v4();
        dispatch(
          batchActions([
            ...actions,
            auth_rd({ login_status: true, key }),
            // room_p_rd({ ...action.payload }),
          ])
        );
        Cookies.set(key, response.data.access_token, { expires: 1 });
      })
      .catch(({ response, actions }) => {
        dispatch(batchActions(actions));
        console.log(response);
      })
      .then(done);
  },
});

export const doLogout = createLogic({
  type: types.LOGOUT_LC,
  latest: true,
  validate({ getState, action }, allow, reject) {
    const { login_status } = getState().authReducer;
    if (login_status) {
      allow(action);
    } else {
      reject(action);
    }
  },
  process({ action, getState }, dispatch, done) {
    const { key } = getState().authReducer.key;
    Cookies.remove(key);
    dispatch(logout_rd());
    done();
  },
});
