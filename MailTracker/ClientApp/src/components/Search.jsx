import {
  CircularProgress,
  Container,
  CssBaseline, 
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react"; 
import { format, zonedTimeToUtc } from "date-fns-tz";
import { parseISO } from "date-fns";
import Copyright from "./Copyright";

import MUIDataTable from "mui-datatables";
import DrawerHeader from "./DrawerHeader";
import axios from "axios";

export default function Search() {
  const [mailList, setMailList] = useState([]);
  const [isLoading, setLoading] = useState(true); //loading spinner

  async function fetchData() {
    const { data } = await axios.get(
      "https://mailtrackerapi.azurewebsites.net/api/ExternalMails/"
    );
    setMailList(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      name: "trackingNo",
      label: "Tracking Number",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "productType",
      label: "Product Type",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "mailType",
      label: "Mail Type",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "dateCreated",
      label: "Date Scanned",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const data = mailList
    .map((mail) => {
      return {
        trackingNo: mail.trackingNo,
        productType: mail.productType,
        mailType: mail.mailType,
        dateCreated: format(
          zonedTimeToUtc(parseISO(mail.dateCreated), "UTC"),
          "dd/MM/yyyy hh:mm aaa"
        ),
      };
    })
    .slice()
    .reverse();

  const options = {
    filterType: "dropdown",
    customToolbarSelect: () => {},
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, marginLeft: { sm: 30, xs: 0 } }}>
      <CssBaseline />
      <DrawerHeader />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {isLoading ? (
          <center>
            <CircularProgress />
          </center>
        ) : (
          <MUIDataTable
            title={"External Mail List"}
            data={data}
            columns={columns}
            options={options}
          />
        )}
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
