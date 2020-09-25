import SubsFrame from "components/molecules/SubsFrame";
import { OTSubscriber } from "opentok";
import React from "react";
import { connect } from "react-redux";
import Publisher from "../Publisher";
import "./ListSpeaker.scss";
const ListSpeaker = ({ speakerStream, session, role }) => {
  return (
    <div className="list-speaker-wrapper">
      {role === "speaker" && (
        <SubsFrame>
          <Publisher />
        </SubsFrame>
      )}
      {session !== null &&
        speakerStream !== null &&
        speakerStream.map((el) => (
          <SubsFrame key={el.id}>
            <OTSubscriber
              properties={{
                subscribeToAudio: true,
                subscribeToVideo: true,
                width: "100%",
                height: "100%",
                style: { buttonDisplayMode: "off" },
              }}
              session={session}
              stream={el}
              retry={true}
              maxRetryAttempts={3}
              retryAttemptTimeout={2000}
              className="w-100 h-100"
            />
          </SubsFrame>
        ))}
    </div>
  );
};

const mapState = (state) => ({
  speakerStream: state.roomReducer.speakerStream,
  session: state.roomReducer.session,
  role: state.roomPersistReducer.role,
});

export default connect(mapState)(ListSpeaker);
