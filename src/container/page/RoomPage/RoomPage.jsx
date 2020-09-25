// import NoVideo from "components/atoms/NoVideo/NoVideo";
import DialogSelectDevice from "components/organism/dialog/DialogSelectDevice";
import DialogSendMessage from "components/organism/dialog/DialogSendMessage";
import ListParticipant from "components/organism/ListParticipant";
import ListQuestion from "components/organism/ListQuestion";
import ListSpeaker from "components/organism/ListSpeaker";
// import ListSubs from "components/organism/ListSubs";
// import Publisher from "components/organism/Publisher";
import ExtraControl from "components/organism/roomControl/ExtraControl";
import MainControl from "components/organism/roomControl/MainControl";
import Speaker from "components/organism/Speaker";
import { ControlContext } from "container/template/ControlContext/ControlContext";
import { createSession } from "opentok";
import React, { Component } from "react";
import { connect } from "react-redux";
import { room_rd, add_message_rd } from "../../../config/redux/action/room";

class RoomPage extends Component {
  componentDidMount() {
    const {
      sessionId,
      token,
      apiKey,
      // role,
      room_rd,
      add_message_rd,
    } = this.props;
    this.session = createSession({
      apiKey,
      sessionId,
      token,
      onStreamsUpdated: (streams) => {
        console.log(streams);
        // if (role !== "participant") {
        //   this.props.room_rd({ subs: [...streams] });
        // } else {
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
        room_rd({
          subs: [...subs],
          speakerStream: [...speakerStream],
          moderatorStream: [...moderatorStream],
        });
        // }
      },
      onConnect: () => {
        room_rd({ connectionStatus: true });
      },
      onSignalUpdated: (event) => {
        console.log(event);
        const { from } = event;
        const data = JSON.parse(event.data);
        const message = {
          name: data.name,
          message: data.message,
          from,
        };
        add_message_rd(message);
      },
      onError: (err) => {
        console.log(err);
      },
    });
    room_rd({ session: this.session.session });
  }
  render() {
    return (
      <ControlContext>
        <div data-test="room-container" className="d-flex">
          {/* <ListSubs /> */}
          <ListParticipant />
          <div className="position-relative w-100">
            <ListSpeaker />
            {this.props.role !== "participant" && <ExtraControl />}
            <div style={{ height: "100vh" }}>
              {/* <NoVideo iconClassName="fs-200" /> */}
              {/* {this.props.role !== "participant" ? <Publisher /> : <Speaker />} */}
              <Speaker />
            </div>
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
