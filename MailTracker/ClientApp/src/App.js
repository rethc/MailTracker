import { Box, createTheme } from "@mui/material";
import { useMemo, useState } from "react"; 
import Wrapper from "./components/Wrapper";  
import { Routes, Route} from "react-router-dom"; 
import {  grey } from "@mui/material/colors";
import { ThemeProvider } from '@mui/material/styles';
import Search from "./components/Search"; 
import TeamMail from "./components/TeamMail";
import Scan from "./components/Scan";

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
          <Route path="/" element={<Scan title="Incoming" />} />
          <Route path="/scanout" element={<Scan title="Outgoing" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/issuance1" element={<TeamMail teamName="Issuance 1" />} />
        </Routes>
      </Box>
      </ThemeProvider>
  );
}

export default App;