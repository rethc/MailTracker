import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PersonIcon from '@mui/icons-material/Person'; 
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SearchIcon from '@mui/icons-material/Search';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import GroupIcon from '@mui/icons-material/Group';
import { Link } from 'react-router-dom'
import ScanExternalMail from './ScanExternalMail'; 



export const mainListItems = (
  <React.Fragment>
    <ListItemButton >
      <ListItemIcon>
        <DocumentScannerIcon />
      </ListItemIcon>
      <ListItemText primary="Scan Mail" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search Mail" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ContactMailIcon />
      </ListItemIcon>
      <ListItemText primary="Internal Mail" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Settings
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Person" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Teams" />
    </ListItemButton>
  </React.Fragment>
);
