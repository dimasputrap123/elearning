import { ContextType } from "container/template/ControlContext/ControlContext";
import React from "react";
import "./ListParticipant.scss";
import classNames from "classnames";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import { Divider } from "@material-ui/core";
import SimpleBar from "simplebar-react";
import "simplebar/src/simplebar.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
const ListParticipant = (props) => {
  const { showListSubs } = React.useContext(ContextType);
  return (
    <div className={classNames("participant-wrapper", !showListSubs && "hide")}>
      <div className="d-flex p-3 flex-nowrap">
        <BeenhereIcon className="title-icon mr-2" />
        <p className="mb-0 fs-16 fw-600 text-nowrap">{props.title}</p>
      </div>
      <Divider className="mb-3" />
      <SimpleBar className="participant-list-wrapper">
        {props.subs.length === 0 ? (
          props.role !== "participant" ? (
            <p className="text-center fs-14 text-nowrap">No one's here</p>
          ) : (
            <div className="d-flex align-items-center mb-2 px-3">
              <AccountCircleIcon className="mr-2" />
              <p className="mb-0 fs-16">{props.name}</p>
            </div>
          )
        ) : (
          props.subs.map((el) => {
            const data = JSON.parse(el.connection.data);
            return (
              <div className="d-flex align-items-center mb-2 px-3" key={el.id}>
                <AccountCircleIcon className="mr-2" />
                <p className="mb-0 fs-16">{data.name}</p>
              </div>
            );
          })
        )}
      </SimpleBar>
    </div>
  );
};

const mapState = (state) => ({
  subs: state.roomReducer.subs,
  title: state.roomPersistReducer.title,
  role: state.roomPersistReducer.role,
  name: state.roomPersistReducer.name,
});

export default connect(mapState)(ListParticipant);
