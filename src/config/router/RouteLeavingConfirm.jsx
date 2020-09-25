import React, { Component } from "react";
import PropTypes from "prop-types";
import HelpIcon from "@material-ui/icons/Help";
import { withStyles } from "@material-ui/core";
import DialogCustom from "components/organism/dialog/DialogCustom";

const useStyles = {
  dialog: {
    maxWidth: 375,
  },
};

class RouteLeavingConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.isBackButtonClicked = false;
  }

  static propTypes = {
    acceptLeave: PropTypes.func,
    declineLeave: PropTypes.func,
    showConfirmation: PropTypes.bool,
  };

  componentDidMount() {
    window.history.pushState(null, null, window.location.pathname);
    // window.addEventListener("beforeunload", this.onBeforeUnload);
    window.addEventListener("unload", this.onUnload);
    window.addEventListener("popstate", this.onBackButtonEvent);
  }

  // onBeforeUnload = (e) => {
  //   // e.preventDefault();
  //   e.returnValue = "Are you sure to leave?";
  // };

  onBackButtonEvent = (e) => {
    e.preventDefault();
    if (!this.isBackButtonClicked && this.props.showConfirmation) {
      this.setState({ modalVisible: true });
    } else {
      if (this.props.acceptLeave) {
        this.props.acceptLeave();
      } else {
        window.history.go(-1);
      }
    }
  };

  onUnload = (e) => {
    e.preventDefault();
    window.history.go(-1);
  };

  componentWillUnmount() {
    // window.removeEventListener("beforeunload", this.onBeforeUnload);
    window.removeEventListener("unload", this.onUnload);
    window.removeEventListener("popstate", this.onBackButtonEvent);
  }

  handleModal = () => {
    window.history.pushState(null, null, window.location.pathname);
    this.setState({
      modalVisible: false,
    });
  };

  handleClick = () => {
    this.isBackButtonClicked = true;
    if (this.props.acceptLeave) {
      this.props.acceptLeave();
    } else {
      window.history.go(-1);
    }
  };

  handleCancel = () => {
    this.isBackButtonClicked = false;
    this.handleModal();
  };

  render() {
    return (
      <>
        <DialogCustom
          open={this.state.modalVisible}
          text="Apakah Anda yakin akan meninggalkan halaman ini?"
          buttonText="OK"
          title={<HelpIcon className="color-primary fs-40" />}
          titleClass="text-center mb-3"
          actionClass="p-0"
          textClass="fs-14 text-center mb-3"
          buttonClass="py-3 br-unset"
          handleClose={this.handleModal}
          onCancel={this.handleCancel}
          onClick={this.handleClick}
          className={this.props.classes.dialog}
        />
      </>
    );
  }
}

RouteLeavingConfirm.defaultProps = {
  showConfirmation: true,
};

export default withStyles(useStyles)(RouteLeavingConfirm);
