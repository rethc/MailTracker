import * as React from "react"; 
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
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
import { ListSubheader, Switch } from "@mui/material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SearchIcon from "@mui/icons-material/Search";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People"; 
import DarkModeIcon from "@mui/icons-material/DarkMode"; 
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function Wrapper({mode, setMode},props) {
  let navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false); 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <QrCodeScannerIcon />
            </ListItemIcon>
            <ListItemText primary="Scan Mail In" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/scanout");
            }}
          >
            <ListItemIcon>
              <DocumentScannerIcon />
            </ListItemIcon>
            <ListItemText primary="Scan Mail Out" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/search">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search Mail" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/internalmail">
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Internal Mail" />
          </ListItemButton>
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
          <Typography variant="h6" noWrap component="div">
            Mail Tracker
          </Typography>
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