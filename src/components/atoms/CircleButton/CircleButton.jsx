import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
const CircleButton = ({ icon, className, properties, onClick }) => {
  const useStyles = makeStyles({
    root: {
      padding: 0,
      height: properties.size,
      // width: properties.size,
      minWidth: properties.size,
      backgroundColor: properties.backgroundColor + "!important",
      borderRadius: "50%",
      transition: "filter 0.5s",
      "&:hover": {
        filter: "brightness(90%)",
      },
    },
  });
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classNames(classes.root, className)}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};

CircleButton.propTypes = {
  icon: PropTypes.element,
  className: PropTypes.string,
  onClick: PropTypes.func,
  properties: PropTypes.shape({
    size: PropTypes.number,
    backgroundColor: PropTypes.string,
  }),
};

CircleButton.defaultProps = {
  onClick: () => null,
  properties: {
    size: 64,
    backgroundColor: "unset",
  },
};

export default CircleButton;
