import {
  Box,
  CssBaseline,
  Paper,
  Table,
  TableCell,
  TableRow,
  TextField,
  Typography,
  TableBody,
  TableHead,
  TableContainer,
  Grid,
  Container,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import React, { useState } from "react"; 
import Title from './Title';
import axios from 'axios'; 

import { format, zonedTimeToUtc } from "date-fns-tz";
import { parseISO } from "date-fns";
import Copyright from "./Copyright"; 

 
export default function Search() {
  const [value, setValue] = useState("");
  const [notFound, setNotFound] = useState("");
  const [data, setData] = useState([]);

  const [errSearch, errSetSearch] = useState(false); //error handling 
  const [isLoading, setLoading] = useState(false); //loading spinner
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }; 

  //Event handler for input fields
  const handleInputChange = (event) => {
    setValue(event.target.value);
  }; 
   const handleSubmit = async (e) => {
     e.preventDefault();
     //"The search term must at least 3 characters and not contain ONLY spaces
     if (
       !value ||
       value.trim().length === 0 ||
       value.includes("/") ||
       value.includes("\\") ||
       value.length < 3
     ) {
       errSetSearch(true);
       return;
     }
     
     setLoading(true); 
     if (value) errSetSearch(false);

     await axios
       .get(
         "https://mailtrackerapi.azurewebsites.net/api/ExternalMails/search/" +
           value
       )
       .then((res) => {
         setData(res.data);
       })
     setNotFound("No records found with search term: " + value);
     setLoading(false);
   };

  return (
    <Box
      component="main"
      sx={{ marginLeft: { sm: 30, xs: 0 }, paddingTop: { xs: 6, sm: 8 } }}
    >
      <CssBaseline />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Title>Search Incoming/Outgoing Mail</Title>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      helperText={
                        errSearch
                          ? "The search term must at least 3 characters."
                          : ""
                      }
                      error={errSearch}
                      variant="outlined"
                      label="Enter Tracking Number"
                      name="Search"
                      fullWidth
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
              </form>

              {isLoading ? (
                <center>
                  <br />
                  <CircularProgress />
                </center>
              ) : (
                <React.Fragment>
                  {data.length > 0 ? (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Tracking Number</TableCell>
                            <TableCell>Mail Type</TableCell>
                            <TableCell>Product Type</TableCell>
                            <TableCell>Date Scanned</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .reverse()
                            .map((row, index) => (
                              <TableRow key={row.externalMailID}>
                                <TableCell>{row.trackingNo}</TableCell>
                                <TableCell>{row.mailType}</TableCell>
                                <TableCell>{row.productType}</TableCell>
                                <TableCell>
                                  {/* Returns a Date with the UTC time. date-fns-tz library will display the date and time in the local time of the user */}
                                  {format(
                                    zonedTimeToUtc(
                                      parseISO(row.dateCreated),
                                      "UTC"
                                    ),
                                    "dd/MM/yyyy hh:mm aaa"
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableContainer>
                  ) : (
                    <Typography pt={1}>{notFound}</Typography>
                  )}
                </React.Fragment>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Copyright />
      </Container>
    </Box>
  );
}

