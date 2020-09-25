import { ContextType } from "container/template/ControlContext/ControlContext";
import React from "react";
import "./ListQuestion.scss";
import { Divider, Drawer, IconButton } from "@material-ui/core";
import SimpleBar from "simplebar-react";
import "simplebar/src/simplebar.css";
import CardQuestion from "components/molecules/CardQuestion";
import ClearIcon from "@material-ui/icons/Clear";
import { connect } from "react-redux";

const ListQuestion = ({ messages }) => {
  const { showListQuestion, handleClick } = React.useContext(ContextType);
  return (
    <Drawer
      anchor="right"
      open={showListQuestion}
      onClose={() => handleClick("listQuestion")}
    >
      <div className="quest-wrapper">
        <div className="p-3 d-flex align-items-center">
          <IconButton
            size="small"
            className="mr-3"
            onClick={() => handleClick("listQuestion")}
          >
            <ClearIcon />
          </IconButton>
          <p className="mb-0 fs-16 fw-600">Questions</p>
        </div>
        <Divider className="mb-3" />
        <SimpleBar className="quest-list-wrapper">
          {messages.length === 0 ? (
            <p className="text-center fs-14">No messages</p>
          ) : (
            messages.map((message, id) => (
              <CardQuestion item={message} key={id} />
            ))
          )}
        </SimpleBar>
      </div>
    </Drawer>
  );
};

const mapState = (state) => ({ messages: state.roomPersistReducer.messages });

export default connect(mapState)(ListQuestion);
