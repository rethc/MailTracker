import { Typography } from "@mui/material";
import React from "react";
export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      paddingTop={4}
      {...props}
    >
      Operations Delivery Mail Tracker v1.3
    </Typography>
  );
}
