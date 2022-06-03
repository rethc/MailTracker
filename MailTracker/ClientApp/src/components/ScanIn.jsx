import {
  Typography,
  Container,
  Grid,
  Paper,
  CssBaseline,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  MenuItem,
  Snackbar
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import createAPIEndpoint from "../api";
import { format, zonedTimeToUtc } from "date-fns-tz";
import { parseISO } from "date-fns"; 
import Copyright from "./Copyright";   

const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

//New External Mail Object
const initialValues = {
  mailType: "Incoming",
  trackingNumber: "",
  productType: "",
  dateCreated: new Date(),
};

export default function ScanIn() {
  //Scanning In States
  const trackingInput = useRef(); //Autofocus to tracking number field
  const [values, setValues] = useState(initialValues); //initial state for External Mail Object
  const [isLoading, setLoading] = useState(true); //loading spinner
  const [mailList, setMailList] = useState([]);
  const products = ["Passports", "BDM", "Citizenship", "Other"]; 
  

  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

   const [open, setOpen] = React.useState(false);

  //Display Empty rows to fill table
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, mailList.length - page * rowsPerPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    getMailList();
  }, []);

  const getMailList = () => {
    createAPIEndpoint("ExternalMails")
      .fetchAll()
      .then((res) => {
        setMailList(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }; 

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    };
 
  async function handleSubmit(e) {
    e.preventDefault();
    //Create new object
    let item = {
      mailType: values.mailType,
      trackingNo: values.trackingNumber,
      dateCreated: values.dateCreated,
      productType: values.productType,
    };
    //Add to db
    await createAPIEndpoint("ExternalMails").create(item);
    //Refresh list
    getMailList();
    values.trackingNumber = "";
    setOpen(true);
    trackingInput.current.focus();
  }

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
              <Typography variant="h6">Scan Incoming Mail</Typography>

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
                      sx={{
                        mt: 2,
                        mb: 2,
                      }}
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
                      variant="outlined"
                      label="Tracking Number"
                      name="trackingNumber"
                      value={values.trackingNumber}
                      onChange={handleInputChange}
                      inputRef={trackingInput}
                      fullWidth
                      sx={{
                        mt: 2,
                        mb: 2,
                      }}
                    />
                  </Grid>
                </Grid>
                  <button
                  hidden
                    onClick={handleSubmit}
                    type="submit"
                  /> 
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
              <Typography variant="h6">Recent Scanned Mail</Typography>
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
                            {m.trackingNo.length > 30
                              ? `${m.trackingNo.substring(0, 30)}...`
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
                rowsPerPageOptions={[5, 10, 25]}
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
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={1000}
          message="Mail scanned in"
          open={open}
          onClose={handleClose}
        />
      </Container>
    </Box>
  );
}
