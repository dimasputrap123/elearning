import * as types from "../redux/types";
import { createLogic } from "redux-logic";
import { batchActions } from "redux-batched-actions";
import { end_call_rd } from "config/redux/action/room";
import url from "../api/url";
import { requestPost } from "config/api/request";
import { room_p_rd } from "../redux/action/room";

export const joinRoom = createLogic({
  type: types.JOIN_LC,
  latest: true,
  validate({ action }, allow, reject) {
    const { opentok_room_id, password, name, role } = action.payload;
    if (
      opentok_room_id === "" ||
      password === "" ||
      name === "" ||
      role === ""
    ) {
      reject(action);
    } else {
      allow(action);
    }
  },
  process({ action }, dispatch, done) {
    const key = "join_lc";
    requestPost(url.join, action.payload, key, true)
      .then(({ response, actions }) => {
        // console.log(response);
        dispatch(
          batchActions([
            ...actions,
            room_p_rd({
              sessionId: response.data.webinar.opentok_session_id,
              token: response.data.token,
              name: action.payload.name,
              role: action.payload.role,
              title: response.data.webinar.title,
            }),
          ])
        );
      })
      .catch(({ response, actions }) => {
        dispatch(batchActions(actions));
        console.log(response);
      })
      .then(done);
  },
});

export const endCall = createLogic({
  type: types.END_CALL_LC,
  latest: true,
  process({ action }, dispatch, done) {
    if (action.payload !== null) {
      action.payload.session.disconnect();
    }
    dispatch(end_call_rd());
    action.payload.push();
    done();
  },
});
