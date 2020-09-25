import React from "react";
import DialogAlert from "components/organism/dialog/DialogAlert";

/**
 * withDialog
 * @param {component} WrapperComponent
 * @return {component}
 */
const withDialog = (WrapperComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        setup: {},
      };
    }
    /**
     * dialogSetup
     * @param {object} setup
     * {
     *    alertAppear: boolean => true (show alert success) false (show alert failed)
     *    nameKey: string => nama key yg di set ke tmp_result
     *    buttonText: string(default 'OK') => text di button
     *    needIcon: boolean(default true) => true (show top icon) false (hide top icon)
     *    removeTmp: boolean(default true) => hapus data dari tmp_result
     * }
     */
    dialogSetup = (setup) => {
      this.setState({ setup });
    };
    render() {
      const props = {
        ...this.props,
        dialogSetup: this.dialogSetup,
      };
      return (
        <>
          <WrapperComponent {...props} />
          <DialogAlert {...this.state.setup} />
        </>
      );
    }
  };
};

export default withDialog;
