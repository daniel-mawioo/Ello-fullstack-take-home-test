import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5ACCCC",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#4AA088",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#f76434",
    },
    warning: {
      main: "#FABD33",
    },
    info: {
      main: "#335c6e",
    },
    success: {
      main: "#53c2c2",
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
