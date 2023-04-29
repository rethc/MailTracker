import React, { useState } from "react";
import {
  MenuItem,
  Switch,
  Typography,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  AppBar,
  styled,
  Tooltip,
  Select,
  FormControl,
  InputBase,
  alpha,
  SvgIcon,
  Grid,
} from "@mui/material";
import ListItems from "../components/ListItems";
import MenuIcon from "@mui/icons-material/Menu";
import BusinessIcon from "@mui/icons-material/Business";
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

function Wrapper({ mode, setMode, onLocationChange }, props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //LOCATION
const [location, setLocation] = useState(() => {
  const savedLocation = localStorage.getItem("MailLocation");
  if (savedLocation) {
    return savedLocation;
  } else {
    const defaultLocation = "Wellington";
    localStorage.setItem("MailLocation", defaultLocation);
    return defaultLocation;
  }
});

const handleChange = (event) => {
  const newLocation = event.target.value;
  setLocation(newLocation);
  onLocationChange(newLocation);
  localStorage.setItem("MailLocation", newLocation);
};

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(1),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",

      backgroundColor:
        theme.palette.mode === "light"
          ? alpha(theme.palette.common.white, 0.7)
          : alpha(theme.palette.common.black, 0.7),
      //border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
    },
  }));

  const locationList = [
    {
      value: "Wellington",
      label: "Wellington",
    } 
  ];

  const drawer = (
    <React.Fragment>
      <Toolbar />
      <ListItems />
    </React.Fragment>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
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
            Operations Delivery Mail Tracker
          </Typography>

          <Tooltip title="WELLINGTON ONLY" placement="left">
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location}
                onChange={handleChange}
                label="Location"
                input={<BootstrapInput />}
                renderValue={(value) => {
                  return (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <SvgIcon color="primary">
                        <BusinessIcon />
                      </SvgIcon>
                      {value}
                    </Box>
                  );
                }}
              >
                {locationList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Tooltip>

          <Tooltip title="Toggle Dark Mode">
            <MaterialUISwitch
              label="switch-list-label-darkmode"
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
              inputProps={{
                "aria-label": "switch-list-label-darkmode",
                "aria-labelledby": "switch-list-label-darkmode",
              }}
            />
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: 0 }}
        aria-label="folders"
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
