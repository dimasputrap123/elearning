import React from "react";
import "./NoVideo.scss";
// import PersonIcon from "@material-ui/icons/Person";
// import classNames from "classnames";
const NoVideo = ({ connected, iconClassName }) => {
  return (
    <div className="no-video">
      {/* <PersonIcon className={classNames("text-white", iconClassName)} /> */}
      {!connected && (
        <p data-test="connecting-text" className="mb-0 fs-18 text-white">
          Waiting Streams
        </p>
      )}
    </div>
  );
};

export default NoVideo;
