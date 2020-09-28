import NoVideo from "components/atoms/NoVideo/NoVideo";
import { OTSubscriber } from "opentok";
import React from "react";
import { connect } from "react-redux";
import Publisher from "../Publisher";

const Speaker = ({ session, moderatorStream, role }) => {
  console.log(moderatorStream);
  if (role === "moderator") {
    return <Publisher />;
  } else {
    return moderatorStream.length === 0 ? (
      <NoVideo iconClassName="fs-200" />
    ) : (
      session !== null &&
        moderatorStream.map((el) => (
          <OTSubscriber
            key={el.id}
            properties={{
              subscribeToAudio: true,
              subscribeToVideo: true,
              width: "100%",
              height: "100%",
            }}
            session={session}
            stream={el}
            retry={true}
            maxRetryAttempts={3}
            retryAttemptTimeout={2000}
            className="w-100 h-100"
          />
        ))
    );
  }
};

const mapState = (state) => ({
  moderatorStream: state.roomReducer.moderatorStream,
  session: state.roomReducer.session,
  role: state.roomPersistReducer.role,
});

export default connect(mapState)(Speaker);
