import React from "react";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, Button } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import PropTypes from "prop-types";
import stateHelper from "helper/stateHelper";

const DialogAlert = ({
  buttonText,
  alertAppear,
  nameKey,
  needIcon,
  removeTmp,
}) => {
  const tmp_result = useSelector((state) => state.stateReducer.tmp_result);
  const [state, setState] = React.useState({
    open: false,
    msg: "tes123",
    status: true,
  });
  React.useEffect(() => {
    let data = stateHelper.getSpesificTmp(
      tmp_result,
      [nameKey, "network_error", "server_error", "session_timeout"],
      removeTmp
    );
    if (data !== null) {
      if (
        (!alertAppear && !data.status) ||
        (alertAppear && data.status) ||
        alertAppear === "both"
      ) {
        setState((state) => ({
          ...state,
          msg: data.msg,
          open: true,
          status: data.status,
        }));
      }
    }
  }, [alertAppear, nameKey, removeTmp, tmp_result]);
  const { open, msg, status } = state;
  const handleModal = (e) => {
    setState((state) => ({ ...state, open: e }));
  };
  const handleClick = () => {
    handleModal(false);
  };
  return (
    <Dialog open={open} onClose={handleClick} fullWidth maxWidth="xs">
      <DialogContent dividers>
        <div className="text-center w-100">
          {needIcon &&
            (status ? (
              <CheckCircleIcon className="fs-40 mb-3" color="primary" />
            ) : (
              <CancelIcon className="fs-40 mb-3" color="primary" />
            ))}
        </div>
        <p className="fs-16 text-center">{msg}</p>
      </DialogContent>
      <div className="text-center py-3">
        <Button variant="contained" onClick={handleClick} color="primary">
          {buttonText}
        </Button>
      </div>
    </Dialog>
  );
};

DialogAlert.propTypes = {
  buttonText: PropTypes.string,
  alertAppear: PropTypes.any,
  nameKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  needIcon: PropTypes.bool,
  removeTmp: PropTypes.bool,
};

DialogAlert.defaultProps = {
  buttonText: "OK",
  alertAppear: true,
  nameKey: "",
  needIcon: true,
  removeTmp: false,
};

export default DialogAlert;
