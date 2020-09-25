import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  makeStyles,
  CircularProgress,
  Select,
  MenuItem,
} from "@material-ui/core";
import styles from "./styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { join_lc } from "../../../config/redux/action/room";
import { checkLoadingStatus } from "config/redux/selector/stateSelector";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import stateHelper from "helper/stateHelper";
const JoinPage = (props) => {
  const useStyles = makeStyles(styles);
  const history = useHistory();
  const classes = useStyles();
  const { handleSubmit, register } = useForm();
  const [state, setState] = React.useState({
    role: "moderator",
  });
  const onSubmit = (data, e) => {
    // console.log(data);
    props.dialogSetup({
      alertAppear: false,
      nameKey: "join_lc",
      removeTmp: false,
    });
    props.join_lc({ ...data, ...state });
  };
  React.useEffect(() => {
    let data = stateHelper.getSpesificTmp(props.tmp_result, "join_lc");
    if (data !== null) {
      if (data.status) {
        history.push("/room");
      }
    }
  }, [history, props.tmp_result]);
  const handleChange = ({ target: { value, name } }) => {
    setState({ ...state, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.wrapper}>
        <p className="fs-24 fw-600">Join Room</p>
        <TextField
          placeholder="room id"
          variant="outlined"
          type="text"
          name="opentok_room_id"
          className="mb-3"
          inputRef={register}
        />
        <TextField
          placeholder="password"
          variant="outlined"
          type="password"
          name="password"
          className="mb-3"
          inputRef={register}
        />
        <TextField
          placeholder="name"
          variant="outlined"
          type="text"
          name="name"
          className="mb-3"
          inputRef={register}
        />
        <Select
          variant="outlined"
          value={state.role}
          className="mb-3"
          fullWidth
          name="role"
          onChange={handleChange}
        >
          <MenuItem value="moderator">Moderator</MenuItem>
          <MenuItem value="participant">Participant</MenuItem>
          <MenuItem value="speaker">Speaker</MenuItem>
        </Select>
        <Button
          disabled={props.loading}
          color="primary"
          variant="contained"
          type="submit"
          className="position-relative"
        >
          {props.loading && (
            <CircularProgress size={20} className={classes.circular} />
          )}
          Login
        </Button>
      </div>
    </form>
  );
};

const mapState = (state) => ({
  loading: checkLoadingStatus(state, "join_lc"),
  tmp_result: state.stateReducer.tmp_result,
});

export default compose(connect(mapState, { join_lc }))(JoinPage);
