import CircleButton from "components/atoms/CircleButton";
import React from "react";
import PropTypes from "prop-types";

const ControlButton = ({ onClick, on, off, className, properties }) => {
  const [state, setState] = React.useState(true);
  const handleClick = () => {
    setState(!state);
    onClick();
  };
  return (
    <CircleButton
      onClick={handleClick}
      icon={state ? on : off ? off : on}
      properties={properties}
      className={className}
    />
  );
};

ControlButton.propTypes = {
  onClick: PropTypes.func,
  on: PropTypes.element,
  off: PropTypes.element,
  className: PropTypes.string,
  properties: PropTypes.shape({
    size: PropTypes.number,
    backgroundColor: PropTypes.string,
  }),
};

ControlButton.defaultProps = {
  onClick: () => null,
  properties: {
    size: 64,
    backgroundColor: "unset",
  },
};

export default ControlButton;
