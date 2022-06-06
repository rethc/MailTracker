import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  ListSubheader,
  Menu,
  MenuItem,
  Switch, 
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SearchIcon from "@mui/icons-material/Search";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip placement="right-start" {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(13),
    border: "1px solid #dadde9", 
  },
}));

 

function Wrapper({ mode, setMode }, props) {
  let navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //Profile settings
  const settings = ["Profile", "Logout"]; 
  const [anchorElUser, setAnchorElUser] = React.useState(null);

 
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
 
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <div>
      <Toolbar />

      <Divider />
      <List>
        <ListSubheader component="div" inset>
          Menu
        </ListSubheader>
        <ListItem disablePadding>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">Scan all Incoming mail</Typography>
                {"1. Select"}{" "}
                <b>
                  <u>Product Type</u>
                </b>{" "}
                {"from dropdown"}
                <br />
                {"2. Scan"}{" "}
                <b>
                  <u>Tracking Number</u>
                </b>
              </React.Fragment>
            }
          >
            <ListItemButton
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                <QrCodeScannerIcon />
              </ListItemIcon>
              <ListItemText primary="Scan Incoming Mail" />
            </ListItemButton>
          </HtmlTooltip>
        </ListItem>
        <ListItem disablePadding>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">Scan all Outgoing mail</Typography>
                {"1. Select"}{" "}
                <b>
                  <u>Product Type</u>
                </b>{" "}
                {"from dropdown"}
                <br />
                {"2. Scan"}{" "}
                <b>
                  <u>Tracking Number</u>
                </b>
              </React.Fragment>
            }
          >
            <ListItemButton
              onClick={() => {
                navigate("/scanout");
              }}
            >
              <ListItemIcon>
                <DocumentScannerIcon />
              </ListItemIcon>
              <ListItemText primary="Scan Outgoing Mail" />
            </ListItemButton>
          </HtmlTooltip>
        </ListItem>
        <ListItem disablePadding>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">
                  Search Incoming/Outgoing Mail
                </Typography>
                {
                  "by Tracking Number, Product Type, Mail incoming/outgoing or Date scanned."
                }
              </React.Fragment>
            }
          >
            <ListItemButton        onClick={() => {
                navigate("/search");
              }}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search Mail" />
            </ListItemButton>
          </HtmlTooltip>
        </ListItem>
        <ListItem disablePadding>
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">
                  Sort Mail going to other teams
                </Typography>
                {"Not yet implemented..."}
              </React.Fragment>
            }
          >
            <ListItemButton        onClick={() => {
                navigate("/non");
              }}>

              
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary="Internal Mail" />
            </ListItemButton>
          </HtmlTooltip>
        </ListItem>
        <br />
        <Divider />
        <ListSubheader component="div" inset>
          Settings
        </ListSubheader>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/person">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Staff" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/teams">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Teams" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/teams">
            <ListItemIcon>
              <DarkModeIcon />
            </ListItemIcon>
            <Switch
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

              

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(0100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundImage:
            mode === "light"
              ? "url(https://raw.githubusercontent.com/rethc/rethc/main/weave1.png)"
              : "url(https://raw.githubusercontent.com/rethc/rethc/main/weave1_bw.png)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mail Tracker
          </Typography>
          <Box alignContent="flex-end">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Chesda" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "42px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Wrapper;
