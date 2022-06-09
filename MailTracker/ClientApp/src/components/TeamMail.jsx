import { CssBaseline, Typography } from '@mui/material';
import React, { } from 'react'
import { styled } from "@mui/material/styles";
import { Box, Container } from '@mui/system'; 

const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function TeamMail(props) { 
  return (
    <Box component="main" sx={{ flexGrow: 1, marginLeft: { sm: 30, xs: 0 } }}>
      <CssBaseline />
      <DrawerHeader />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant='h6'>{props.teamName}</Typography>
      </Container>
    </Box>
  );
}
