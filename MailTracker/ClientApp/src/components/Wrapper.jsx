import React from "react";
import {
  Avatar,
  ListSubheader,
  Menu,
  MenuItem,
  Switch,
  Collapse,
  Typography,
  Toolbar,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItem,
  List,
  IconButton,
  Drawer,
  Divider,
  Box,
  AppBar,
  styled,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SearchIcon from "@mui/icons-material/Search";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Weave from "../components/weave.png";
import WeaveBW from "../components/weavebw.png";

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

  //Internal Mail
  const [openMailMenu, setopenMailMenu] = React.useState(false);
  const handleMailClick = () => {
    setopenMailMenu(!openMailMenu);
  };

  const internalMailLabel = [
    { label: "Issuance 1", navigate: "/issuance1" },
    { label: "Issuance 2" },
    { label: "Maintenance" },
    { label: "Registrations" },
    { label: "COS Team" },
    { label: "Services 1" },
    { label: "Services 2" },
    { label: "Services 3" },
    { label: "Services 4" },
    { label: "Services 5" },
    { label: "Services 6" },
    { label: "Services 7" },
    { label: "Certify" },
    { label: "Translations" },
    { label: "On Hold Mail" },
  ];

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

        {/* Scan Incoming Mail */}
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

        {/* Scan Outgoing Mail */}
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

        {/* Search External Mail */}
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
          <ListItemButton
            onClick={() => {
              navigate("/search");
            }}
          >
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search Mail" />
          </ListItemButton>
        </HtmlTooltip>
        {/* Internal Mail */}
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">
                Search Incoming/Outgoing Mail
              </Typography>
              {"Not yet implemented."}
            </React.Fragment>
          }
        >
          <ListItemButton onClick={handleMailClick}>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Internal Mail" />
            {openMailMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </HtmlTooltip>
        <Collapse in={openMailMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {internalMailLabel.map((item) => (
              <ListItemButton
                onClick={() => {
                  navigate(item.navigate);
                }}
                key={item.label}
                sx={{ py: 0, minHeight: 32 }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 15,
                    paddingLeft: 1,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* Dark Mode Toggle */}
        <br />
        <Divider />
        <ListSubheader component="div" inset>
          Settings
        </ListSubheader>
        <ListItem>
          <ListItemIcon>
            <DarkModeIcon />
          </ListItemIcon>
          <Switch
            edge="end"
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
            inputProps={{
              "aria-labelledby": "switch-list-label-darkmode",
            }}
          />
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
            mode === "light" ? `url(${Weave})` : `url(${WeaveBW})`,
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
            DIA Mail Tracker
          </Typography>
          <Box alignContent="flex-end">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Chesda" />
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
