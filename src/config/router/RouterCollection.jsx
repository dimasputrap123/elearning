import React from "react";
import PrivateRouter from "./PrivateRoute";
import PublicRouter from "./PublicRoute";
import withDialog from "container/template/withDialog";
import RouteLeavingConfirm from "./RouteLeavingConfirm";

const obj = {
  public: PublicRouter,
  private: PrivateRouter,
};

const RouterCollection = ({ item, dialogSetup, ...rest }) => {
  const { component: Component, type, showLeaveConfirm, manualLeave } = item;
  const [state, setState] = React.useState(null);
  const Router = obj[type];
  const acceptLeave = (func) => {
    setState(() => func);
  };
  const otherProps = {
    dialogSetup,
    acceptLeave,
  };
  return (
    <Router {...rest}>
      {showLeaveConfirm && (
        <RouteLeavingConfirm acceptLeave={manualLeave ? state : null} />
      )}
      <Component {...otherProps} />
    </Router>
  );
};

export default withDialog(RouterCollection);
