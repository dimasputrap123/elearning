import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
// import color from "../../../assets/theme/color";
import PropTypes from "prop-types";
import classNames from "classnames";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    justifyContent: "center",
  },
}))(MuiDialogActions);

export default function DialogCustom(props) {
  const {
    open,
    handleClose,
    title,
    titleClass,
    text,
    textClass,
    buttonText,
    onClick,
    backgroundColor,
    textColorClass,
    content,
    showCloseButton,
    maxWidth,
    className,
    modalClass,
    actionClass,
    buttonClass,
    onCancel,
  } = props;
  const onClose = () => {
    handleClose(false);
  };
  const handleClick = () => {
    onClick();
  };
  const useStyles = makeStyles({
    root: {
      "& .MuiDialog-container .MuiPaper-root": {
        backgroundColor: backgroundColor || "#fff",
      },
    },
  });
  const classes = useStyles();
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className={classNames(classes.root, modalClass)}
      maxWidth={maxWidth}
    >
      <DialogContent dividers className={className}>
        <div
          className={classNames(
            title && !titleClass && "mb-3",
            showCloseButton && "d-flex justify-content-between"
          )}
        >
          {title && (
            <p
              className={classNames(
                titleClass || "fs-14 font-weight-bold text-center",
                textColorClass || "color-secondary",
                textClass
              )}
            >
              {title}
            </p>
          )}
          {showCloseButton && (
            <IconButton onClick={onClose} size="small">
              <CloseIcon className={textColorClass} />
            </IconButton>
          )}
        </div>
        {text && (
          <p
            className={classNames(
              textClass || "fs-12 text-center",
              textColorClass || "color-secondary"
            )}
          >
            {text}
          </p>
        )}
        {content}
      </DialogContent>
      {buttonText && (
        <DialogActions className={actionClass}>
          <Button
            onClick={handleClick}
            className={classNames("font-weight-bold w-100", buttonClass)}
          >
            {buttonText}
          </Button>
          {onCancel && (
            <Button
              className={classNames("font-weight-bold w-100", buttonClass)}
              onClick={onCancel}
            >
              Batal
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

DialogCustom.defaultProps = {
  showCloseButton: false,
  maxWidth: "sm",
};

DialogCustom.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  textColorClass: PropTypes.string,
  showCloseButton: PropTypes.bool,
  onCancel: PropTypes.func,
};
