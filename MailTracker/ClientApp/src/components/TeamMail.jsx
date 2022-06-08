import { CssBaseline, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import createAPIEndpoint from '../api';
import { styled } from "@mui/material/styles";
import { Box, Container } from '@mui/system';
import Copyright from './Copyright';

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
