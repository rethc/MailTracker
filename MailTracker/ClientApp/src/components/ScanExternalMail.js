import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Radio, Grid, FormLabel, RadioGroup, InputLabel, FormControl, MenuItem, Select, TextField, FormControlLabel } from "@mui/material"
import createAPIEndpoint from "../api" 
import { useToasts } from "react-toast-notifications"

import Title from './Title';

const initialValues = {
  mailType: "Mail In",
  trackingNumber: '',
  dateCreated: new Date(),
}

export default function ScanExternalMail({ getMailList}) {

  const { addToast } = useToasts();
  const theme = useTheme();
  const input1 = useRef();
  const [values, setValues] = useState(initialValues);

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  } 

  async function handleSubmit(e) {
    e.preventDefault();

    //Create new object
    let item = {
      mailType: values.mailType,
      trackingNo: values.trackingNumber,
      dateCreated: values.dateCreated
    }
    //Add to db
    await createAPIEndpoint("ExternalMails").create(item)
    await getMailList();
    addToast("Submitted successfully 😊", { appearance: "success" });
    values.trackingNumber = "";
    input1.current.focus(); 
  }

  return (
    <React.Fragment>
      <Title>Scan Mail</Title>
      
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={4}>
            <FormControl>
              <FormLabel>Mail Type</FormLabel>
              <RadioGroup row
                onChange={handleInputChange}
                name="mailType"
                value={values.mailType}
              >
                <FormControlLabel value="Mail In" control={<Radio />} label="Mail In"  />
                <FormControlLabel value="Mail Out" control={<Radio />} label="Mail Out"/>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <TextField
              autoFocus 
              variant='outlined'
              label="Tracking Number"
              name='trackingNumber'
              value={values.trackingNumber}
              onChange={handleInputChange}
              sx={{ width: "60%" }}
              inputRef={input1}
            />
          </Grid>
          <Grid item xs={12} m={4}>
            <center>
              <Button variant="contained" onClick={handleSubmit}>Save Mail</Button>
            </center>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
