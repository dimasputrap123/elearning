import React from "react";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import CallEndIcon from "@material-ui/icons/CallEnd";
import MessageIcon from "@material-ui/icons/Message";
import GroupIcon from "@material-ui/icons/Group";
import RemoveIcon from '@material-ui/icons/Remove';
import ControlButton from "components/molecules/ControlButton";
import "./MainControl.scss";
import { ContextType } from "container/template/ControlContext/ControlContext";
import { connect } from "react-redux";

const MainControl = ({ role }) => {
  const { handleClick } = React.useContext(ContextType);
  return (
    <div className="main-control-wrapper">
      {role !== "participant" ? (
        <>
          <ControlButton
            on={<VideocamIcon className="color-blue" />}
            off={<VideocamOffIcon className="color-blue" />}
            properties={{
              backgroundColor: "white",
              size: 60,
            }}
            className="mr-3"
            onClick={() => handleClick("videoSelf")}
          />
          <ControlButton
            on={<MicIcon className="color-blue" />}
            off={<MicOffIcon className="color-blue" />}
            className="mr-3"
            properties={{
              backgroundColor: "white",
              size: 60,
            }}
            onClick={() => handleClick("audioSelf")}
          />
        </>
      ) : (
        <ControlButton
          on={<MessageIcon className="color-blue" />}
          className="mr-3"
          properties={{
            backgroundColor: "white",
            size: 60,
          }}
          onClick={() => handleClick("showSendMessage")}
        />
      )}
      <ControlButton
        on={<CallEndIcon className="text-white" />}
        className="mr-3"
        properties={{
          backgroundColor: "red",
          size: 60,
        }}
        onClick={() => handleClick("end")}
      />
      {role !== "participant" ? (
        <ControlButton
          on={<ScreenShareIcon className="color-blue" />}
          properties={{
            backgroundColor: "white",
            size: 60,
          }}
          onClick={() => handleClick("screenShare")}
        />
      ) : (
        <ControlButton
          on={<GroupIcon className="color-blue" />}
          properties={{
            backgroundColor: "white",
            size: 60,
          }}
          onClick={() => handleClick("listSubs")}
        />
      )}
      {role === "moderator" && (
        <ControlButton
          on={<RemoveIcon className="text-white" />}
          className="ml-3"
          properties={{
            backgroundColor: "red",
            size: 60,
          }}
        />
      )}
    </div>
  );
};

const mapState = (state) => ({ role: state.roomPersistReducer.role });

export default connect(mapState)(MainControl);
