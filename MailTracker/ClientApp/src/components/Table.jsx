import {
  Button,
  Container,
  CssBaseline,
  Box,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { format, zonedTimeToUtc } from "date-fns-tz";
import { parseISO } from "date-fns";
import Copyright from "./Copyright";
import MUIDataTable from "mui-datatables";
import axios from 'axios';  

// Custom toolbar component
const CustomToolbar = ({ searchQuery, setSearchQuery }) => {
  const handleReset = () => {
    setSearchQuery("");
  };

  return (
    searchQuery && (
      <Button variant="contained" onClick={handleReset}>Reset</Button>
    )
  );
};

export default function Table() {
  const [mailList, setMailList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortOrder, setSortOrder] = useState({ name: 'ExternalMailID', direction: 'desc' });
  const [searchQuery, setSearchQuery] = useState(""); 

 
 
  const fetchData = useCallback(async (currentPage, currentLimit, currentSearchQuery) => {
    setLoading(true);
    let url = `https://mailtrackerapi.azurewebsites.net/api/ExternalMails/GetPaged?page=${currentPage}&rowsPerPage=${currentLimit}&sortField=${sortOrder.name}&sortDir=${sortOrder.direction}`;

    if(currentSearchQuery && currentSearchQuery.trim() !== '') {
        url += `&trackingNo=${currentSearchQuery}`;
    }
    try {
        const res = await axios.get(url);
        const formattedData = res.data.data.map(mail => {
          return {
            ...mail,
            dateCreated: format(zonedTimeToUtc(parseISO(mail.dateCreated), "UTC"), "dd/MM/yyyy hh:mm aaa")
          }
        });
  
        setMailList(formattedData);
        setPage(currentPage);
        setTotal(res.data.total);
    } catch (error) {
        console.error("Error fetching data", error);
    }
    setLoading(false);
  }, [sortOrder]);

  useEffect(() => {
    fetchData(page, limit, searchQuery);
  }, [fetchData, page, limit, searchQuery]);

  const columns = [
    {
      name: "trackingNo",
      label: "Tracking Number",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "mailType",
      label: "Mail Type",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "productType",
      label: "Product Type",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "dateCreated",
      label: "Date Scanned",
      options: {
        filter: false,
        sort: false,
      },
    },
  ];

  const options = {
    serverSide: true,
    filter: false,
    responsive: "vertical",
    searchOpen: true,
    searchAlwaysOpen: true,
    count: total,
    rowsPerPage: limit,
    rowsPerPageOptions: [],
    sortOrder: sortOrder,
    print: false,
    searchText: searchQuery,
    download: false,
    viewColumns: false,
    customToolbar: () => {
      return (
        <CustomToolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      );
    },
    onTableChange: async (action, tableState) => {
      switch (action) {
        case "changePage":
          setPage(tableState.page);
          break;
        case "search":
          setSearchQuery(tableState.searchText || "");
          break;
        default:
          console.log("Action not handled.");
      }
    },
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, paddingTop: 7, marginLeft: { sm: 30, xs: 0 } }}
    >
      <CssBaseline />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <MUIDataTable
          title={"External Mail List"}
          data={mailList}
          columns={columns}
          options={options}
        />
        <Copyright />
      </Container>
    </Box>
  );
}