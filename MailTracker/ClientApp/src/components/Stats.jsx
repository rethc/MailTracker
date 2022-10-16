import {
  CssBaseline,
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  CardActions,
  Divider,
  TextField,
  MenuItem, 
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
} from "recharts";

export default function Reports() {
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState();
  const [isLoading, setLoading] = useState(true); //loading spinner

   const [chart, setChart] = React.useState(2);

   const handleChange = (event) => {
     setChart(event.target.value);
   };

  async function fetchIncoming() {
    const { data } = await axios.get(
      "https://mailtrackerapi.azurewebsites.net/api/ExternalMails/GetMails/Incoming"
    );
    setIncoming(data);
  }

  async function fetchOutgoing() {
    const { data } = await axios.get(
      "https://mailtrackerapi.azurewebsites.net/api/ExternalMails/GetMailCount/Outgoing"
    );
    setOutgoing(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchIncoming();
    fetchOutgoing();
  }, []);

  
const augustIncomingData = [
  {
    name: "01/08/2022",
    Other: 39,
    Passport: 178,
    Authentication: 3,
    BDM: 3,
    Citizenship: 4,
  },
  {
    name: "02/08/2022",
    Other: 64,
    Passport: 122,
    Authentication: 49,
    BDM: 5,
    Citizenship: 57,
  },
  {
    name: "03/08/2022",
    Other: 65,
    Passport: 110,
    Authentication: 43,
    BDM: 38,
    Citizenship: 54,
  },
  {
    name: "04/08/2022",
    Other: 42,
    Passport: 180,
    Authentication: 5,
    BDM: 26,
    Citizenship: 3,
  },
  {
    name: "05/08/2022",
    Other: 36,
    Passport: 94,
    Authentication: 40,
    BDM: 34,
    Citizenship: 33,
  },
  {
    name: "08/08/2022",
    Other: 65,
    Passport: 118,
    Authentication: 47,
    BDM: 29,
    Citizenship: 55,
  },
  {
    name: "09/08/2022",
    Other: 39,
    Passport: 58,
    Authentication: 33,
    BDM: 24,
    Citizenship: 26,
  },
  {
    name: "10/08/2022",
    Other: 47,
    Passport: 127,
    Authentication: 64,
    BDM: 58,
    Citizenship: 43,
  },
  {
    name: "11/08/2022",
    Other: 63,
    Passport: 93,
    Authentication: 51,
    BDM: 26,
    Citizenship: 21,
  },
  {
    name: "12/08/2022",
    Other: 51,
    Passport: 76,
    Authentication: 31,
    BDM: 11,
    Citizenship: 29,
  },
  {
    name: "15/08/2022",
    Other: 76,
    Passport: 115,
    Authentication: 60,
    BDM: 41,
    Citizenship: 43,
  },
  {
    name: "16/08/2022",
    Other: 33,
    Passport: 80,
    Authentication: 30,
    BDM: 10,
    Citizenship: 27,
  },
  {
    name: "17/08/2022",
    Other: 84,
    Passport: 89,
    Authentication: 24,
    BDM: 18,
    Citizenship: 22,
  },
  {
    name: "18/08/2022",
    Other: 273,
    Passport: 83,
    Authentication: 47,
    BDM: 17,
    Citizenship: 30,
  },
  {
    name: "19/08/2022",
    Other: 53,
    Passport: 56,
    Authentication: 35,
    BDM: 26,
    Citizenship: 23,
  },
  {
    name: "22/08/2022",
    Other: 39,
    Passport: 53,
    Authentication: 31,
    BDM: 34,
    Citizenship: 26,
  },
  {
    name: "23/08/2022",
    Other: 30,
    Passport: 68,
    Authentication: 36,
    BDM: 23,
    Citizenship: 26,
  },
  {
    name: "24/08/2022",
    Other: 33,
    Passport: 23,
    Authentication: 54,
    BDM: 24,
    Citizenship: 53,
  },
  {
    name: "25/08/2022",
    Other: 81,
    Passport: 84,
    Authentication: 47,
    BDM: 24,
    Citizenship: 0,
  },
  {
    name: "26/08/2022",
    Other: 33,
    Passport: 45,
    Authentication: 29,
    BDM: 30,
    Citizenship: 27,
  },
  {
    name: "29/08/2022",
    Other: 63,
    Passport: 74,
    Authentication: 53,
    BDM: 28,
    Citizenship: 39,
  },
  {
    name: "30/08/2022",
    Other: 73,
    Passport: 47,
    Authentication: 34,
    BDM: 13,
    Citizenship: 21,
  },
  {
    name: "31/08/2022",
    Other: 44,
    Passport: 94,
    Authentication: 33,
    BDM: 34,
    Citizenship: 12,
  },
];
 const augustOutgoingData = [
   {
     name: "01/08/2022",
     Outgoing: 1584,
   },
   {
     name: "02/08/2022",
     Outgoing: 1829,
   },
   {
     name: "03/08/2022",
     Outgoing: 2023,
   },
   {
     name: "04/08/2022",
     Outgoing: 1831,
   },
   {
     name: "05/08/2022",
     Outgoing: 1998,
   },
   {
     name: "08/08/2022",
     Outgoing: 2173,
   },
   {
     name: "09/08/2022",
     Outgoing: 2021,
   },
   {
     name: "10/08/2022",
     Outgoing: 1724,
   },
   {
     name: "11/08/2022",
     Outgoing: 2098,
   },
   {
     name: "12/08/2022",
     Outgoing: 1855,
   },
   {
     name: "15/08/2022",
     Outgoing: 2311,
   },
   {
     name: "16/08/2022",
     Outgoing: 2241,
   },
   {
     name: "17/08/2022",
     Outgoing: 2340,
   },
   {
     name: "18/08/2022",
     Outgoing: 2372,
   },
   {
     name: "19/08/2022",
     Outgoing: 1885,
   },
   {
     name: "22/08/2022",
     Outgoing: 1955,
   },
   {
     name: "23/08/2022",
     Outgoing: 2224,
   },
   {
     name: "24/08/2022",
     Outgoing: 1676,
   },
   {
     name: "25/08/2022",
     Outgoing: 1775,
   },
   {
     name: "26/08/2022",
     Outgoing: 1781,
   },
   {
     name: "29/08/2022",
     Outgoing: 2550,
   },
   {
     name: "30/08/2022",
     Outgoing: 2340,
   },
   {
     name: "31/08/2022",
     Outgoing: 1591,
   },
 ];

  const julyIncomingData = [
    {
      name: "01/07/2022",
      Other: 103,
      Passport: 82,
      Authentication: 0,
      BDM: 0,
      Citizenship: 29,
    },
    {
      name: "04/07/2022",
      Other: 50,
      Passport: 2,
      Authentication: 0,
      BDM: 0,
      Citizenship: 0,
    },
    {
      name: "05/07/2022",
      Other: 41,
      Passport: 125,
      Authentication: 33,
      BDM: 17,
      Citizenship: 35,
    },
    {
      name: "06/07/2022",
      Other: 65,
      Passport: 77,
      Authentication: 55,
      BDM: 36,
      Citizenship: 39,
    },
    {
      name: "07/07/2022",
      Other: 249,
      Passport: 161,
      Authentication: 0,
      BDM: 28,
      Citizenship: 38,
    },
    {
      name: "08/07/2022",
      Other: 32,
      Passport: 166,
      Authentication: 0,
      BDM: 0,
      Citizenship: 0,
    },
    {
      name: "11/07/2022",
      Other: 62,
      Passport: 80,
      Authentication: 0,
      BDM: 0,
      Citizenship: 0,
    },
    {
      name: "12/07/2022",
      Other: 44,
      Passport: 103,
      Authentication: 40,
      BDM: 21,
      Citizenship: 35,
    },
    {
      name: "13/07/2022",
      Other: 134,
      Passport: 1,
      Authentication: 0,
      BDM: 0,
      Citizenship: 0,
    },
    {
      name: "14/07/2022",
      Other: 475,
      Passport: 94,
      Authentication: 60,
      BDM: 29,
      Citizenship: 0,
    },
    {
      name: "15/07/2022",
      Other: 58,
      Passport: 78,
      Authentication: 30,
      BDM: 24,
      Citizenship: 27,
    },
    {
      name: "18/07/2022",
      Other: 73,
      Passport: 220,
      Authentication: 0,
      BDM: 0,
      Citizenship: 0,
    },
    {
      name: "19/07/2022",
      Other: 87,
      Passport: 82,
      Authentication: 35,
      BDM: 22,
      Citizenship: 31,
    },
    {
      name: "20/07/2022",
      Other: 36,
      Passport: 95,
      Authentication: 48,
      BDM: 32,
      Citizenship: 46,
    },
    {
      name: "21/07/2022",
      Other: 56,
      Passport: 0,
      Authentication: 3,
      BDM: 1,
      Citizenship: 21,
    },
    {
      name: "22/07/2022",
      Other: 22,
      Passport: 72,
      Authentication: 40,
      BDM: 21,
      Citizenship: 25,
    },
    {
      name: "25/07/2022",
      Other: 45,
      Passport: 230,
      Authentication: 0,
      BDM: 0,
      Citizenship: 0,
    },
    {
      name: "26/07/2022",
      Other: 492,
      Passport: 76,
      Authentication: 0,
      BDM: 0,
      Citizenship: 92,
    },
    {
      name: "27/07/2022",
      Other: 53,
      Passport: 164,
      Authentication: 0,
      BDM: 0,
      Citizenship: 0,
    },
    {
      name: "28/07/2022",
      Other: 24,
      Passport: 147,
      Authentication: 40,
      BDM: 12,
      Citizenship: 28,
    },
    {
      name: "29/07/2022",
      Other: 47,
      Passport: 106,
      Authentication: 67,
      BDM: 39,
      Citizenship: 28,
    },
  ];
  const julyOutgoingData = [
    {
      name: "01/07/2022",
      Outgoing: 1140,
    },
    {
      name: "04/07/2022",
      Outgoing: 1247,
    },
    {
      name: "05/07/2022",
      Outgoing: 1334,
    },
    {
      name: "06/07/2022",
      Outgoing: 1300,
    },
    {
      name: "07/07/2022",
      Outgoing: 1698,
    },
    {
      name: "08/07/2022",
      Outgoing: 1291,
    },
    {
      name: "11/07/2022",
      Outgoing: 3357,
    },
    {
      name: "12/07/2022",
      Outgoing: 2026,
    },
    {
      name: "13/07/2022",
      Outgoing: 2379,
    },
    {
      name: "14/07/2022",
      Outgoing: 1572,
    },
    {
      name: "15/07/2022",
      Outgoing: 3131,
    },
    {
      name: "18/07/2022",
      Outgoing: 2955,
    },
    {
      name: "19/07/2022",
      Outgoing: 1823,
    },
    {
      name: "20/07/2022",
      Outgoing: 1814,
    },
    {
      name: "21/07/2022",
      Outgoing: 2047,
    },
    {
      name: "22/07/2022",
      Outgoing: 1728,
    },
    {
      name: "25/07/2022",
      Outgoing: 2656,
    },
    {
      name: "26/07/2022",
      Outgoing: 1662,
    },
    {
      name: "27/07/2022",
      Outgoing: 2651,
    },
    {
      name: "28/07/2022",
      Outgoing: 2405,
    },
    {
      name: "29/07/2022",
      Outgoing: 1948,
    },
  ];

  const chartOptions = [
    {
      value: 0,
      label: "July 2022",
    },
    {
      value: 1,
      label: "August 2022",
    },
    {
      value: 2,
      label: "September 2022",
    },
  ];

  const sepIncomingData = [
    {
      name: "01/09/2022",
      Other: 62,
      Passport: 76,
      Authentication: 40,
      BDM: 28,
      Citizenship: 28,
    },
    {
      name: "02/09/2022",
      Other: 38,
      Passport: 63,
      Authentication: 30,
      BDM: 14,
      Citizenship: 35,
    },
    {
      name: "05/09/2022",
      Other: 143,
      Passport: 46,
      Authentication: 53,
      BDM: 29,
      Citizenship: 57,
    },
    {
      name: "06/09/2022",
      Other: 144,
      Passport: 75,
      Authentication: 0,
      BDM: 22,
      Citizenship: 24,
    },
    {
      name: "07/09/2022",
      Other: 57,
      Passport: 103,
      Authentication: 33,
      BDM: 33,
      Citizenship: 30,
    },
    {
      name: "08/09/2022",
      Other: 47,
      Passport: 74,
      Authentication: 28,
      BDM: 29,
      Citizenship: 26,
    },
    {
      name: "09/09/2022",
      Other: 51,
      Passport: 89,
      Authentication: 28,
      BDM: 35,
      Citizenship: 27,
    },
    {
      name: "12/09/2022",
      Other: 82,
      Passport: 116,
      Authentication: 38,
      BDM: 0,
      Citizenship: 36,
    },
    {
      name: "13/09/2022",
      Other: 66,
      Passport: 71,
      Authentication: 16,
      BDM: 16,
      Citizenship: 41,
    },
    {
      name: "14/09/2022",
      Other: 59,
      Passport: 76,
      Authentication: 27,
      BDM: 1,
      Citizenship: 66,
    },
    {
      name: "15/09/2022",
      Other: 55,
      Passport: 56,
      Authentication: 34,
      BDM: 17,
      Citizenship: 27,
    },
    {
      name: "16/09/2022",
      Other: 37,
      Passport: 79,
      Authentication: 37,
      BDM: 21,
      Citizenship: 33,
    },
    {
      name: "19/19/2022",
      Other: 43,
      Passport: 85,
      Authentication: 43,
      BDM: 31,
      Citizenship: 45,
    },
    {
      name: "20/09/2022",
      Other: 65,
      Passport: 80,
      Authentication: 23,
      BDM: 36,
      Citizenship: 28,
    },
    {
      name: "21/09/2022",
      Other: 45,
      Passport: 61,
      Authentication: 35,
      BDM: 23,
      Citizenship: 38,
    },
    {
      name: "22/09/2022",
      Other: 38,
      Passport: 87,
      Authentication: 20,
      BDM: 32,
      Citizenship: 2,
    },
    {
      name: "23/09/2022",
      Other: 44,
      Passport: 76,
      Authentication: 19,
      BDM: 18,
      Citizenship: 26,
    },
    {
      name: "27/09/2022",
      Other: 39,
      Passport: 81,
      Authentication: 39,
      BDM: 20,
      Citizenship: 23,
    },
    {
      name: "28/09/2022",
      Other: 43,
      Passport: 15,
      Authentication: 31,
      BDM: 31,
      Citizenship: 29,
    },
    {
      name: "29/09/2022",
      Other: 62,
      Passport: 105,
      Authentication: 37,
      BDM: 32,
      Citizenship: 31,
    },
    {
      name: "30/09/2022",
      Other: 43,
      Passport: 70,
      Authentication: 33,
      BDM: 13,
      Citizenship: 31,
    },
  ]; 

  const sepOutgoingData = [
    {
      name: "01/09/2022",
      Outgoing: 1467,
    },
    {
      name: "02/09/2022",
      Outgoing: 2848,
    },
    {
      name: "05/09/2022",
      Outgoing: 2725,
    },
    {
      name: "06/09/2022",
      Outgoing: 2219,
    },
    {
      name: "07/09/2022",
      Outgoing: 1653,
    },
    {
      name: "08/09/2022",
      Outgoing: 2052,
    },
    {
      name: "09/09/2022",
      Outgoing: 1869,
    },
    {
      name: "12/09/2022",
      Outgoing: 1940,
    },
    {
      name: "13/09/2022",
      Outgoing: 1915,
    },
    {
      name: "14/09/2022",
      Outgoing: 1752,
    },
    {
      name: "15/09/2022",
      Outgoing: 1579,
    },
    {
      name: "16/09/2022",
      Outgoing: 1491,
    },
    {
      name: "19/19/2022",
      Outgoing: 2424,
    },
    {
      name: "20/09/2022",
      Outgoing: 1934,
    },
    {
      name: "21/09/2022",
      Outgoing: 2353,
    },
    {
      name: "22/09/2022",
      Outgoing: 2101,
    },
    {
      name: "23/09/2022",
      Outgoing: 2374,
    },
    {
      name: "27/09/2022",
      Outgoing: 1869,
    },
    {
      name: "28/09/2022",
      Outgoing: 1704,
    },
    {
      name: "29/09/2022",
      Outgoing: 1440,
    },
    {
      name: "30/09/2022",
      Outgoing: 1249,
    },
  ];

  return (
    <Box
      component="main"
      sx={{ display: "flex", paddingTop: 7, marginLeft: { sm: 30, xs: 0 } }}
    >
      <CssBaseline />
      <Grid container spacing={3} height={"calc(100vh - 35px)"} p={3}>
        <Grid item xs={10}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <TextField
              select
              id="select-chart"
              value={chart}
              label="Select Chart"
              size="small"
              onChange={handleChange}
              sx={{ alignSelf: "end" }}
            >
              {chartOptions
                .slice(0)
                .reverse()
                .map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
            </TextField>
            <center>
              <Typography variant="h6" color="primary" sx={{ mt: -5 }}>
                {chart === 0
                  ? "July 2022 Incoming Tracked Mail"
                  : chart === 1
                  ? "August 2022 Incoming Tracked Mail"
                  : "September 2022 Incoming Tracked Mail"}
              </Typography>
            </center>
            <ResponsiveContainer>
              <BarChart
                data={
                  chart === 0
                    ? julyIncomingData
                    : chart === 1
                    ? augustIncomingData
                    : sepIncomingData
                }
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Passport" stackId="a" fill="#0088FE" />
                <Bar dataKey="BDM" stackId="a" fill="#00C49F" />
                <Bar dataKey="Authentication" stackId="a" fill="#FFBB28" />
                <Bar dataKey="Citizenship" stackId="a" fill="#FF8042" />
                <Bar dataKey="Other" stackId="a" fill="#8884d8" />
                <Line type="monotone" dataKey="Outgoing" stroke="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
            <Divider />
            <center>
              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                {chart === 0
                  ? "July 2022 Outgoing Tracked Mail"
                  : chart === 1
                  ? "August 2022 Outgoing Tracked Mail"
                  : "September 2022 Outgoing Tracked Mail"}
              </Typography>
            </center>
            <ResponsiveContainer>
              <LineChart
                data={
                  chart === 0
                    ? julyOutgoingData
                    : chart === 1
                    ? augustOutgoingData
                    : sepOutgoingData
                }
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Outgoing" stroke="#1976d2" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        {isLoading ? (
          <Box padding={10}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <Grid item xs={2}>
            <Grid spacing={2} direction="column" container>
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography component="p">Total Incoming Mail</Typography>
                    <Typography component="p" variant="h4">
                      {incoming.total}
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Typography component="p">Passport</Typography>
                      {incoming.passport}
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Typography component="p">BDM</Typography>
                      {incoming.bdm}
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Typography component="p">Authentication</Typography>
                      {incoming.authentication}
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Typography component="p">Citizenship</Typography>
                      {incoming.citizenship}
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={2}
                    >
                      <Typography component="p">Other</Typography>
                      {incoming.other}
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Typography
                      gutterBottom
                      color="text.secondary"
                      fontSize={14}
                    >
                      From 9 June 2022
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item paddingTop={2}>
                <Card>
                  <CardContent>
                    <Typography component="p">Total Outgoing Mail</Typography>
                    <Typography component="p" variant="h4">
                      {outgoing}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Typography
                      gutterBottom
                      color="text.secondary"
                      fontSize={14}
                    >
                      From 9 June 2022
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            <Typography component="p" sx={{ fontSize: 14, paddingTop: 2 }}>
              Under constructon 😸🚧.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
