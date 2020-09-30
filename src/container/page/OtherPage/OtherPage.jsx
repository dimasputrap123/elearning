import React from "react";
import { useHistory } from "react-router-dom";

const OtherPage = () => {
  const history = useHistory();
  return (
    <div>
      <h1
        onClick={() => {
          history.push("/rest");
        }}
      >
        Other Page
      </h1>
    </div>
  );
};

export default OtherPage;
