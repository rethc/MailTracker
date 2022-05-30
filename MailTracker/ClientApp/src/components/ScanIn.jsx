import { Typography, Container, Grid, Paper, CssBaseline,  TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { Box } from '@mui/system';
import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";  
import createAPIEndpoint from "../api";  
import { format, utcToZonedTime } from "date-fns-tz"; 
import { parseISO } from "date-fns";
import enNZ from "date-fns/locale/en-NZ";

const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const initialValues = {
  mailType: "Mail In",
  trackingNumber: "",
  dateCreated: new Date()
};
 
export default function ScanIn() {

  //Scanning In
  const trackingInput = useRef();
  const [values, setValues] = useState(initialValues); 
  const [mailList, setMailList] = useState([]);

  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const formatInTimeZone = (date, fmt, tz) =>
    format(utcToZonedTime(date, tz), fmt, { timeZone: tz });

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, mailList.length - page * rowsPerPage);


   useEffect(() => {
     getMailList();
   }, []);

     const getMailList = () => {
       createAPIEndpoint("ExternalMails")
         .fetchAll()
         .then((res) => {
           setMailList(res.data);
           console.log(res.data);
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

  async function handleSubmit(e) {
    e.preventDefault();

    //Create new object
    let item = {
      mailType: values.mailType,
      trackingNo: values.trackingNumber,
      dateCreated: values.dateCreated,
    };
    //Add to db
    await createAPIEndpoint("ExternalMails").create(item);
    await getMailList();
    values.trackingNumber = "";
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
              <Typography variant="h6">Scan Mail In</Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  autoFocus
                  variant="outlined"
                  label="Tracking Number"
                  name="trackingNumber"
                  value={values.trackingNumber}
                  onChange={handleInputChange}
                  inputRef={trackingInput}
                  sx={{
                    width: "100%",
                    marginTop: "10px",
                    marginBottom: "15px",
                  }}
                />

                <center>
                  <Button variant="contained" onClick={handleSubmit}>
                    Save Mail
                  </Button>
                </center>
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tracking Number</TableCell>
                    <TableCell>Mail Type</TableCell>
                    <TableCell>Date Scanned</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mailList
                    .slice()
                    .reverse()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((m) => (
                      <TableRow key={m.externalMailID}>
                        {/* If tracking number is longer than 30 characters, truncate and apend ...*/}
                        <TableCell>
                          {m.trackingNo.length > 30
                            ? `${m.trackingNo.substring(0, 30)}...`
                            : m.trackingNo}
                        </TableCell>
                        <TableCell>{m.mailType}</TableCell>
                        <TableCell>
                          {formatInTimeZone(
                            parseISO(m.dateCreated),
                            "dd/MM/yyyy,  kk:mm",
                            "Pacific/Auckland",  
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
      </Container>
    </Box>
  );
}; 