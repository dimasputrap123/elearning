import { IconButton } from "@material-ui/core";
import React from "react";
import "./ExtraControl.scss";
import GroupIcon from "@material-ui/icons/Group";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import SettingsIcon from "@material-ui/icons/Settings";
import { ContextType } from "container/template/ControlContext/ControlContext";

const ExtraControl = () => {
  const { handleClick } = React.useContext(ContextType);
  return (
    <div className="button-group-wrapper">
      <IconButton size="small" onClick={() => handleClick("listSubs")}>
        <GroupIcon className="icon-button-color" />
      </IconButton>
      <IconButton size="small" onClick={() => handleClick("listQuestion")}>
        <ModeCommentIcon className="icon-button-color mx-2" />
      </IconButton>
      <IconButton size="small" onClick={() => handleClick("showDevices")}>
        <SettingsIcon className="icon-button-color" />
      </IconButton>
    </div>
  );
};

export default ExtraControl;
