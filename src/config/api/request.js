import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "./url";
import { store } from "../redux/store";
import {
  set_tmp_rd,
  set_loading_rd,
  loading_done_rd,
} from "../redux/action/state";
import { batchActions } from "redux-batched-actions";
function status(status) {
  return true;
}

/**
 *
 * @param {string} url => url api
 * @param {object} data => data yg dikirim ke api
 * @param {string} key => key untuk loading dan tmp_result
 * @param {boolean} set_tmp => kondisi langsung ke set_tmp
 */

export const requestGet = async (
  url,
  data,
  key = "default",
  set_tmp = false
) => {
  const timeout = 15000;
  if (data) {
    url += "?";
    Object.keys(data).forEach((el, i) => {
      if (Array.isArray(data[el])) {
        data[el].forEach((el2, i2) => {
          url += el + "=" + el2;
          if (i2 + 1 !== data[el].length) {
            url += "&";
          }
        });
      } else {
        url += el + "=" + data[el];
      }
      if (Object.keys(data).length !== i + 1) {
        url += "&";
      }
    });
  }
  const token = Cookies.get(store.getState().authReducer.key);
  console.log("call: ", baseUrl + url);
  let actions = [];
  store.dispatch(set_loading_rd(key));
  try {
    const response = await axios({
      url,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout,
      baseURL: baseUrl,
      validateStatus: status,
    });
    actions.push(loading_done_rd(key));
    return checkServerStatus(response, key, actions, set_tmp);
  } catch (err) {
    checkConnectionStatus(err, key, timeout);
  }
};

/**
 *
 * @param {string} url => url api
 * @param {object} data => data yg dikirim ke api
 * @param {string} key => key untuk loading dan tmp_result
 * @param {boolean} set_tmp => set result api langsung ke tmp_result
 */

export const requestPost = async (
  url,
  data,
  key = "default",
  set_tmp = false
) => {
  let timeout = 30000;
  let formData = new FormData();
  if (data !== null) {
    Object.keys(data).forEach((el) => {
      if (Array.isArray(data[el])) {
        data[el].forEach((el2) => {
          formData.append(el, el2);
        });
      } else {
        formData.append(el, data[el]);
      }
    });
  } else {
    const err = { message: "require data to post" };
    throw err.message;
  }
  const token = Cookies.get(store.getState().authReducer.key);
  console.log("call: ", baseUrl + url);
  let actions = [];
  store.dispatch(set_loading_rd(key));
  try {
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      validateStatus: status,
      baseURL: baseUrl,
      timeout,
    });
    actions.push(loading_done_rd(key));
    return checkServerStatus(response, key, actions, set_tmp);
  } catch (err_1) {
    checkConnectionStatus(err_1, key, timeout);
  }
};

/**
 * fungsi check status:
 * @param (object) response
 * @param (string ) key
 * @param (boolean) set_tmp
 * @return (object)
 */

const checkServerStatus = (response, key, actions, set_tmp) => {
  if (response.status === 500) {
    console.log("server error");
    actions.push(
      set_tmp_rd({
        status: false,
        key: "server_error",
        msg: "Server Error",
        data: null,
      })
    );
    store.dispatch(batchActions(actions));
  } else {
    return checkAuthStatus(response.data, key, actions, set_tmp);
  }
};

const checkAuthStatus = (data, key, actions, set_tmp) => {
  if (data.status === 401) {
    actions.push(
      set_tmp_rd({
        status: false,
        key: "session_timeout",
        msg: "Session timeout",
        data: null,
      })
    );
    store.dispatch(batchActions(actions));
  } else if (data.status) {
    if (set_tmp) {
      actions.push(set_tmp_rd({ status: true, key, msg: data.messages, data }));
    }
    console.log("response: ", data);
    const rst = { response: data, actions };
    return rst;
  } else {
    console.log("response err: ", data);
    actions.push(set_tmp_rd({ status: false, key, msg: data.messages, data }));
    const rst = { response: data, actions };
    throw rst;
  }
};

const checkConnectionStatus = (err, key, timeout) => {
  let error = JSON.parse(JSON.stringify(err));
  if (error.hasOwnProperty("stack")) {
    const { message } = error;
    let actions = [loading_done_rd(key)];
    if (
      message === `timeout of ${timeout}ms exceeded` ||
      message === "Network Error"
    ) {
      actions.push(
        set_tmp_rd({
          status: false,
          key: "network_error",
          msg: message,
          data: error,
        })
      );
    }
    const rst = { response: "network error", actions };
    throw rst;
  } else {
    err.actions.push(loading_done_rd(key));
    throw err;
  }
};
