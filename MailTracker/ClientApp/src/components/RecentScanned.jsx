import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import React from "react";
import { format, zonedTimeToUtc } from "date-fns-tz";
import { parseISO } from "date-fns"; 

  export default function RecentScanned(props) {
    const mailList = props.data; //MailList array
    return (
      <React.Fragment>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tracking Number</TableCell>
                <TableCell>Mail Type</TableCell>
                {/* If Incoming page, display the product type column*/}
                {props.type === "Incoming" ? (
                  <TableCell>Product Type</TableCell>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
                <TableCell>Date Scanned</TableCell>
              </TableRow>
            </TableHead> 
              <TableBody>
                {mailList &&
                  mailList.map((m) => (
                    <TableRow key={m.externalMailID}>
                      {/* If tracking number is longer than 30 characters, truncate and append ...*/}
                      <TableCell>
                        {m.trackingNo.length > 80
                          ? `${m.trackingNo.substring(0, 80)}...`
                          : m.trackingNo}
                      </TableCell>
                      <TableCell>{m.mailType}</TableCell>
                      {props.type === "Incoming" ? (
                        <TableCell>{m.productType}</TableCell>
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                      <TableCell>
                        {/* Returns a Date with the UTC time. date-fns-tz library will display the date and time in the local time of the user */}
                        {format(
                          zonedTimeToUtc(parseISO(m.dateCreated), "UTC"),
                          "dd/MM/yyyy hh:mm aaa"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody> 
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  }
  