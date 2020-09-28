import { OTPublisher } from "opentok";
import React from "react";
import { connect } from "react-redux";

const Participant = (props) => {
  const onError = (event) => {
    console.log(event);
  };
  return (
    props.session !== null && (
      <OTPublisher
        properties={{
          width: "0",
          height: "0",
          style: { buttonDisplayMode: "off" },
          publishVideo: false,
          publishAudio: false,
        }}
        session={props.session}
        style={{ width: 0, height: 0 }}
        onError={onError}
      />
    )
  );
};

const mapState = (state) => ({
  session: state.roomReducer.session,
});

export default connect(mapState)(Participant);
