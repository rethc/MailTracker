import { Box, createTheme } from "@mui/material";
import { useMemo, useState } from "react"; 
import Wrapper from "./components/Wrapper";  
import { Routes, Route} from "react-router-dom"; 
import {  grey } from "@mui/material/colors";
import { ThemeProvider } from '@mui/material/styles';
import Search from "./components/Search"; 
import TeamMail from "./components/TeamMail";
import Scan from "./components/Scan";
import ScanOut from "./components/ScanOut";

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

  return (
    <ThemeProvider theme={theme}> 
      <Box>
        <Wrapper setMode={setMode} mode={mode} />
        <Routes>
          <Route path="/" element={<Scan />} />
          <Route path="/scanout" element={<ScanOut />} />
          <Route path="/search" element={<Search />} />
          <Route path="/issuance1" element={<TeamMail teamName="Issuance 1" />} />
          <Route path="/issuance2" element={<TeamMail teamName="Issuance 2" />} />
          <Route path="/maintenance" element={<TeamMail teamName="Maintenance" />} />
          <Route path="/registrations" element={<TeamMail teamName="Registrations" />} />
          <Route path="/cos" element={<TeamMail teamName="COS Team" />} />
          <Route path="/services1" element={<TeamMail teamName="Services 1" />} />
          <Route path="/services2" element={<TeamMail teamName="Services 2" />} />
          <Route path="/services3" element={<TeamMail teamName="Services 3" />} />
          <Route path="/services4" element={<TeamMail teamName="Services 4" />} />
          <Route path="/services5" element={<TeamMail teamName="Services 5" />} />
          <Route path="/services6" element={<TeamMail teamName="Services 6" />} />
          <Route path="/services7" element={<TeamMail teamName="Services 7" />} />
          <Route path="/certify" element={<TeamMail teamName="Certify" />} />
          <Route path="/translations" element={<TeamMail teamName="Services 7" />} />
          <Route path="/onhold" element={<TeamMail teamName="On Hold Mail" />} />
        </Routes>
      </Box>
      </ThemeProvider>
  );
}

export default App;