import SubsFrame from "components/molecules/SubsFrame";
import { OTSubscriber } from "opentok";
import React from "react";
import { connect } from "react-redux";
// import Publisher from "../Publisher";
import "./ListSpeaker.scss";
import { room_rd } from "../../../config/redux/action/room";
import SelfVideo from "../SelfVideo";
const ListSpeaker = ({
  speakerStream,
  session,
  role,
  room_rd,
  moderatorStream,
}) => {
  const [active, setActive] = React.useState(null);
  const handleActive = (e) => {
    setActive(e);
    room_rd({ focusStream: e });
  };
  return (
    <div className="list-speaker-wrapper">
      {role !== "participant" && (
        <SubsFrame
          active={active === "self"}
          onClick={() => handleActive("self")}
        >
          <SelfVideo fitMode="cover" className="w-100 h-100" />
        </SubsFrame>
      )}
      {session !== null &&
        moderatorStream.map((el) => (
          <SubsFrame
            key={el.id}
            active={active === el.connection.id}
            onClick={() => handleActive(el.connection.id)}
          >
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
      {session !== null &&
        speakerStream.length > 0 &&
        speakerStream.map((el) => (
          <SubsFrame
            key={el.id}
            active={active === el.connection.id}
            onClick={() => handleActive(el.connection.id)}
          >
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
  moderatorStream: state.roomReducer.moderatorStream,
  session: state.roomReducer.session,
  role: state.roomPersistReducer.role,
});

export default connect(mapState, { room_rd })(ListSpeaker);
