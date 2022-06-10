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
  IconButton,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react"; 
import { format, zonedTimeToUtc } from "date-fns-tz";
import { parseISO } from "date-fns";
import Copyright from "./Copyright";
import DrawerHeader from "./DrawerHeader";
import RefreshIcon from "@mui/icons-material/Refresh";
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
  const [lastScanned, setLastScanned] = useState(values.lastScanned | null);
  const [isLoading, setLoading] = useState(true); //loading spinner
  const [mailList, setMailList] = useState([]); //MailList
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
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Display Empty rows to fill table
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, mailList.length - page * rowsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let item = {
      mailType: props.title,
      trackingNo: values.trackingNumber,
      dateCreated: new Date(),
      productType: values.productType,
    }; 
    axios.post("https://mailtrackerapi.azurewebsites.net/api/ExternalMails/", item);
    setLastScanned(values.trackingNumber);
    values.trackingNumber = ""; 
    fetchData();
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, marginLeft: { sm: 30, xs: 0 } }}>
      <CssBaseline />
      <DrawerHeader />
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
                      variant="outlined"
                      label="Tracking Number"
                      name="trackingNumber"
                      value={values.trackingNumber}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="body1" sx={{ ml: 3, mt: 1 }}>
                        Last scanned:{" "}
                        <b>
                          {lastScanned.length > 0 &&
                            values.productType.length > 0 &&
                            lastScanned}
                        </b>
                      </Typography>
                    </Grid>
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
              <Stack direction="row" justifyContent="space-between" >
                <Typography variant="h6" color="primary" sx={{ mb: 1}}>
                  Recent Scanned Mail
                </Typography>
                {lastScanned.length > 0 &&    
                  <IconButton
                    aria-label="refreshicon"
                    color="secondary"
                    onClick={() => {
                      fetchData();
                      setLastScanned("");
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                }
              </Stack>
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
                rowsPerPageOptions={[7, 15, 25]}
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