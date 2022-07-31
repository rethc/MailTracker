import { CssBaseline, Typography, Box, Container } from "@mui/material";
import React from "react";

export default function TeamMail(props) {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingTop: 7, marginLeft: { sm: 30, xs: 0 } }}
    >
      <CssBaseline />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6">{props.teamName}</Typography>
      </Container>
    </Box>
  );
}
