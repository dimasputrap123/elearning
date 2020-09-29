import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { ContextType } from "container/template/ControlContext/ControlContext";
import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

const DialogSendMessage = ({ session, name }) => {
  const { handleClick, showSendMessage } = React.useContext(ContextType);
  const { register, handleSubmit } = useForm();
  const onSubmit = (e) => {
    session.signal(
      {
        data: JSON.stringify({
          name,
          message: e.message,
        }),
        type: "message",
      },
      (error) => {
        if (error) {
          console.log("signal error :", error);
        } else {
          console.log("signal send");
          handleClick("showSendMessage");
        }
      }
    );
    console.log(e);
  };
  return (
    <Dialog
      open={showSendMessage}
      onClose={() => handleClick("showSendMessage")}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Send Message</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            placeholder="Message"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            name="message"
            inputRef={register}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClick("showSendMessage")}
            color="primary"
          >
            Cancel
          </Button>
          <Button color="primary" autoFocus type="submit">
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const mapState = (state) => ({
  session: state.roomReducer.session,
  name: state.roomPersistReducer.name,
});

export default connect(mapState)(DialogSendMessage);
