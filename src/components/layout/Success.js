import React from "react";
import Alert from "@mui/material/Alert";
import { motion as m } from "framer-motion";

const Success = ({ message }) => {
  return (
    <m.div
      className="absolute"
      initial={{ y: "-300%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-300%" }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <Alert severity="success">{message}</Alert>
    </m.div>
  );
};

export default Success;
