import { Typography } from "@mui/material";
import React from "react";
export default function Title(props) {
  return (
    <Typography variant="h6" color="primary" gutterBottom {...props}>
      {props.children}
    </Typography>
  );
}
