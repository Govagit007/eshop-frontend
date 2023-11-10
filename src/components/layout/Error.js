import React from "react";
import Alert from "@mui/material/Alert";

const Error = ({ error }) => {
  return (
    <Alert severity="error" className="absolute top-0">
      {error}
    </Alert>
  );
};

export default Error;
