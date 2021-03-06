import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const ParticipantItem = ({ connectionData }) => {
  let data = null;
  if (typeof connectionData === "object") {
    data = { ...connectionData };
  } else {
    data = JSON.parse(connectionData);
  }
  const { name } = data;
  return (
    <div className="d-flex align-items-center mb-3">
      <AccountCircleIcon className="mr-2 fs-30" />
      <p className="mb-0 fs-16 text-nowrap">{name}</p>
    </div>
  );
};

export default ParticipantItem;
