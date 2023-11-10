import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-20 ">
      <CircularProgress className="scale-150" />
      <CircularProgress className="scale-150" />
      <CircularProgress className="scale-150" />
    </div>
  );
};

export default Loader;
