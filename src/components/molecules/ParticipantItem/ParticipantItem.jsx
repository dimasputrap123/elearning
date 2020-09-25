import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const ParticipantItem = ({ name }) => {
  return (
    <div className="d-flex align-items-center px-3">
      <AccountCircleIcon className="mr-2" />
      <p className="mb-0 fs-16">{name}</p>
    </div>
  );
};

export default ParticipantItem;
