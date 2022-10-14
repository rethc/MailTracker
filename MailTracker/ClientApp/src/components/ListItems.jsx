import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Typography,
    styled,
    ListItemText,
    Tooltip,
    tooltipClasses, 
  } from "@mui/material";
  import React, { useEffect } from "react";
  import LocalShippingIcon from "@mui/icons-material/LocalShipping";
  import SearchIcon from "@mui/icons-material/Search";
  import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
  import TableChartIcon from "@mui/icons-material/TableChart";
  import LeaderboardIcon from "@mui/icons-material/Leaderboard";
  import { useLocation, useNavigate } from "react-router-dom"; 
  import ListAltIcon from "@mui/icons-material/ListAlt";
  
  function ListItems() {
  

    let navigate = useNavigate();
    //Active Button
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    let location = useLocation();
    useEffect(() => {
      switch (location.pathname) {
        case "/":
          setSelectedIndex(0);
          break;
        case "/scan-out":
          setSelectedIndex(1);
          break;
        case "/search":
          setSelectedIndex(2);
          break;
        case "/table":
          setSelectedIndex(4);
          break;
        case "/stats":
          setSelectedIndex(5);
          break;

        default:
          break;
      }
    }, [location.pathname]);

    const HtmlTooltip = styled(({ className, ...props }) => (
      <Tooltip
        placement="right-start"
        {...props}
        classes={{ popper: className }}
      />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "white",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 230,
        fontSize: theme.typography.pxToRem(13),
        border: "1px solid #dadde9",
      },
    }));

    return (
      <React.Fragment>
        <List>
          {/* Scan Incoming Mail */}
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">
                  How to scan Incoming Mail
                </Typography>
                {"1. Select "}
                <b>
                  <u>Product Type</u>
                </b>{" "}
                {"from dropdown list."}
                <br />
                {"2. Click into "}
                <b>
                  <u>Tracking Number</u>
                </b>
                {" field."}
                <br />
                {"3. Scan barcode."}
              </React.Fragment>
            }
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={() => {
                  navigate("/");
                }}
              >
                <ListItemIcon>
                  <LocalPostOfficeIcon
                    color={selectedIndex === 0 ? "secondary" : "inherit"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Scan Incoming Mail"
                  sx={{
                    color: selectedIndex === 0 ? "secondary.main" : "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </HtmlTooltip>

          {/* Scan Outgoing Mail */}
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">
                  How to scan Outgoing Mail
                </Typography>
                {"1. Click into "}
                <b>
                  <u>Tracking Number</u>
                </b>
                {" field."}
                <br />
                {"2. Scan barcode."}
              </React.Fragment>
            }
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={() => {
                  navigate("/scan-out");
                }}
              >
                <ListItemIcon>
                  <LocalShippingIcon
                    color={selectedIndex === 1 ? "secondary" : "inherit"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Scan Outgoing Mail"
                  sx={{
                    color: selectedIndex === 1 ? "secondary.main" : "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </HtmlTooltip>

          {/* Search External Mail */}
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">How to scan Search Mail</Typography>
                {"1. Click into "}
                <b>
                  <u>Enter Tracking Number</u>
                </b>
                {" field."}
                <br />
                {"2. Scan barcode or type tracking number and press ENTER."}
                <br />
                <br />
                <em>{"Note: tracking number must be atleast 3 characters"}</em>
              </React.Fragment>
            }
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={() => {
                  navigate("/search");
                }}
              >
                <ListItemIcon>
                  <SearchIcon
                    color={selectedIndex === 2 ? "secondary" : "inherit"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Search Mail"
                  sx={{
                    color: selectedIndex === 2 ? "secondary.main" : "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </HtmlTooltip>

          {/* Internal Mail */}
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">Internal Mail Tracker</Typography>
                {"Opens Internal Mail Tracker spreadsheet in new tab."}
              </React.Fragment>
            }
          >
            <ListItem disablePadding>
              <ListItemButton
                href="https://dia.cohesion.net.nz/sites/TEA/WLGO/_layouts/15/WopiFrame.aspx?sourcedoc={1e39d29d-32b2-4f39-8a81-ea75a709d032}&action=edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemIcon>
                  <TableChartIcon />
                </ListItemIcon>
                <ListItemText primary="Internal Mail Tracker" />
              </ListItemButton>
            </ListItem>
          </HtmlTooltip>

          {/* Search Full Ext DB */}
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
                selected={selectedIndex === 4}
                onClick={() => {
                  navigate("/table");
                }}
              >
                <ListItemIcon>
                  <ListAltIcon
                    color={selectedIndex === 4 ? "secondary" : "inherit"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="External Mail Table"
                  sx={{
                    color: selectedIndex === 4 ? "secondary.main" : "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </HtmlTooltip>

          {/* Stats */}
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">Stats</Typography>
                {"Under construction."}
              </React.Fragment>
            }
          >
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedIndex === 5}
                onClick={() => {
                  navigate("/stats");
                }}
              >
                <ListItemIcon>
                  <LeaderboardIcon
                    color={selectedIndex === 5 ? "secondary" : "inherit"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Stats"
                  sx={{
                    color: selectedIndex === 5 ? "secondary.main" : "inherit",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </HtmlTooltip>

          {/* Internal Mail
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">Test</Typography>
                {"Not yet implemented."}
              </React.Fragment>
            }
          >
            <ListItem disablePadding>
              <ListItemButton onClick={handleMailClick}>
                <ListItemIcon>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText primary="Test" />
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
                      fontWeight:
                        item.selectedIndex === selectedIndex
                          ? "bold"
                          : "normal",
                      color:
                        item.selectedIndex === selectedIndex
                          ? "secondary.main"
                          : "inherit",
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse> */}
        </List>
      </React.Fragment>
    );
  }
  
  export default ListItems;