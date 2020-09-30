import React from "react";
import "./SelfVideo.scss";
import classNames from "classnames";
import { ContextType } from "container/template/ControlContext/ControlContext";

const SelfVideo = ({ className, fitMode }) => {
  let video = React.useRef(null);
  const [state, setState] = React.useState({
    videoDevices: null,
    localStream: null,
  });

  const { publishVideo } = React.useContext(ContextType);

  const { videoDevices, localStream } = state;

  React.useEffect(() => {
    const videoRef = video.current;
    if (videoDevices !== null) {
      startStream(videoDevices.deviceId);
    }
    return () => {
      videoRef.pause();
      videoRef.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.srcObject = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    getVideoDevice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (videoDevices !== null) {
      if (!publishVideo) {
        video.current.pause();
        video.current.srcObject = null;
        localStream.getTracks().forEach((track) => track.stop());
      } else {
        startStream(videoDevices.deviceId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishVideo, videoDevices]);

  const startStream = async (deviceId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: {
            min: 640,
            ideal: 1280,
            max: 1920,
          },
          height: {
            min: 360,
            ideal: 720,
            max: 1080,
          },
          deviceId: {
            exact: deviceId,
          },
        },
      });
      video.current.srcObject = stream;
      setState((state) => ({ ...state, localStream: stream }));
      console.log(stream);
    } catch (error) {
      console.log("stream error ", error);
    }
  };

  const getVideoDevice = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((e) => {
        const videoDevices = e.filter((device) => device.kind === "videoinput");
        console.log(videoDevices);
        setState((state) => ({ ...state, videoDevices: videoDevices[0] }));
      })
      .catch((err) => {
        console.log("Devices not found", err);
      });
  };

  return (
    <div
      className={classNames(
        className ? className : "self-video-size",
        "self-video-background"
      )}
    >
      <video
        autoPlay
        style={{
          objectFit: fitMode,
          width: "100%",
          height: "100%",
          transform: "scale(-1, 1)",
          filter: "FlipH",
        }}
        ref={video}
      ></video>
    </div>
  );
};

SelfVideo.defaultProps = {
  fitMode: "contain",
};

export default SelfVideo;
