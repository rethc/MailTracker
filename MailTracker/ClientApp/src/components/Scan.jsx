import {
  Container,
  Grid,
  Paper,
  CssBaseline,
  TextField,
  MenuItem,
  CircularProgress,
  Box,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Copyright from "./Copyright";
import Title from "./Title";
import api from "../services/api";
import RecentScanned from "./RecentScanned";

export default function Scan() {
  //New External Mail Object
  const initialMailRecord = {
    mailType: "Incoming",
    trackingNumber: "",
    productType: "",
    dateCreated: new Date(),
  };
  //initial state for External Mail Object
  const [mailValue, setMailValue] = useState(initialMailRecord);
  const [isLoading, setLoading] = useState(true); //loading spinner
  const [mailList, setMailList] = useState([]); //MailList array
  const [errProduct, setErrProduct] = useState(false); //ProductType error handling
  const [errTrackingNo, setErrTrackingNo] = useState(false); //TrackingNo error handling
  const [open, setOpen] = useState(true); //open dialog
  const products = [
    "Passport",
    "BDM",
    "Authentication",
    "Citizenship",
    "Other",
  ];

  //Get the recent scanned mail
  async function fetchData() {
    await api("ExternalMails/GetLastMail/7")
      .getMail()
      .then((res) => {
        setMailList(res.data);
        setLoading(false);
      })
      //Display error in console log and browser window alert
      .catch((err) => { 
        console.log(JSON.stringify(err.response.data.errors));
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  //Event handler for input fields
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setMailValue({
      ...mailValue,
      [name]: value,
    });
  };

 const scanRef = React.createRef();

   const handleClose = () => {
     setOpen(false);  
   };

   const handleOpen = () => {
     setOpen(true); 
   };

  //Event handler for submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { ...mailValue };
    setMailValue({ ...mailValue, trackingNumber: "" });
    let item = {
      mailType: "Incoming",
      trackingNo: data.trackingNumber,
      dateCreated: new Date(),
      productType: data.productType,
    };

    //Form validation if Product or Tracking Field are blank
    if (!item.productType) {
      setErrProduct(true);
      return;
    }
    if (item.trackingNo) setErrTrackingNo(false);
    if (item.productType) setErrProduct(false);
    
    await api("ExternalMails")
      .create(item)
      .catch((error) => {
        window.alert(error.response.data.errors.TrackingNo);
        console.log(error.response.data.errors);
        if (!item.trackingNo) setErrTrackingNo(true);
      });
    fetchData();
  };

  

  return (
    <Box
      component="main"
      sx={{ marginLeft: { sm: 30, xs: 0 }, paddingTop: { xs: 6, sm: 8 } }}
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
                  <Grid item xs={mailValue.productType ? 6 : 12}>
                    <FormControl fullWidth>
                      <InputLabel id="select-product-label">
                        Product Type
                      </InputLabel>
                      <Select
                        labelId="select-product-label"
                        id="controlled-select-product-label"
                        error={errProduct}
                        variant="outlined"
                        name="productType"
                        label="Product Type"
                        value={mailValue.productType}
                        fullWidth
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        onChange={handleInputChange}
                      >
                        {products.map((product) => (
                          <MenuItem key={product} value={product}>
                            {product}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {mailValue.productType ? (
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
                        value={mailValue.trackingNumber}
                        onChange={handleInputChange}
                        fullWidth
                        inputRef={scanRef}
                      />
                    </Grid>
                  ) : (
                    ""
                  )}
                </Grid>
                <button hidden onClick={handleSubmit} type="submit" />
              </form>
            </Paper>
          </Grid>

          {/* Recent Mail Table */}
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
                  <CircularProgress color="secondary" />
                </center>
              ) : (
                <RecentScanned data={mailList} type={"Incoming"} />
              )}
            </Paper>
          </Grid>
        </Grid>
        <Copyright />
      </Container>
    </Box>
  );
}