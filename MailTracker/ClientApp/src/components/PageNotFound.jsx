import { Box, CssBaseline } from "@mui/material";
import React from "react";

export default function PageNotFound() {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingTop: 10, marginLeft: { sm: 30, xs: 0 } }}
    >
      <CssBaseline />
      <h1>404 Page Not Found</h1>
    </Box>
  );
}
