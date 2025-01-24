import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b84de4",
      contrastText: "#00000"
    },
    secondary: {
      main: "#ff4081",
    },
    success: {
      main: "#4caf50", 
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800", 
    },
    info: {
      main: "#2196f3", 
    },
  },
});

export default theme;