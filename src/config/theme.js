import { createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const primary = {
  main: "#cf562a",
  light: "#dd896a",
  dark: "#913c1d",
  contrastText: "#fff",
};

const theme = createTheme({
  typography: {
    fontFamily: ["Exoplanetaria", "sans-serif"].join(","),
  },
  palette: {
    primary: primary,
    secondary: blueGrey,
  },
});

export default theme;
