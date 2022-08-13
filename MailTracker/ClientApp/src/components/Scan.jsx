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
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { format, zonedTimeToUtc } from "date-fns-tz";
import { parseISO } from "date-fns";
import Copyright from "./Copyright";
import axios from "axios";
import Title from "./Title";

export default function Scan() {
  //New External Mail Object
  const initialValues = {
    mailType: "Incoming",
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

  //http://localhost:5243/api/
  async function fetchData() {
    const { data } = await axios.get(
      "https://mailtrackerapi.azurewebsites.net/api/ExternalMails/GetLastMail/7"
    );
    setMailList(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { ...values };
    setValues({ ...values, trackingNumber: "" });
    let item = {
      mailType: "Incoming",
      trackingNo: data.trackingNumber,
      dateCreated: new Date(),
      productType: data.productType,
    };
    if(!item.productType){
       setErrProduct(true);
       return;
    }
    if (item.trackingNo) setErrTrackingNo(false);
    if (item.productType) setErrProduct(false);
    await axios
      .post("https://mailtrackerapi.azurewebsites.net/api/ExternalMails/", item)
      .catch((error) => {
        if (error.response) {
          console.log(JSON.stringify(error.response.data.errors));

          if (!item.trackingNo) setErrTrackingNo(true);
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
              <Title>Scan Incoming Mail</Title>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      helperText={
                        errProduct ? "The Product Type field is required." : ""
                      }
                      error={errProduct}
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
                        errTrackingNo
                          ? "The Tracking Number field is required."
                          : ""
                      }
                      error={errTrackingNo}
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
              <Title>Recent Scanned Mail</Title>
              {isLoading ? (
                <center>
                  <CircularProgress />
                </center>
              ) : (
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
                    {mailList.map((m) => (
                      <TableRow key={m.externalMailID}>
                        {/* If tracking number is longer than 30 characters, truncate and append ...*/}
                        <TableCell>
                          {m.trackingNo.length > 80
                            ? `${m.trackingNo.substring(0, 80)}...`
                            : m.trackingNo}
                        </TableCell>
                        <TableCell>{m.mailType}</TableCell>
                        <TableCell>{m.productType}</TableCell>
                        <TableCell>
                          {/* Returns a Date with the UTC time. date-fns-tz library will display the date and time in the local time of the user */}
                          {format(
                            zonedTimeToUtc(parseISO(m.dateCreated), "UTC"),
                            "dd/MM/yyyy hh:mm aaa"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
