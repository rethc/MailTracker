import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  LinearProgress,
  Link,
  TableContainer,
} from "@mui/material";
import React, { useState } from "react";
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Title from './Title';
import axios from 'axios';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; 

  import { format, zonedTimeToUtc } from "date-fns-tz";
  import { parseISO } from "date-fns";
import Copyright from "./Copyright";
 
export default function Test() {
  const [value, setValue] = useState();
  const [errSearch, errSetSearch] = useState(false); //error handling
  const [externalValues, setExternalValues] = useState([]);
  const [excelValues, setExcelValues] = useState([]);
  const [isLoading, setLoading] = useState(false); //loading spinner
  const [isHidden, setHidden] = useState(true); //hide elements

  //Event handler for input fields
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };
 
  //Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //If null
    if (!value || value === " " || value.length < 3) {
      errSetSearch(true);
      return;
    }
    
    setLoading(true);
    setHidden(true);

    if (value) errSetSearch(false);
    let item = value;

    // await axios
    //   .post(
    //     "https://prod-08.australiasoutheast.logic.azure.com:443/workflows/b0fbb41399944fa09040746a975325dc/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=rKdhFR1byWlsg_msA_rasGgOFGIbjrMxP3eopRoF-_4",
    //     item
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     setExcelValues(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });

    await axios
      .get(
        "https://mailtrackerapi.azurewebsites.net/api/ExternalMails/search/" +
          value
      )
      .then((res) => {
        setExternalValues(res.data);
      }); 
      setLoading(false);
      setHidden(false);
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingTop: 8, marginLeft: { sm: 30, xs: 0 } }}
    >
      <CssBaseline />
      <Grid2 p={2}>
        <Paper
          sx={{
            p: 2,
          }}
        >
          <Title>Search External and Internal Mail</Title>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              label="Enter Contents Description or Tracking Number"
              name="flows"
              onChange={handleInputChange}
              helperText={
                errSearch ? "The seach term must atleast 3 characters." : ""
              }
              error={errSearch}
              fullWidth
            />
            <Typography paddingTop={1}>
              This allows you to search the{" "}
              <Link
                color="secondary"
                href="https://azurediagovt.sharepoint.com/:x:/r/sites/WellingtonOperations_OPS_SDO/_layouts/15/Doc.aspx?sourcedoc=%7B0CBACD12-92CE-4D5B-81CB-B5BD321F7CA1%7D&file=Internal%20Mail%20Tracker%20Test.xlsx&action=default&mobileredirect=true&cid=65c43643-6705-4eeb-acfc-b40a36c17feb"
                target="_blank"
              >
                Internal Mail Tracker Test spreadsheet
              </Link>{" "}
              and External Mail database at the same time.
              <br />
              The search criteria is <b>Contents Description</b> or
              <b> Tracking Number.</b>
              <br />
              ⚠️ This is still being tested and is using spreadsheet
              data from 17/08/2022.
            </Typography>
            <button hidden onClick={handleSubmit} type="submit" />
          </form>
        </Paper>
      </Grid2>

      {isLoading ? (
        <center>
          <em>Searching Database and running Power Automate...</em>
          <LinearProgress />
        </center>
      ) : (
        <></>
      )}
      {isHidden ? (
        <></>
      ) : (
        <>
  
          <Grid2 sx={{ p: 2 }}>
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">
                  External Mail Results -{" "}
                  {externalValues.length > 0
                    ? externalValues.length + " records"
                    : "no matches"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
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
                      {externalValues &&
                        externalValues.map((m) => (
                          <TableRow key={m.externalMailID}>
                            {/* If tracking number is longer than 30 characters, truncate and append ...*/}
                            <TableCell>
                              {m.trackingNo}
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
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid2>
        </>
      )}
      <Copyright />
    </Box>
  );
}

