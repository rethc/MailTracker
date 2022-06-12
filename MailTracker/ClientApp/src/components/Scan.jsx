import {
  Typography,
  Container,
  Grid,
  Paper,
  CssBaseline,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { format, zonedTimeToUtc } from "date-fns-tz";
import { parseISO } from "date-fns";
import Copyright from "./Copyright";
import axios from "axios";

export default function Scan(props) {
  //New External Mail Object
  const initialValues = {
    mailType: props.title,
    trackingNumber: "",
    productType: "",
    dateCreated: new Date(),
  };
  //initial state for External Mail Object
  const [values, setValues] = useState(initialValues);
  const [isLoading, setLoading] = useState(true); //loading spinner
  const [mailList, setMailList] = useState([]); //MailList
  const [errProduct, setErrProduct] = useState(false); //product error handling
  const [errTrackingNo, setErrTrackingNo] = useState(false); //product error handling
  const products = [
    "Passport",
    "BDM",
    "Authentication",
    "Citizenship",
    "Other",
  ];

  async function fetchData() {
    const { data } = await axios.get(
      "https://mailtrackerapi.azurewebsites.net/api/ExternalMails/"
    );
    setMailList(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setErrTrackingNo(false); //Tracking number error handling
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setErrTrackingNo(false); //Tracking number error handling
  };

  //Display Empty rows to fill table
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, mailList.length - page * rowsPerPage);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

//Product Type error handling
const prodctBlur = () => {
  if (!values.productType) {
    setErrProduct(true);
    return;
  }
  setErrProduct(false);
  setErrTrackingNo(false); //Tracking number error handling
};

//Tracking Number error handling
const trackingBlur = () => {
  if (!values.trackingNumber) {
    setErrTrackingNo(true);
    return;
  }
  setErrTrackingNo(false);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { ...values };
    setValues({ ...values, trackingNumber: "" });
    let item = {
      mailType: props.title,
      trackingNo: data.trackingNumber,
      dateCreated: new Date(),
      productType: data.productType,
    };
    await axios.post(
      "https://mailtrackerapi.azurewebsites.net/api/ExternalMails/",
      item
    ).catch((error) => {
      if(error.response){
       console.log(JSON.stringify(error.response.data.errors)) 
       if(!item.productType)
       setErrProduct(true);
       if(!item.trackingNo)
       setErrTrackingNo(true);
      }
  });
    fetchData();
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingTop: 8, marginLeft: { sm: 30, xs: 0 } }}
    >
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" color="primary" gutterBottom>
                Scan {props.title} Mail
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      helperText={
                        errProduct ? "The Product Type field is required." : ""
                      }
                      error={errProduct}
                      onBlur={prodctBlur}
                      select
                      variant="outlined"
                      label="Product Type"
                      name="productType"
                      value={values.productType}
                      fullWidth
                      onChange={handleInputChange}
                    >
                      {products.map((product) => (
                        <MenuItem key={product} value={product}>
                          {product}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      autoFocus
                      focused
                      helperText={
                        errTrackingNo ? "The Tracking Number field is required." : ""
                      }
                      error={errTrackingNo}
                      onBlur={trackingBlur}
                      variant="outlined"
                      label="Tracking Number"
                      name="trackingNumber"
                      value={values.trackingNumber}
                      onChange={handleInputChange}
                      fullWidth 
                    />
                  </Grid>
                </Grid>
                <button hidden onClick={handleSubmit} type="submit" />
              </form>
            </Paper>
          </Grid>

          {/* TABLE */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                Recent Scanned Mail
              </Typography>
              {isLoading ? (
                <center>
                  <CircularProgress />
                </center>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tracking Number</TableCell>
                      <TableCell>Product Type</TableCell>
                      <TableCell>Mail Type</TableCell>
                      <TableCell>Date Scanned</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mailList
                      .slice()
                      .reverse()
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((m) => (
                        <TableRow key={m.externalMailID}>
                          {/* If tracking number is longer than 30 characters, truncate and append ...*/}
                          <TableCell>
                            {m.trackingNo.length > 80
                              ? `${m.trackingNo.substring(0, 80)}...`
                              : m.trackingNo}
                          </TableCell>
                          <TableCell>{m.productType}</TableCell>
                          <TableCell>{m.mailType}</TableCell>
                          <TableCell>
                            {/* Returns a Date with the UTC time. date-fns-tz library will display the date and time in the local time of the user */}
                            {format(
                              zonedTimeToUtc(parseISO(m.dateCreated), "UTC"),
                              "dd/MM/yyyy hh:mm aaa"
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
              <TablePagination
                rowsPerPageOptions={[8, 15, 25]}
                component="div"
                count={mailList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
