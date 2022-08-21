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
  FormControl,
  MenuItem,
  TextField,
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

  const [chart, setChart] = React.useState(0);

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

  const incomingData = [
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
  const outgoingData = [
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
      label: "Last Month Incoming",
    },
    {
      value: 1,
      label: "Last Month Outgoing",
    },
  ];

  return (
    <Box
      component="main"
      sx={{ display: "flex", paddingTop: 7, marginLeft: { sm: 30, xs: 0 } }}
    >
      <CssBaseline />
      <Grid container spacing={3} height={"calc(100vh - 40px)"} p={3}>
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
              sx={{ alignSelf: "end"}}
            >
              {chartOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {chart === 0 ? (
              <Typography
                variant="h5"
                color="primary"
                align="center"
                sx={{ mt: -5 }}
              >
                July 2022 Incoming Tracked Mail
              </Typography>
            ) : (
              <Typography
                variant="h5"
                color="primary"
                align="center"
                sx={{ mt: -5 }}
              >
                July 2022 Outgoing Tracked Mail
              </Typography>
            )}

            {/* Incoming Mail Barchar */}
            {chart === 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={incomingData}
                  margin={{
                    top: 20,
                    right: 30,
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
                  <Bar dataKey="Other" stackId="a" fill="#a4de6c" />
                  <Line type="monotone" dataKey="Outgoing" stroke="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={outgoingData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="Outgoing" stroke="#1976d2" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
        {isLoading ? (
          <Box padding={10}>
            <CircularProgress />
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
