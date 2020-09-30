import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@material-ui/core";
import { ContextType } from "container/template/ControlContext/ControlContext";
import React from "react";
// import VideocamIcon from "@material-ui/icons/Videocam";
// import MicIcon from "@material-ui/icons/Mic";
import OT from "@opentok/client";
import { room_p_rd } from "../../../../config/redux/action/room";
import { connect } from "react-redux";
const DialogSelectDevice = (props) => {
  const { handleClick, showDevices } = React.useContext(ContextType);
  const [state, setState] = React.useState({
    video: [],
    audio: [],
    videoSelected: "",
    audioSelected: "",
  });
  const { video, audio, videoSelected, audioSelected } = state;
  const handleChange = ({ target: { value, name } }) => {
    setState({ ...state, [name]: value });
  };
  const handleSubmit = () => {
    props.room_p_rd({ videoSelected, audioSelected });
    handleClick("showDevices");
  };
  React.useEffect(() => {
    if (showDevices) {
      console.log("tes");
      OT.getDevices((error, devices) => {
        const video = devices.filter((elm) => elm.kind === "videoInput");
        const audio = devices.filter((elm) => elm.kind === "audioInput");
        setState((state) => ({ ...state, video, audio, once: false }));
        if (videoSelected === "") {
          setState((state) => ({ ...state, videoSelected: video[0].deviceId }));
        }
        if (audioSelected === "") {
          setState((state) => ({ ...state, audioSelected: audio[0].deviceId }));
        }
      });
    }
  }, [showDevices, videoSelected, audioSelected]);
  return (
    <Dialog
      open={showDevices}
      onClose={() => handleClick("showDevices")}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{"Change Devices?"}</DialogTitle>
      <DialogContent className="d-flex flex-column">
        <Select
          variant="outlined"
          className="mb-4"
          fullWidth
          value={videoSelected}
          name="videoSelected"
          onChange={handleChange}
        >
          {video.map((el, id) => (
            <MenuItem value={el.deviceId} key={id}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
        <Select
          variant="outlined"
          className="mb-3"
          fullWidth
          value={audioSelected}
          name="audioSelected"
          onChange={handleChange}
        >
          {audio.map((el, id) => (
            <MenuItem value={el.deviceId} key={id}>
              {el.label}
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => handleClick("showDevices")}>
          Cancel
        </Button>
        <Button color="primary" autoFocus onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(null, { room_p_rd })(DialogSelectDevice);
