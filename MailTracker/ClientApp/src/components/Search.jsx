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
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import createAPIEndpoint from "../api";
import { format, parseISO } from "date-fns";
import enNZ from "date-fns/locale/en-NZ";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Copyright from "./Copyright";

const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const initialValues = {
  mailType: "Mail Out",
  trackingNumber: "",
  dateCreated: new Date(),
};

export default function Search() {
  const trackingInput = useRef();
  const [values, setValues] = useState(initialValues);
  const [mailList, setMailList] = useState([]);
  const [mailType, setMailType] = useState("Any");

  const [dateValue, setDateValue] = useState(null);
  {
    new Date();
  }

  const handleDate = (newValue) => {
    setDateValue(newValue);
  };

  //Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelect = (e) => {
    setMailType(e.target.value);
  };

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
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} sx={{ width: "100%" }}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Search Mail</Typography>

              <form onSubmit={handleSubmit}>
                {/* Tracking Number */}
                <TextField
                  variant="outlined"
                  label="Tracking Number"
                  name="trackingNumber"
                  value={values.trackingNumber}
                  onChange={handleInputChange}
                />

                {/* Mail Type */}
                <TextField
                  select
                  variant="outlined"
                  label="Mail Type"
                  name="Mail Type"
                  value={mailType}
                  onChange={handleSelect}
                >
                  <MenuItem key="Any" value="Any">
                    Any
                  </MenuItem>
                  <MenuItem key="Mail In" value="Mail In">
                    Mail In
                  </MenuItem>
                  <MenuItem key="Mail Out" value="Mail Out">
                    Mail Out
                  </MenuItem>
                </TextField>
                {/* Date Picker */}

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    value={dateValue}
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                    label="Search by Date"
                    inputFormat="dd/MM/yyyy"
                  />
                </LocalizationProvider>
                <center>
                  <Button variant="contained" onClick={handleSubmit}>
                    Search
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((m) => (
                      <TableRow key={m.externalMailID}>
                        <TableCell>{m.trackingNo}</TableCell>
                        <TableCell>{m.productType}</TableCell>
                        <TableCell>{m.mailType}</TableCell>
                        <TableCell>
                          {format(
                            parseISO(m.dateCreated),
                            "dd/MM/yyyy,  HH:mm",
                            enNZ
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
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
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
