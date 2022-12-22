import {
  Container,
  Grid,
  Paper,
  CssBaseline,
  TextField,
  CircularProgress,
  Box,
  styled,
} from "@mui/material"; 
import React, { useState, useEffect } from "react";
import Copyright from "./Copyright";
import Title from "./Title";
import api from "../services/api";
import RecentScanned from "./RecentScanned"; 
import Sail from "../components/sailbg.webp";  

export default function ScanOut() {
  //New External Mail Object
  const initialMailRecord = {
    mailType: "Outgoing",
    trackingNumber: "",
    productType: "",
    dateCreated: new Date(),
  };
  //initial state for External Mail Object
  const [mailValue, setMailValue] = useState(initialMailRecord);
  const [isLoading, setLoading] = useState(true); //loading spinner
  const [mailList, setMailList] = useState([]); //MailList
  const [errTrackingNo, setErrTrackingNo] = useState(false); //product error handling

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

  //Event handler for submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { ...mailValue };
    setMailValue({ ...mailValue, trackingNumber: "" });
    let item = {
      mailType: "Outgoing",
      trackingNo: data.trackingNumber,
      dateCreated: new Date(),
      productType: "",
    };
    if (item.trackingNo) setErrTrackingNo(false);
    await api("ExternalMails")
      .create(item)
      .catch((error) => {
        window.alert(error.response.data.errors.TrackingNo);
        console.log(error.response.data.errors);
        if (!item.trackingNo) setErrTrackingNo(true);
      });
    fetchData();
  };

  const SailImg = styled("img")({
    backgroundRepeat: "no-repeat",
    position: "fixed",
    bottom: 0,
    right: 0,
    width: "30vw",
    height: "auto",
    //Fix blurry Image on transform scale
    transform: "translateZ(0)",
    WebkitBackfaceVisibility: "hidden",  
    filter: "blur(0)", 
    imageRendering: "-webkit-optimize-contrast",
  });
 
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
              <Title>Scan Outgoing Mail</Title>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
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
                      autoComplete="off"
                      value={mailValue.trackingNumber}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
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
                <RecentScanned data={mailList} type={"Outgoing"} />
              )}
            </Paper>
          </Grid>
        </Grid>
        <Copyright />
      </Container>
      <SailImg src={Sail} alt="sail"/>
    </Box>
  );
}
