import React from "react";
import { useHistory } from "react-router-dom";
import { set_tmp_rd } from "../../../config/redux/action/state";
import { connect } from "react-redux";

const Other2Page = (props) => {
  const history = useHistory();
  const handleBack = () => {
    history.replace("/other");
  };
  React.useEffect(() => {
    props.acceptLeave(handleBack);
    props.dialogSetup({
      alertAppear: false,
      nameKey: "example",
      removeTmp: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Other2Page</h1>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        link
      </button>
      <button
        onClick={() => {
          props.set_tmp_rd({
            status: false,
            key: "example",
            msg: "lorem ipsum",
            data: null,
          });
        }}
      >
        modal
      </button>
    </div>
  );
};

export default connect(null, { set_tmp_rd })(Other2Page);
