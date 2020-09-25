import React from "react";
import { connect } from "react-redux";
import { end_call_lc } from "../../../config/redux/action/room";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
let ContextType;
const { Provider, Consumer } = (ContextType = React.createContext());

class Context extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showListQuestion: false,
      showListSubs: true,
      showSendMessage: false,
      publishAudio: true,
      publishVideo: true,
      screenShare: false,
      showDevices: false,
    };
  }
  handleClick = (name) => {
    switch (name) {
      case "listQuestion":
        this.setState({ showListQuestion: !this.state.showListQuestion });
        break;
      case "listSubs":
        this.setState({ showListSubs: !this.state.showListSubs });
        break;
      case "audioSelf":
        this.setState({ publishAudio: !this.state.publishAudio });
        break;
      case "videoSelf":
        this.setState({ publishVideo: !this.state.publishVideo });
        break;
      case "screenShare":
        this.setState({ screenShare: !this.state.screenShare });
        break;
      case "showDevices":
        this.setState({ showDevices: !this.state.showDevices });
        break;
      case "showSendMessage":
        this.setState({ showSendMessage: !this.state.showSendMessage });
        break;
      case "end":
        this.props.end_call_lc({
          session: this.props.session,
          push: () => {
            this.props.history.push("/");
          },
        });
        break;
      default:
        return;
    }
  };
  render() {
    return (
      <Provider value={{ ...this.state, handleClick: this.handleClick }}>
        {this.props.children}
      </Provider>
    );
  }
}

const mapState = (state) => ({ session: state.roomReducer.session });
const ControlContext = compose(
  connect(mapState, { end_call_lc }),
  withRouter
)(Context);
export { ControlContext, Consumer, ContextType };
