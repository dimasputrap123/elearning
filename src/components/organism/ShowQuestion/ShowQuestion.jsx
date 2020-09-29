import { Card, Grow, IconButton } from "@material-ui/core";
import { ContextType } from "container/template/ControlContext/ControlContext";
import React from "react";
import "./ShowQuestion.scss";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
import ClearIcon from "@material-ui/icons/Clear";

const ShowQuestion = ({ messageData }) => {
  const { showMessage, handleClick } = React.useContext(ContextType);
  return (
    <Grow in={showMessage}>
      <Card className="show-question-wrapper px-3 py-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex">
            <AccountCircleIcon className="mr-2" />
            <p className="mb-0">{messageData.name}</p>
          </div>
          <IconButton size="small" onClick={() => handleClick("showMessage")}>
            <ClearIcon />
          </IconButton>
        </div>
        <p className="mb-1 fs-13">{messageData.message}</p>
      </Card>
    </Grow>
  );
};

const mapState = (state) => ({ messageData: state.roomReducer.messageData });

export default connect(mapState)(ShowQuestion);
