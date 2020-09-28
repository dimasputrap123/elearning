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
      <p className="mb-1 fs-20 fw-500 text-nowrap">{props.title}</p>
      <p className="fs-14 mb-4 text-nowrap">
        {props.speakerStream.length +
          props.moderatorStream.length +
          props.subs.length}{" "}
        Participant
      </p>
      <ParticipantItem
        connectionData={{ name: props.name, role: props.role }}
      />
      <Divider className="mb-3 px-3" />
      <SimpleBar className="participant-list-wrapper">
        {props.subs.length === 0 &&
        props.moderatorStream.length === 0 &&
        props.speakerStream.length === 0 ? (
          <p className="text-center fs-16 text-nowrap">No one's here</p>
        ) : (
          <>
            {props.moderatorStream.length > 0 &&
              props.moderatorStream.map((el) => (
                <ParticipantItem
                  connectionData={el.connection.data}
                  key={el.id}
                />
              ))}
            {props.speakerStream.length > 0 &&
              props.speakerStream.map((el) => (
                <ParticipantItem
                  connectionData={el.connection.data}
                  key={el.id}
                />
              ))}
            {props.subs.map((el) => (
              <ParticipantItem
                connectionData={el.connection.data}
                key={el.id}
              />
            ))}
          </>
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
  speakerStream: state.roomReducer.speakerStream,
  moderatorStream: state.roomReducer.moderatorStream,
});

export default connect(mapState)(ListParticipant);
