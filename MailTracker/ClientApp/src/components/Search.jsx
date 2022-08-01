import {
  CircularProgress,
  Container,
  CssBaseline,
  Box,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { format, zonedTimeToUtc } from "date-fns-tz";
import { parseISO } from "date-fns";
import Copyright from "./Copyright";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function Search() {
  const [mailList, setMailList] = useState([]);
  const [isLoading, setLoading] = useState(true); //loading spinner
  const [dateValue, setDateValue] = useState(null);

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

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
      name: "mailType",
      label: "Mail Type",
      options: {
        filter: true,
        sort: false,
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
      name: "dateCreated",
      label: "Date Scanned",
      options: {
        filter: true,
        sort: true,
        display: "true",
        filterType: "custom",
        customFilterListOptions: {
          render: (value) => {
            if (isNaN(value[0]) || !value[0]) return [];
            return [format(value[0], "dd/MM/yyyy")];
          },
          update: (filterList, filterPos, index) => {
            console.log(
              "customFilterListOnDelete: ",
              filterList,
              filterPos,
              index
            );

            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          logic: (dateTime, filters) => {
            if (isNaN(filters[0])) return false;
            let date = filters[0] && format(filters[0], "dd/MM/yyyy");
            let dateString = dateTime.split(" ")[0];
            if (dateString === date) {
              return false;
            } else if (!date) {
              return false;
            }
            return true;
          },
          display: (filterList, onChange, index, column) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Filter by Date"
                  inputFormat="dd/MM/yyyy"
                  value={filterList[index][0] || null}
                  onChange={(e) => {
                    handleDateChange(e);
                    filterList[index][0] = e;
                    onChange(filterList[index], index, column);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            );
          },
        },
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
    print: false,
    searchOpen: true,
    searchAlwaysOpen: true,
  };

  return (
    <Box
      component="main"
      
      sx={{ flexGrow: 1, paddingTop: 7, marginLeft: { sm: 30, xs: 0 } }}
    >
      <CssBaseline />
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
