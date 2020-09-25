import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapState = (state) => ({ login_status: state.authReducer.login_status });

const PublicRoute = ({ children, login_status, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location, history }) => {
        if (!login_status) {
          return children;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default connect(mapState)(PublicRoute);
