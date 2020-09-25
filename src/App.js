import React from "react";
import "./asset/styles/common.scss";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import pages from "container/page";
import RouterCollection from "config/router/RouterCollection";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {pages.map((item, id) => (
            <RouterCollection exact path={item.path} key={id} item={item} />
          ))}
        </Switch>
      </Router>
    );
  }
}

export default App;
