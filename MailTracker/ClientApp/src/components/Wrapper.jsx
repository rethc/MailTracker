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
  List,
  IconButton,
  Drawer,
  Divider,
  Box,
  AppBar,
  styled,
  ListItem,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SearchIcon from "@mui/icons-material/Search";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; 
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Weave from "../components/weave.webp";
import WeaveBW from "../components/weavebw.webp";

const drawerWidth = 240;

//Dark mode switch
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

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
    { label: "Issuance 2", navigate: "/issuance2" },
    { label: "Maintenance", navigate: "/maintenance" },
    { label: "Registrations", navigate: "/registrations" },
    { label: "COS Team", navigate: "/cos" },
    { label: "Services 1", navigate: "/services1" },
    { label: "Services 2", navigate: "/services2" },
    { label: "Services 3", navigate: "/services3" },
    { label: "Services 4", navigate: "/services4" },
    { label: "Services 5", navigate: "/services5" },
    { label: "Services 6", navigate: "/services6" },
    { label: "Services 7", navigate: "/services7" },
    { label: "Certify", navigate: "/certify" },
    { label: "Translations", navigate: "/translations" },
    { label: "On Hold Mail", navigate: "/onhold" },
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
        <ListItem disablePadding>
          <ListSubheader component="div" inset>
            Menu
          </ListSubheader>
        </ListItem>
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
          <ListItem disablePadding>
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
          </ListItem>
        </HtmlTooltip>

        {/* Scan Outgoing Mail */}
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">Scan all Outgoing mail</Typography>
              {"1. Scan"}{" "}
              <b>
                <u>Tracking Number</u>
              </b>
            </React.Fragment>
          }
        >
          <ListItem disablePadding>
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
          </ListItem>
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
          <ListItem disablePadding>
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
          </ListItem>
        </HtmlTooltip>
        {/* Internal Mail */}
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">Internal Mail Tracker</Typography>
              {"Not yet implemented."}
            </React.Fragment>
          }
        >
          <ListItem disablePadding>
            <ListItemButton onClick={handleMailClick}>
              <ListItemIcon>
                <ContactMailIcon />
              </ListItemIcon>
              <ListItemText primary="Internal Mail" />
              {openMailMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
          </ListItem>
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
            Mail Tracker
          </Typography>
          <Tooltip title="Toggle Dark Mode">
            <MaterialUISwitch
              label="switch-list-label-darkmode"
              sx={{ mr: 1 }}
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
              inputProps={{
                 "aria-label" : "switch-list-label-darkmode",
                "aria-labelledby": "switch-list-label-darkmode",
              }}
            />
          </Tooltip>
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
