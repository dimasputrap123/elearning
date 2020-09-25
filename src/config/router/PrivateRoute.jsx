import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapState = (state) => ({
  login_status: state.authReducer.login_status,
  token: state.roomPersistReducer.token,
});

const PrivateRoute = ({ children, login_status, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location, history }) => {
        const { pathname } = location;
        if (login_status) {
          if (pathname === "/room") {
            if (token === "") return <Redirect to="/" />;
            else return children;
          } else {
            return children;
          }
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default connect(mapState)(PrivateRoute);
