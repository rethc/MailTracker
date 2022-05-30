import { Typography, Container, Grid, Paper, CssBaseline,  TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Box } from '@mui/system';
import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";  
import createAPIEndpoint from "../api"; 
import { format, parseISO } from "date-fns";
import nz from "date-fns/locale/en-NZ";

const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const initialValues = {
  mailType: "Mail In",
  trackingNumber: "",
  dateCreated: new Date(),
};

export default function ScanIn() {
  const input1 = useRef();
  const [values, setValues] = useState(initialValues); 
  const [mailList, setMailList] = useState([]);

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
    input1.current.focus(); 
  }

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, marginLeft: { sm: 30, xs: 0 } }}
    >
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
                  inputRef={input1}
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
              <Table sx={{ maxWidth: "100vw" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tracking Number</TableCell>
                    <TableCell>Mail Type</TableCell>
                    <TableCell>Date Scanned</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mailList
                    .slice(0)
                    .reverse()
                    .map((m) => (
                      <TableRow key={m.externalMailID}>
                        <TableCell>{m.externalMailID}</TableCell>
                        {/* If tracking number is longer than 30 characters, truncate and apend ...*/}
                        <TableCell>
                          {m.trackingNo.length > 30
                            ? `${m.trackingNo.substring(0, 30)}...`
                            : m.trackingNo}
                        </TableCell>
                        <TableCell>{m.mailType}</TableCell>
                        <TableCell>
                          {format(
                            parseISO(m.dateCreated),
                            "dd/MM/yyyy,  HH:mm",
                            nz
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}; 