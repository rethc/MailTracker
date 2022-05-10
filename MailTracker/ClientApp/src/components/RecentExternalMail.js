import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title'; 
import { format, parseISO } from 'date-fns';
import nz from 'date-fns/locale/en-NZ';


export default function RecentExternalMail({mailList}) {

  return(
    <React.Fragment>
      <Title>Recent Mail Scanned</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tracking Number</TableCell>
            <TableCell>Mail Type</TableCell>
            <TableCell>Date Scanned</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {mailList.slice(0).reverse().map((m) => (
              <TableRow key={m.externalMailID}>
                <TableCell>{m.externalMailID}</TableCell>
                <TableCell>{m.trackingNo}</TableCell>
                <TableCell>{m.mailType}</TableCell>
                <TableCell>{format(parseISO(m.dateCreated), "dd/MM/yyyy,  HH:mm", nz)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>

    </React.Fragment> 
  );
}
