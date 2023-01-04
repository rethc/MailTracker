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

   const [chart, setChart] = React.useState(5);

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
    {
      value: 3,
      label: "October 2022",
    },
    {
      value: 4,
      label: "November 2022",
    },
    {
      value: 5,
      label: "December 2022",
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

  const octIncomingData = [
    {
      name: "03/10/2022",
      Other: 63,
      Passport: 101,
      Authentication: 33,
      BDM: 20,
      Citizenship: 39,
    },
    {
      name: "04/10/2022",
      Other: 22,
      Passport: 14,
      Authentication: 37,
      BDM: 6,
      Citizenship: 36,
    },
    {
      name: "05/10/2022",
      Other: 60,
      Passport: 99,
      Authentication: 46,
      BDM: 38,
      Citizenship: 40,
    },
    {
      name: "06/10/2022",
      Other: 37,
      Passport: 89,
      Authentication: 27,
      BDM: 36,
      Citizenship: 37,
    },
    {
      name: "07/10/2022",
      Other: 21,
      Passport: 82,
      Authentication: 39,
      BDM: 24,
      Citizenship: 29,
    },
    {
      name: "10/10/2022",
      Other: 42,
      Passport: 96,
      Authentication: 41,
      BDM: 18,
      Citizenship: 11,
    },
    {
      name: "11/10/2022",
      Other: 44,
      Passport: 95,
      Authentication: 41,
      BDM: 22,
      Citizenship: 31,
    },
    {
      name: "12/10/2022",
      Other: 49,
      Passport: 85,
      Authentication: 33,
      BDM: 19,
      Citizenship: 38,
    },
    {
      name: "13/10/2022",
      Other: 43,
      Passport: 45,
      Authentication: 37,
      BDM: 18,
      Citizenship: 26,
    },
    {
      name: "14/10/2022",
      Other: 60,
      Passport: 107,
      Authentication: 36,
      BDM: 29,
      Citizenship: 32,
    },
    {
      name: "17/10/2022",
      Other: 90,
      Passport: 68,
      Authentication: 23,
      BDM: 20,
      Citizenship: 25,
    },
    {
      name: "18/10/2022",
      Other: 71,
      Passport: 63,
      Authentication: 37,
      BDM: 11,
      Citizenship: 40,
    },
    {
      name: "19/10/2022",
      Other: 43,
      Passport: 74,
      Authentication: 18,
      BDM: 22,
      Citizenship: 18,
    },
    {
      name: "20/10/2022",
      Other: 130,
      Passport: 79,
      Authentication: 28,
      BDM: 9,
      Citizenship: 22,
    },
    {
      name: "21/10/2022",
      Other: 35,
      Passport: 69,
      Authentication: 36,
      BDM: 11,
      Citizenship: 23,
    },
    {
      name: "25/10/2022",
      Other: 8,
      Passport: 103,
      Authentication: 37,
      BDM: 24,
      Citizenship: 48,
    },
    {
      name: "26/10/2022",
      Other: 17,
      Passport: 18,
      Authentication: 21,
      BDM: 9,
      Citizenship: 17,
    },
    {
      name: "27/10/2022",
      Other: 103,
      Passport: 52,
      Authentication: 25,
      BDM: 7,
      Citizenship: 19,
    },
    {
      name: "28/10/2022",
      Other: 65,
      Passport: 66,
      Authentication: 20,
      BDM: 18,
      Citizenship: 7,
    },
    {
      name: "31/10/2022",
      Other: 65,
      Passport: 66,
      Authentication: 20,
      BDM: 18,
      Citizenship: 7,
    },
  ]; 

  const octOutgoingData = [
    {
      name: "03/10/2022",
      Outgoing: 2098,
    },
    {
      name: "04/10/2022",
      Outgoing: 1694,
    },
    {
      name: "05/10/2022",
      Outgoing: 1579,
    },
    {
      name: "06/10/2022",
      Outgoing: 1647,
    },
    {
      name: "07/10/2022",
      Outgoing: 1745,
    },
    {
      name: "10/10/2022",
      Outgoing: 1931,
    },
    {
      name: "11/10/2022",
      Outgoing: 2336,
    },
    {
      name: "12/10/2022",
      Outgoing: 1605,
    },
    {
      name: "13/10/2022",
      Outgoing: 2289,
    },
    {
      name: "14/10/2022",
      Outgoing: 2409,
    },
    {
      name: "17/10/2022",
      Outgoing: 1763,
    },
    {
      name: "18/10/2022",
      Outgoing: 1675,
    },
    {
      name: "19/10/2022",
      Outgoing: 1587,
    },
    {
      name: "20/10/2022",
      Outgoing: 1789,
    },
    {
      name: "21/10/2022",
      Outgoing: 1387,
    },
    {
      name: "25/10/2022",
      Outgoing: 604,
    },
    {
      name: "26/10/2022",
      Outgoing: 1714,
    },
    {
      name: "27/10/2022",
      Outgoing: 1730,
    },
    {
      name: "28/10/2022",
      Outgoing: 1793,
    },
    {
      name: "31/10/2022",
      Outgoing: 2180,
    },
  ];

  const novIncomingData = [
    {
      name: "01/11/2022",
      Other: 35,
      Passport: 69,
      Authentication: 30,
      BDM: 16,
      Citizenship: 16,
    },
    {
      name: "02/11/2022",
      Other: 58,
      Passport: 110,
      Authentication: 39,
      BDM: 21,
      Citizenship: 41,
    },
    {
      name: "03/11/2022",
      Other: 57,
      Passport: 73,
      Authentication: 44,
      BDM: 19,
      Citizenship: 19,
    },
    {
      name: "04/11/2022",
      Other: 45,
      Passport: 62,
      Authentication: 29,
      BDM: 16,
      Citizenship: 8,
    },
    {
      name: "07/11/2022",
      Other: 41,
      Passport: 87,
      Authentication: 36,
      BDM: 26,
      Citizenship: 22,
    },
    {
      name: "08/11/2022",
      Other: 51,
      Passport: 87,
      Authentication: 44,
      BDM: 12,
      Citizenship: 43,
    },
    {
      name: "09/11/2022",
      Other: 52,
      Passport: 75,
      Authentication: 14,
      BDM: 17,
      Citizenship: 12,
    },
    {
      name: "10/11/2022",
      Other: 61,
      Passport: 52,
      Authentication: 17,
      BDM: 12,
      Citizenship: 13,
    },
    {
      name: "11/11/2022",
      Other: 87,
      Passport: 80,
      Authentication: 55,
      BDM: 26,
      Citizenship: 27,
    },
    {
      name: "14/11/2022",
      Other: 66,
      Passport: 53,
      Authentication: 40,
      BDM: 18,
      Citizenship: 37,
    },
    {
      name: "15/11/2022",
      Other: 34,
      Passport: 58,
      Authentication: 36,
      BDM: 13,
      Citizenship: 30,
    },
    {
      name: "16/11/2022",
      Other: 39,
      Passport: 60,
      Authentication: 49,
      BDM: 23,
      Citizenship: 44,
    },
    {
      name: "17/11/2022",
      Other: 28,
      Passport: 73,
      Authentication: 38,
      BDM: 29,
      Citizenship: 36,
    },
    {
      name: "18/11/2022",
      Other: 60,
      Passport: 62,
      Authentication: 36,
      BDM: 16,
      Citizenship: 9,
    },
    {
      name: "21/11/2022",
      Other: 65,
      Passport: 70,
      Authentication: 52,
      BDM: 19,
      Citizenship: 69,
    },
    {
      name: "22/11/2022",
      Other: 37,
      Passport: 45,
      Authentication: 24,
      BDM: 11,
      Citizenship: 36,
    },
    {
      name: "23/11/2022",
      Other: 49,
      Passport: 79,
      Authentication: 42,
      BDM: 24,
      Citizenship: 47,
    },
    {
      name: "24/11/2022",
      Other: 38,
      Passport: 51,
      Authentication: 19,
      BDM: 12,
      Citizenship: 23,
    },
    {
      name: "25/11/2022",
      Other: 33,
      Passport: 77,
      Authentication: 39,
      BDM: 10,
      Citizenship: 28,
    },
    {
      name: "28/11/2022",
      Other: 13,
      Passport: 52,
      Authentication: 27,
      BDM: 22,
      Citizenship: 23,
    },
    {
      name: "29/11/2022",
      Other: 35,
      Passport: 35,
      Authentication: 22,
      BDM: 7,
      Citizenship: 13,
    },
    {
      name: "30/11/2022",
      Other: 33,
      Passport: 52,
      Authentication: 25,
      BDM: 29,
      Citizenship: 64,
    },
  ]; 

  const novOutgoingData = [
    {
      name: "01/11/2022",
      Outgoing: 2016,
    },
    {
      name: "02/11/2022",
      Outgoing: 2000,
    },
    {
      name: "03/11/2022",
      Outgoing: 1899,
    },
    {
      name: "04/11/2022",
      Outgoing: 2526,
    },
    {
      name: "07/11/2022",
      Outgoing: 1639,
    },
    {
      name: "08/11/2022",
      Outgoing: 1263,
    },
    {
      name: "09/11/2022",
      Outgoing: 1238,
    },
    {
      name: "10/11/2022",
      Outgoing: 1683,
    },
    {
      name: "11/11/2022",
      Outgoing: 1615,
    },
    {
      name: "14/11/2022",
      Outgoing: 1886,
    },
    {
      name: "15/11/2022",
      Outgoing: 1138,
    },
    {
      name: "16/11/2022",
      Outgoing: 1026,
    },
    {
      name: "17/11/2022",
      Outgoing: 1301,
    },
    {
      name: "18/11/2022",
      Outgoing: 1437,
    },
    {
      name: "21/11/2022",
      Outgoing: 1353,
    },
    {
      name: "22/11/2022",
      Outgoing: 1851,
    },
    {
      name: "23/11/2022",
      Outgoing: 1635,
    },
    {
      name: "24/11/2022",
      Outgoing: 1779,
    },
    {
      name: "25/11/2022",
      Outgoing: 1865,
    },
    {
      name: "28/11/2022",
      Outgoing: 1122,
    },
    {
      name: "29/11/2022",
      Outgoing: 1151,
    },
    {
      name: "30/11/2022",
      Outgoing: 1684,
    },
  ];

   const decIncomingData = [
     {
       name: "01/12/2022",
       Other: 41,
       Passport: 53,
       Authentication: 45,
       BDM: 19,
       Citizenship: 10,
     },
     {
       name: "02/12/2022",
       Other: 19,
       Passport: 41,
       Authentication: 36,
       BDM: 16,
       Citizenship: 21,
     },
     {
       name: "05/12/2022",
       Other: 42,
       Passport: 72,
       Authentication: 49,
       BDM: 25,
       Citizenship: 31,
     },
     {
       name: "06/12/2022",
       Other: 20,
       Passport: 42,
       Authentication: 25,
       BDM: 11,
       Citizenship: 22,
     },
     {
       name: "07/12/2022",
       Other: 27,
       Passport: 58,
       Authentication: 25,
       BDM: 19,
       Citizenship: 13,
     },
     {
       name: "08/12/2022",
       Other: 41,
       Passport: 70,
       Authentication: 32,
       BDM: 15,
       Citizenship: 30,
     },
     {
       name: "09/12/2022",
       Other: 24,
       Passport: 47,
       Authentication: 31,
       BDM: 6,
       Citizenship: 18,
     },
     {
       name: "12/12/2022",
       Other: 61,
       Passport: 74,
       Authentication: 37,
       BDM: 18,
       Citizenship: 43,
     },
     {
       name: "13/12/2022",
       Other: 36,
       Passport: 34,
       Authentication: 18,
       BDM: 9,
       Citizenship: 8,
     },
     {
       name: "14/12/2022",
       Other: 46,
       Passport: 62,
       Authentication: 20,
       BDM: 14,
       Citizenship: 19,
     },
     {
       name: "15/12/2022",
       Other: 32,
       Passport: 45,
       Authentication: 32,
       BDM: 18,
       Citizenship: 19,
     },
     {
       name: "16/12/2022",
       Other: 27,
       Passport: 52,
       Authentication: 27,
       BDM: 13,
       Citizenship: 27,
     },
     {
       name: "19/12/2022",
       Other: 28,
       Passport: 51,
       Authentication: 41,
       BDM: 24,
       Citizenship: 26,
     },
     {
       name: "20/12/2022",
       Other: 30,
       Passport: 41,
       Authentication: 26,
       BDM: 17,
       Citizenship: 26,
     },
     {
       name: "21/12/2022",
       Other: 30,
       Passport: 44,
       Authentication: 60,
       BDM: 20,
       Citizenship: 19,
     },
     {
       name: "22/12/2022",
       Other: 41,
       Passport: 35,
       Authentication: 45,
       BDM: 6,
       Citizenship: 24,
     },
     {
       name: "23/12/2022",
       Other: 34,
       Passport: 34,
       Authentication: 29,
       BDM: 18,
       Citizenship: 17,
     },
   ];

   const decOutgoingData = [
     {
       name: "01/12/2022",
       Outgoing: 1207,
     },
     {
       name: "02/12/2022",
       Outgoing: 1136,
     },
     {
       name: "05/12/2022",
       Outgoing: 1261,
     },
     {
       name: "06/12/2022",
       Outgoing: 1364,
     },
     {
       name: "07/12/2022",
       Outgoing: 1342,
     },
     {
       name: "08/12/2022",
       Outgoing: 1211,
     },
     {
       name: "09/12/2022",
       Outgoing: 1224,
     },
     {
       name: "12/12/2022",
       Outgoing: 2406,
     },
     {
       name: "13/12/2022",
       Outgoing: 1761,
     },
     {
       name: "14/12/2022",
       Outgoing: 1700,
     },
     {
       name: "15/12/2022",
       Outgoing: 1579,
     },
     {
       name: "16/12/2022",
       Outgoing: 1365,
     },
     {
       name: "19/12/2022",
       Outgoing: 832,
     },
     {
       name: "20/12/2022",
       Outgoing: 1054,
     },
     {
       name: "21/12/2022",
       Outgoing: 881,
     },
     {
       name: "22/12/2022",
       Outgoing: 1018,
     },
     {
       name: "23/12/2022",
       Outgoing: 826,
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
                  : chart === 2
                  ? "September 2022 Incoming Tracked Mail"
                  : chart === 3
                  ? "October 2022 Incoming Tracked Mail"
                  : chart === 4
                  ? "November 2022 Incoming Tracked Mail"
                  : "December 2022 Incoming Tracked Mail"}
              </Typography>
            </center>
            <ResponsiveContainer>
              <BarChart
                data={
                  chart === 0
                    ? julyIncomingData
                    : chart === 1
                    ? augustIncomingData
                    : chart === 2
                    ? sepIncomingData
                    : chart === 3
                    ? octIncomingData
                    : chart === 4
                    ? novIncomingData
                    : decIncomingData
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
                  : chart === 2
                  ? "September 2022 Outgoing Tracked Mail"
                  : chart === 3
                  ? "October 2022 Outgoing Tracked Mail"
                  : chart === 4
                  ? "November 2022 Outgoing Tracked Mail"
                  : "December 2022 Outgoing Tracked Mail"}
              </Typography>
            </center>
            <ResponsiveContainer>
              <LineChart
                data={
                  chart === 0
                    ? julyOutgoingData
                    : chart === 1
                    ? augustOutgoingData
                    : chart === 2
                    ? sepOutgoingData
                    : chart === 3
                    ? octOutgoingData
                    : chart === 4
                    ? novOutgoingData 
                    : decOutgoingData
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
