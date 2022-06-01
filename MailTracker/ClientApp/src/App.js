import { Box, createTheme } from "@mui/material";
import { useMemo, useState } from "react"; 
import Wrapper from "./components/Wrapper";  
import { Routes, Route} from "react-router-dom";
import ScanOut from "./components/ScanOut";
import ScanIn from "./components/ScanIn";
import { blue,  grey } from "@mui/material/colors";

import { ThemeProvider } from '@mui/material/styles';
import Search from "./components/Search"; 

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: "#00465D",
      ...(mode === 'dark' && {
        main: blue[300],
      }),
    },
    background: {
      default: "#f5f5f5", 
    },
    ...(mode === 'dark' && {
      background: {
        //default: deepOrange[900],
        //paper: deepOrange[900],
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
  const colorMode = useMemo(
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
          <Route path="/" element={<ScanIn />} />
          <Route path="/scanout" element={<ScanOut />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Box>
      </ThemeProvider>
  );
}

export default App;