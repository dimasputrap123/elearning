import { ContextType } from "container/template/ControlContext/ControlContext";
import React from "react";
import "./ListSubs.scss";
import classNames from "classnames";
import BeenhereIcon from "@material-ui/icons/Beenhere";
import { Divider } from "@material-ui/core";
import SimpleBar from "simplebar-react";
import "simplebar/src/simplebar.css";
import { connect } from "react-redux";
import { OTSubscriber } from "opentok";
import SubsFrame from "components/molecules/SubsFrame";
import Publisher from "../Publisher";

const ListSubs = (props) => {
  const { showListSubs } = React.useContext(ContextType);
  React.useEffect(() => {
    console.log("subs:", props.subs.length);
  }, [props.subs]);
  return (
    <div className={classNames("subs-wrapper", !showListSubs && "hide")}>
      <div className="d-flex p-3 flex-nowrap">
        <BeenhereIcon className="title-icon mr-2" />
        <p className="mb-0 fs-16 fw-600 text-nowrap">{props.title}</p>
      </div>
      <Divider className="mb-3" />
      <SimpleBar className="subs-list-wrapper">
        {props.role === "participant" && (
          <SubsFrame>
            <Publisher />
          </SubsFrame>
        )}
        {props.subs.length === 0 ? (
          <p className="text-center fs-14 text-nowrap">No one's here</p>
        ) : (
          props.session !== null &&
          props.subs.map((sub) => (
            <SubsFrame key={sub.id}>
              <OTSubscriber
                properties={{
                  subscribeToAudio: true,
                  subscribeToVideo: true,
                  width: "100%",
                  height: "100%",
                }}
                session={props.session}
                stream={sub}
                retry={true}
                maxRetryAttempts={3}
                retryAttemptTimeout={2000}
                className="w-100 h-100"
              />
            </SubsFrame>
          ))
        )}
      </SimpleBar>
    </div>
  );
};

const mapState = (state) => ({
  subs: state.roomReducer.subs,
  session: state.roomReducer.session,
  title: state.roomPersistReducer.title,
  role: state.roomPersistReducer.role,
});

export default connect(mapState)(ListSubs);
