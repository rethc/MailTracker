import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Radio, Grid, FormLabel, RadioGroup, InputLabel, FormControl, MenuItem, Select, TextField, FormControlLabel } from "@mui/material"
import createAPIEndpoint from "../api"
import RecentExternalMail from './RecentExternalMail';

import Title from './Title';

const initialValues = {
  mailType: "Mail In",
  trackingNumber: '',
  dateCreated: new Date(),
}

export default function ScanExternalMail() {
  const theme = useTheme();

  const [values, setValues] = useState(initialValues);

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }



  function update() {
    let item = {
      mailType: values.mailType,
      trackingNo: values.trackingNumber,
      dateCreated: values.dateCreated
    }
    createAPIEndpoint("ExternalMails").create(item);

  }

  return (
    <React.Fragment>
      <Title>Scan Mail</Title>
      <form>
        <Grid container>
          <Grid item xs={4}>
            <FormControl>
              <FormLabel>Mail Type</FormLabel>
              <RadioGroup row
                onChange={handleInputChange}
                name="mailType"
                value={values.mailType}
              >
                <FormControlLabel value="Mail In" control={<Radio />} label="Mail In" />
                <FormControlLabel value="Mail Out" control={<Radio />} label="Mail Out" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <TextField
              variant='outlined'
              label="Tracking Number"
              name='trackingNumber'
              value={values.trackingNumber}
              onChange={handleInputChange}
              sx={{ width: "60%" }}
            />
          </Grid>
          <Grid item xs={12} m={4}>
            <center>
              <Button variant="contained" onClick={update}>Save Mail</Button>
            </center>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
