import ControlButton from "components/molecules/ControlButton";
import React from "react";
import { useHistory } from "react-router-dom";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";

const OtherPage = () => {
  const history = useHistory();
  return (
    <div>
      <h1
        onClick={() => {
          history.push("/rest");
        }}
      >
        Other Page
      </h1>
      <ControlButton
        on={<VideocamIcon className="text-white" />}
        off={<VideocamOffIcon className="text-white" />}
        properties={{ backgroundColor: "red", size: 50 }}
      />
    </div>
  );
};

export default OtherPage;
