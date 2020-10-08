import { CircularProgress } from "@material-ui/core";
import NoVideo from "components/atoms/NoVideo/NoVideo";
import { OTSubscriber } from "opentok";
import React from "react";
import { connect } from "react-redux";
import Publisher from "../Publisher";

// const Speaker = ({
//   session,
//   moderatorStream,
//   role,
//   focusStream,
//   speakerStream,
// }) => {
//   return (
//     <>
//       {role !== "participant" && (
//         <div className={focusStream !== "self" ? "d-none" : "h-100"}>
//           <Publisher />
//         </div>
//       )}
//       {role === "participant" &&
//         moderatorStream.length === 0 &&
//         speakerStream.length === 0 && <NoVideo iconClassName="fs-200" />}
//       {session !== null &&
//         moderatorStream.map((el) => (
//           <div
//             className={el.connection.id !== focusStream ? "d-none" : "h-100"}
//             key={el.id}
//           >
//             <OTSubscriber
//               properties={{
//                 subscribeToAudio: false,
//                 subscribeToVideo: true,
//                 width: "100%",
//                 height: "100%",
//                 style: { buttonDisplayMode: "off" },
//               }}
//               session={session}
//               stream={el}
//               retry={true}
//               maxRetryAttempts={3}
//               retryAttemptTimeout={2000}
//               className="w-100 h-100"
//             />
//           </div>
//         ))}
//       {session !== null &&
//         speakerStream.map((el) => (
//           <div
//             className={el.connection.id !== focusStream ? "d-none" : "h-100"}
//             key={el.id}
//           >
//             <OTSubscriber
//               properties={{
//                 subscribeToAudio: false,
//                 subscribeToVideo: true,
//                 width: "100%",
//                 height: "100%",
//                 style: { buttonDisplayMode: "off" },
//               }}
//               session={session}
//               stream={el}
//               retry={true}
//               maxRetryAttempts={3}
//               retryAttemptTimeout={2000}
//               className="w-100 h-100"
//             />
//           </div>
//         ))}
//     </>
//   );
// };

// const mapState = (state) => ({
//   moderatorStream: state.roomReducer.moderatorStream,
//   speakerStream: state.roomReducer.speakerStream,
//   focusStream: state.roomReducer.focusStream,
//   session: state.roomReducer.session,
//   role: state.roomPersistReducer.role,
// });

// export default connect(mapState)(Speaker);

