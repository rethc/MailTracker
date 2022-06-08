import { 
  Container, 
  CssBaseline, 
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import createAPIEndpoint from "../api";
import { format, zonedTimeToUtc } from "date-fns-tz";
import { parseISO } from "date-fns"; 
import Copyright from "./Copyright";

import MUIDataTable from "mui-datatables";

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
  const [mailList, setMailList] = useState([]);

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

  const columns = [
    {
      name: "trackingNo",
      label: "Tracking Number",
      options: {
        filter: false,
        sort: true,
      }
    },
    {
      name: "productType",
      label: "Product Type",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "mailType",
      label: "Mail Type",
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: "dateCreated",
      label: "Date Scanned",
      options: {
        filter: true,
        sort: true
      }
    }
  ];
 
  const data = mailList.map(mail => {  
    return {
        trackingNo: mail.trackingNo,
        productType: mail.productType,
        mailType: mail.mailType,
        dateCreated:  format(
          zonedTimeToUtc(parseISO(mail.dateCreated), "UTC"),
          "dd/MM/yyyy hh:mm aaa"
        )
    }
  }).slice()
  .reverse()

  const options = {
    filterType: 'dropdown', 
    customToolbarSelect: () => {}
  };
   
  return (
    <Box component="main" sx={{ flexGrow: 1, marginLeft: { sm: 30, xs: 0 } }}>
      <CssBaseline />
      <DrawerHeader />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}> 
        <MUIDataTable
          title={"External Mail List"}
          data={data}
          columns={columns} 
          options={options}
        /> 
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
} 