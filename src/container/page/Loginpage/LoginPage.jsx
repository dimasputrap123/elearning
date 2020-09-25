import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, makeStyles, CircularProgress } from "@material-ui/core";
import styles from "./styles";
import { compose } from "redux";
import { connect } from "react-redux";
import { login_lc } from "../../../config/redux/action/auth";
import { checkLoadingStatus } from "config/redux/selector/stateSelector";
import { useForm } from "react-hook-form";

const LoginPage = (props) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  console.log(window.screen.availWidth, window.screen.availHeight);
  const { handleSubmit, register } = useForm();
  const onSubmit = (data, e) => {
    // console.log(data);
    props.dialogSetup({
      alertAppear: false,
      nameKey: "login_lc",
      removeTmp: true,
    });
    props.login_lc({ ...data });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.wrapper}>
        <p className="fs-24 fw-600">Login</p>
        <TextField
          placeholder="Email"
          variant="outlined"
          type="email"
          name="email"
          className="mb-3"
          inputRef={register}
        />
        <TextField
          placeholder="Password"
          variant="outlined"
          type="password"
          name="password"
          className="mb-3"
          inputRef={register}
        />
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
  loading: checkLoadingStatus(state, "login_lc"),
});

export default compose(connect(mapState, { login_lc }))(LoginPage);
