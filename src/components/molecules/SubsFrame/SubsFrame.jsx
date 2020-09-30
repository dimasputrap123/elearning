// import NoVideo from "components/atoms/NoVideo/NoVideo";
import React from "react";
import "./SubsFrame.scss";
const SubsFrame = ({ children, onClick }) => {
  return (
    <div className="subs-frame" onClick={onClick}>
      {/* <NoVideo iconClassName='fs-50' /> */}
      {children}
    </div>
  );
};

export default SubsFrame;
