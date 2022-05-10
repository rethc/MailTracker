import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import createAPIEndpoint from "../api"
import { format, parseISO } from 'date-fns';
import nz from 'date-fns/locale/en-NZ';
import axios from 'axios';


export default function RecentExternalMail() {

  const [mailList, setMailList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5243/api/ExternalMails")
      .then(res => {
        setMailList(res.data)
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }, []);


  /*useEffect(()=> {
    createAPIEndpoint("ExternalMails").fetchAll()
    .then(res =>  {
      setMailList(res.data)

      console.log(res.data)
    })
    .catch(err => console.log(err))
  }, [])*/

  return (
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
          {mailList.map((m) => (
            <TableRow key={m.externalMailID}>
              <TableCell>{m.externalMailID}</TableCell>
              <TableCell>{m.trackingNo}</TableCell>
              <TableCell>{m.mailType}</TableCell>
              <TableCell>{format(parseISO(m.dateCreated), "dd/MM/yyyy,  hh:mm aaa", nz)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </React.Fragment>
  );
}
