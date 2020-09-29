import { Button, Card, IconButton, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ContextType } from "container/template/ControlContext/ControlContext";
import { connect } from "react-redux";
import { room_rd } from "../../../config/redux/action/room";
const CardQuestion = ({ item, room_rd }) => {
  const [anchor, setAnchor] = React.useState(null);
  const { handleClick } = React.useContext(ContextType);
  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchor(null);
  };
  const handleSelectedMenu = (e) => {
    console.log(e);
    if (e === "show") {
      handleClick("listQuestion");
      handleClick("showMessage");
      room_rd({ messageData: { ...item } });
    }
    closeMenu();
  };
  return (
    <Card className="w-100 px-3 py-2 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex">
          <AccountCircleIcon className="mr-2" />
          <p className="mb-0">{item.name}</p>
        </div>
        <IconButton size="small" onClick={handleMenu}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="question-menu"
          anchorEl={anchor}
          keepMounted
          open={Boolean(anchor)}
          onClose={closeMenu}
        >
          <MenuItem onClick={() => handleSelectedMenu("pin")}>Pin</MenuItem>
          <MenuItem value="show" onClick={() => handleSelectedMenu("show")}>
            Show
          </MenuItem>
        </Menu>
      </div>
      <p className="mb-1 fs-13">{item.message}</p>
      <div className="text-right">
        <Button className="">More</Button>
      </div>
    </Card>
  );
};

export default connect(null, { room_rd })(CardQuestion);
