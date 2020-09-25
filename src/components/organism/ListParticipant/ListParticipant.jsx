import { ContextType } from "container/template/ControlContext/ControlContext";
import React from "react";
import "./ListParticipant.scss";
import classNames from "classnames";
import { Divider } from "@material-ui/core";
import SimpleBar from "simplebar-react";
import "simplebar/src/simplebar.css";
import { connect } from "react-redux";
import ParticipantItem from "components/molecules/ParticipantItem";

const ListParticipant = (props) => {
  const { showListSubs } = React.useContext(ContextType);
  return (
    <div className={classNames("participant-wrapper", !showListSubs && "hide")}>
      <p className="mb-2 fs-18 fw-500 text-nowrap">{props.title}</p>
      <p className="fs-14">6 Participant</p>
      <ParticipantItem name={props.name + " (Me)"} />
      <Divider className="my-3 px-3" />
      <SimpleBar className="participant-list-wrapper">
        {props.subs.length === 0 ? (
          <p className="text-center fs-16 text-nowrap">No one's here</p>
        ) : (
          props.subs.map((el) => {
            const data = JSON.parse(el.connection.data);
            return <ParticipantItem name={data.name} key={el.id} />;
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
