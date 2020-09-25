import NoVideo from "components/atoms/NoVideo/NoVideo";
import { ContextType } from "container/template/ControlContext/ControlContext";
import { OTPublisher } from "opentok";
import React, { Component } from "react";
import "./Publisher.scss";
import { connect } from "react-redux";

class Publisher extends Component {
  constructor(props) {
    super(props);
    this.eventHandlers = {
      streamDestroyed: (event) => {
        if (event.reason === "mediaStopped") {
          this.context.handleClick("screenShare");
        }
      },
    };
  }

  static contextType = ContextType;
  
  onError = (event) => {
    if (event.code === 1500) {
      this.context.handleClick("screenShare");
    }
  };
  render() {
    const { videoSelected, audioSelected, connectionStatus } = this.props;
    return connectionStatus ? (
      <OTPublisher
        properties={{
          width: "100%",
          height: "100%",

          style: { buttonDisplayMode: "off" },
          resolution: "1280x720",
          publishVideo: this.context.publishVideo,
          publishAudio: this.context.publishAudio,
          videoSource: this.context.screenShare
            ? "screen"
            : videoSelected === null
            ? undefined
            : videoSelected,
          audioSource: audioSelected === null ? undefined : audioSelected,
        }}
        session={this.props.session}
        className="pub-wrapper"
        onError={this.onError}
        eventHandlers={this.eventHandlers}
      />
    ) : (
      <NoVideo
        iconClassName={this.props.role === "participant" ? "" : "fs-200"}
        connected={connectionStatus}
      />
    );
  }
}

const mapState = (state) => ({
  videoSelected: state.roomPersistReducer.videoSelected,
  audioSelected: state.roomPersistReducer.audioSelected,
  role: state.roomPersistReducer.role,
  session: state.roomReducer.session,
  connectionStatus:state.roomReducer.connectionStatus
});

export default connect(mapState)(Publisher);
