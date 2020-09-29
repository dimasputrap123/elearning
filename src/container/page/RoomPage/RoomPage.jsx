import DialogSelectDevice from "components/organism/dialog/DialogSelectDevice";
import DialogSendMessage from "components/organism/dialog/DialogSendMessage";
import ListParticipant from "components/organism/ListParticipant";
import ListQuestion from "components/organism/ListQuestion";
import ListSpeaker from "components/organism/ListSpeaker";
import Participant from "components/organism/Participant";
import ExtraControl from "components/organism/roomControl/ExtraControl";
import MainControl from "components/organism/roomControl/MainControl";
import ShowQuestion from "components/organism/ShowQuestion";
import Speaker from "components/organism/Speaker";
import { ControlContext } from "container/template/ControlContext/ControlContext";
import { createSession } from "opentok";
import React, { Component } from "react";
import { connect } from "react-redux";
import { room_rd, add_message_rd } from "../../../config/redux/action/room";

class RoomPage extends Component {
  signalHandler = (event) => {
    const { add_message_rd, room_rd } = this.props;
    console.log(event);
    const { from, type } = event;
    const data = JSON.parse(event.data);
    const message = {
      name: data.name,
      message: data.message,
      from,
    };
    if (type === "signal:message") {
      add_message_rd(message);
    } else if (type === "signal:showMessage") {
      room_rd({ messageData: { ...data } });
    }
  };

  streamsHandler = (streams) => {
    const speakerStream = streams.filter((e) => {
      const data = JSON.parse(e.connection.data);
      if (data.role === "speaker") {
        return true;
      } else {
        return false;
      }
    });
    const moderatorStream = streams.filter((e) => {
      const data = JSON.parse(e.connection.data);
      if (data.role === "moderator") {
        return true;
      } else {
        return false;
      }
    });
    const subs = streams.filter((e) => {
      const data = JSON.parse(e.connection.data);
      if (data.role === "participant") {
        return true;
      } else {
        return false;
      }
    });
    this.props.room_rd({
      subs: [...subs],
      speakerStream: [...speakerStream],
      moderatorStream: [...moderatorStream],
    });
  };

  componentDidMount() {
    // window.addEventListener("beforeunload", this.handleUnload);
    const { sessionId, token, apiKey, room_rd } = this.props;
    this.session = createSession({
      apiKey,
      sessionId,
      token,
      onStreamsUpdated: this.streamsHandler,
      onConnect: () => {
        room_rd({ connectionStatus: true });
      },
      onSignalUpdated: this.signalHandler,
      onError: (err) => {
        console.log(err);
      },
    });
    room_rd({ session: this.session.session });
  }

  // componentWillUnmount() {
  //   window.removeEventListener("beforeunload", this.handleUnload);
  // }

  // handleUnload = () => {
  //   this.session.session.signal({
  //     data: JSON.stringify({
  //       name: "tes",
  //       message: "leave",
  //     }),
  //     type: "leave",
  //   });
  // };

  render() {
    return (
      <ControlContext>
        <div data-test="room-container" className="d-flex">
          <ListParticipant />
          <div className="position-relative w-100">
            <ListSpeaker />
            {this.props.role !== "participant" && <ExtraControl />}
            <div style={{ height: "100vh" }}>
              <Speaker />
              {this.props.role === "participant" && <Participant />}
            </div>
            <ShowQuestion />
            <MainControl />
          </div>
          {this.props.role !== "participant" && <ListQuestion />}
        </div>
        {this.props.role === "participant" ? (
          <DialogSendMessage />
        ) : (
          <DialogSelectDevice />
        )}
      </ControlContext>
    );
  }
}

const mapState = (state) => ({
  role: state.roomPersistReducer.role,
  sessionId: state.roomPersistReducer.sessionId,
  token: state.roomPersistReducer.token,
  apiKey: state.roomPersistReducer.apiKey,
});

export default connect(mapState, { room_rd, add_message_rd })(RoomPage);
