import {
  CssBaseline,
  Typography,
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  TextField,
  CircularProgress,
  Button,
  Dialog,
  MenuItem,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { format, zonedTimeToUtc } from "date-fns-tz";
import { parseISO } from "date-fns";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HistoryIcon from "@mui/icons-material/History";
import Copyright from "./Copyright";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TeamMail(props) {
  const [dateValue, setDateValue] = useState(new Date());
  const [value, setValue] = React.useState(0);
  const [contents, setContents] = useState("");
  const [pickupPerson, setPickupPerson] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDate = (newValue) => {
    setDateValue(newValue);
  };
  const handleContents = (event) => {
    setContents(event.target.value);
  };

  const handlePerson = (event) => {
    setPickupPerson(event.target.value);
  };

  const [mailList, setMailList] = useState([]);
  const [isLoading, setLoading] = useState(true); //loading spinner

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function fetchData() {
    const { data } = await axios.get(
      "https://mailtrackerapi.azurewebsites.net/api/InternalMails/"
    );
    setMailList(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columnsActive = [
    {
      name: "contents",
      label: "Contents",
      options: {
        sort: true,
      },
    },
    {
      name: "dateEntered",
      label: "Date Entered",
      options: {
        sort: true,
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    customToolbarSelect: () => {
      return (
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            onClick={handleOpen}
            size="large"
            endIcon={<AssignmentIndIcon />}
          >
            Pick up
          </Button>
        </Grid>
      );
    },
    print: false, 
    download: false,
    filter: false,
    viewColumns: false,
  };

   const optionsInactive = {
     filterType: "dropdown",
     customToolbarSelect: () => {
       return (
         <Grid container justify="flex-end">
           <Button
             variant="contained" 
             size="large"
             endIcon={<HistoryIcon />}
           >
             Recall Mail
           </Button>
         </Grid>
       );
     },
     print: false,
     searchOpen: true,
     download: false,
     filter: false,
     viewColumns: false,
   };

  const data = mailList.map((mail) => {
    return {
      contents: mail.contents,
      dateEntered: format(
        zonedTimeToUtc(parseISO(mail.dateEntered), "UTC"),
        "dd/MM/yyyy hh:mm aaa"
      ),
    };
  });

  const style = {
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 3,
  };

  const persons = [
    "Bevan Stephen",
    "David Swanepoel",
    "Brendan Barriball",
    "Tom Roughan",
    "Other",
  ];

      const rows = [
        {
          Contents:
            "Joe Bloggs AG9XXXXXXXXX, Peter Jackson AGXXXXXXXXXXX, Taylor Swift AGXXXXXXXXXXX, Mr Chan AGXXXXXXXXXXX, Te Aroha CGXXXXXXXXXXX,",
          CollectedBy: "David Swanepoel",
          DateEntered: "11/09/2022 10:00am",
          PickedUpDate: "11/09/2022 3:00pm",
          ActionedBy: "Bevan Stephen",
          Status: "Inactive",
        },
        {
          Contents: "RATS surveillance kits",
          CollectedBy: "Brendan Barriball",
          DateEntered: "13/09/2022 7:35am",
          PickedUpDate: "13/09/2022 8:15am",
          ActionedBy: "Bevan Stephen",
          Status: "Inactive",
        },
        {
          Contents:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          CollectedBy: "Brendan Barriball",
          DateEntered: "13/09/2022 7:35am",
          PickedUpDate: "13/09/2022 8:15am",
          ActionedBy: "Bevan Stephen",
          Status: "Inactive",
        },
        {
          Contents:
            "Rrow itself, let it be sorrow; let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust. He ejjnoyes, in order that somewon, also with a severe one, unless of life. May a cusstums offficer somewon nothing of a poison-filled. Until, from a twho, twho chaffinch may also pursue it, not even a lump. But as twho, as a tank; a proverb, yeast; or else they tinscribe nor. Yet yet dewlap bed. Twho may be, let him love fellows of a polecat. Now amour, the, twhose being, drunk, yet twhitch and, an enclosed valley’s always a laugh. In acquisitiendum the Furies are Earth; in (he takes up) a lump vehicles bien",
          CollectedBy: "Brendan Barriball",
          DateEntered: "13/09/2022 7:35am",
          PickedUpDate: "13/09/2022 8:15am",
          ActionedBy: "Bevan Stephen",
          Status: "Inactive",
        },
      ];

const columsInactive = [
  {
    name: "Contents",
    label: "Contents",
    options: {
      sort: true,
    },
  },
  {
    name: "CollectedBy",
    label: "Collected By",
    options: {
      sort: true,
    },
  },
  {
    name: "PickedUpDate",
    label: "Date Picked Up",
    options: {
      sort: true,
    },
  },
  {
    name: "ActionedBy",
    label: "Actioned By",
    options: {
      sort: true,
    },
  },
  {
    name: "DateEntered",
    label: "Date Entered",
    options: {
      sort: true,
    },
  },
  {
    name: "Status",
    label: "Status",
    options: {
      sort: true,
    },
  },
];

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingTop: 8, marginLeft: { sm: 30, xs: 0 } }}
    >
      <CssBaseline />
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs"
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Mail Awaiting to be picked up" {...a11yProps(0)} />
          <Tab label="Collected Mail" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.teamName} Mail - xxx items selected
            </Typography>
            <Grid container spacing={1} mt={1}>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Date Picked Up"
                    inputFormat="dd/MM/yyyy"
                    value={dateValue}
                    onChange={handleDate}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  variant="outlined"
                  label="Picked up by"
                  name="Person"
                  value={pickupPerson}
                  fullWidth
                  onChange={handlePerson}
                >
                  {persons.map((person) => (
                    <MenuItem key={person} value={person}>
                      {person}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2} mt={1}>
                <Button variant="contained" onClick={handleOpen}>
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Dialog>
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
                {"Record " + props.teamName + " Mail"}
              </Typography>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Date Entered"
                        inputFormat="dd/MM/yyyy"
                        value={dateValue}
                        onChange={handleDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={10}>
                    <TextField
                      autoFocus
                      focused
                      variant="outlined"
                      label="Contents Description"
                      name="Contents Description"
                      value={contents}
                      onChange={handleContents}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={12} paddingTop={2}>
          {isLoading ? (
            <center>
              Loading...
              <br />
              <CircularProgress />
            </center>
          ) : (
            <MUIDataTable
              title={props.teamName + " Mail to be picked up"}
              data={data}
              columns={columnsActive}
              options={options}
            />
          )}
        </Grid>
        <Copyright />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MUIDataTable
          title={props.teamName}
          data={rows}
          columns={columsInactive}
          options={optionsInactive}
        />
        <Copyright />
      </TabPanel>
    </Box>
  );
}
