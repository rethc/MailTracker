import { Box, createTheme } from "@mui/material";
import { useMemo, useState } from "react"; 
import Wrapper from "./components/Wrapper";  
import { Routes, Route} from "react-router-dom"; 
import {  grey } from "@mui/material/colors";
import { ThemeProvider } from '@mui/material/styles';
import Search from "./components/Search"; 
import Scan from "./components/Scan";
import ScanOut from "./components/ScanOut";
import Stats from "./components/Stats";
import PageNotFound from "./components/PageNotFound";
import Table from "./components/Table";
import TeamMail from "./components/TeamMail";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#00465D",
      ...(mode === 'dark' && {
        main: "#ffffff",
      }),
    },
    secondary: {
      main: "#1976d2",
      ...(mode === 'dark' && {
        main: "#ffffff",
      }),
    },
    background: {
      default: "#f5f5f5", 
    },
    ...(mode === 'dark' && {
      background: {
        //default: blue[300], Change bg colour for dark mode
      },
    }), 
    text: {
      ...(mode === 'light'
        ? {
          primary: grey[900],
          secondary: grey[800],
        }
        : {
          primary: '#fff',
          secondary: grey[500],
        }),
    },
  },
});
 

function App() {  
  const [mode, setMode] = useState('light'); 
  const [location, setLocation] = useState(localStorage.getItem("MailLocation") ? localStorage.getItem("MailLocation") : "Wellington");

  useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const handleLocationChange = (newLocation) => {
    console.log("New location:", newLocation);
    setLocation(newLocation); 
  }

  return (
    <ThemeProvider theme={theme}> 
      <Box>
        <Wrapper setMode={setMode} mode={mode} onLocationChange={handleLocationChange} /> 
        <Routes>
          <Route path="/" element={<Scan location={location} />} />
          <Route path="/scan-out" element={<ScanOut location={location} />} />
          <Route path="/search" element={<Search />} /> 
          <Route path="/stats" element={<Stats />} /> 
          <Route path="/Table" element={<Table />} /> 
          <Route path="/issuance1" element={<TeamMail teamName="Issuance 1" />} />
          <Route path="*" element={<PageNotFound />} /> 
        </Routes>
      </Box>
      </ThemeProvider>
  );
}

export default App;