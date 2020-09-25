import { Button, Card, IconButton } from "@material-ui/core";
import React from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const CardQuestion = ({ item }) => {
  return (
    <Card className="w-100 px-3 py-2 mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex">
          <AccountCircleIcon className="mr-2" />
          <p className="mb-0">{item.name}</p>
        </div>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </div>
      <p className="mb-1 fs-13">{item.message}</p>
      <div className="text-right">
        <Button className="">More</Button>
      </div>
    </Card>
  );
};

export default CardQuestion;