const Speaker = ({
  session,
  moderatorStream,
  role,
  focusStream,
  speakerStream,
  publisherConnections,
}) => {
  const [state, setState] = React.useState({
    selfVideo: true,
    mainStream: null,
    showBanner: true,
    showWaiting: false,
  });

  const { selfVideo, mainStream, showWaiting, showBanner } = state;

  const handleError = (e) => {
    console.log("speaker err: ", e);
  };

  React.useEffect(() => {
    if (role !== "participant") {
      if (focusStream === "self" || publisherConnections.length === 0) {
        setState((state) => ({
          ...state,
          selfVideo: true,
          mainStream: null,
          showWaiting: false,
        }));
      } else {
        const indexConnections = publisherConnections.findIndex(
          (e) => e.connection.id === focusStream
        );
        if (indexConnections >= 0) {
          let indexStreams = 0;
          if (role === "moderator") {
            indexStreams = speakerStream.findIndex(
              (e) => e.connection.id === focusStream
            );
          } else {
            indexStreams = [...speakerStream, ...moderatorStream].findIndex(
              (e) => e.connection.id === focusStream
            );
          }
          if (indexStreams >= 0) {
            if (role === "moderator") {
              setState((state) => ({
                ...state,
                selfVideo: false,
                showWaiting: false,
                mainStream: speakerStream[indexStreams],
              }));
            } else {
              const streams = [...speakerStream, ...moderatorStream];
              setState((state) => ({
                ...state,
                selfVideo: false,
                showWaiting: false,
                mainStream: streams[indexStreams],
              }));
            }
          } else {
            setState((state) => ({
              ...state,
              showWaiting: true,
              mainStream: null,
            }));
          }
        } else {
          setState((state) => ({
            ...state,
            selfVideo: true,
            showWaiting: false,
            mainStream: null,
          }));
        }
      }
    } else {
      const streams = [...speakerStream, ...moderatorStream];
      if (focusStream === "self" && publisherConnections.length === 0) {
        setState((state) => ({
          ...state,
          showBanner: true,
          showWaiting: false,
        }));
      } else {
        if (focusStream === "self") {
          const indexStreams = streams.findIndex(
            (e) => e.connection.id === publisherConnections[0].connection.id
          );
          if (indexStreams >= 0) {
            setState((state) => ({
              ...state,
              showBanner: false,
              showWaiting: false,
              mainStream: streams[indexStreams],
            }));
          } else {
            setState((state) => ({
              ...state,
              showBanner: false,
              showWaiting: true,
              mainStream: null,
            }));
          }
        } else {
          const indexConnections = publisherConnections.findIndex(
            (e) => e.connection.id === focusStream
          );
          if (indexConnections >= 0) {
            const indexStreams = streams.findIndex(
              (e) => e.connection.id === focusStream
            );
            if (indexStreams >= 0) {
              setState((state) => ({
                ...state,
                showBanner: false,
                showWaiting: false,
                mainStream: streams[indexStreams],
              }));
            } else {
              setState((state) => ({
                ...state,
                showBanner: false,
                showWaiting: true,
                mainStream: null,
              }));
            }
          } else {
            if (publisherConnections.length > 0) {
              const indexStreams = streams.findIndex(
                (e) => e.connection.id === publisherConnections[0].connection.id
              );
              if (indexStreams >= 0) {
                setState((state) => ({
                  ...state,
                  showBanner: false,
                  showWaiting: false,
                  mainStream: streams[indexStreams],
                }));
              } else {
                setState((state) => ({
                  ...state,
                  showBanner: false,
                  showWaiting: true,
                  mainStream: null,
                }));
              }
            } else {
              setState((state) => ({
                ...state,
                showBanner: true,
                showWaiting: false,
                mainStream: null,
              }));
            }
          }
        }
      }
    }
  }, [focusStream, moderatorStream, publisherConnections, role, speakerStream]);

  if (role !== "participant") {
    return (
      <>
        <div className={!selfVideo ? "d-none" : "h-100"}>
          <Publisher />
        </div>
        {mainStream !== null && !selfVideo && (
          <OTSubscriber
            properties={{
              subscribeToAudio: false,
              subscribeToVideo: true,
              width: "100%",
              height: "100%",
              style: { buttonDisplayMode: "off" },
            }}
            session={session}
            stream={mainStream}
            retry={true}
            onError={handleError}
            maxRetryAttempts={3}
            retryAttemptTimeout={2000}
            className="w-100 h-100"
          />
        )}
        {showWaiting && (
          <div
            className="d-flex align-items-center justify-content-center w-100 h-100"
            style={{ background: "black" }}
          >
            <CircularProgress className="fs-30 text-white" />
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {showBanner && mainStream === null && (
          <NoVideo iconClassName="fs-200" />
        )}
        {mainStream !== null && (
          <OTSubscriber
            properties={{
              subscribeToAudio: false,
              subscribeToVideo: true,
              width: "100%",
              height: "100%",
              style: { buttonDisplayMode: "off" },
            }}
            session={session}
            stream={mainStream}
            retry={true}
            onError={handleError}
            maxRetryAttempts={3}
            retryAttemptTimeout={2000}
            className="w-100 h-100"
          />
        )}
        {showWaiting && (
          <div
            className="d-flex align-items-center justify-content-center w-100 h-100"
            style={{ background: "black" }}
          >
            <CircularProgress className="fs-30 text-white" />
          </div>
        )}
      </>
    );
  }
};

const mapState = (state) => ({
  moderatorStream: state.roomReducer.moderatorStream,
  speakerStream: state.roomReducer.speakerStream,
  focusStream: state.roomReducer.focusStream,
  publisherConnections: state.roomReducer.publisherConnections,
  session: state.roomReducer.session,
  role: state.roomPersistReducer.role,
});

export default connect(mapState)(Speaker);
