import { createTheme } from "@mui/material";
import { blueGrey, amber } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
  palette: {
    primary: amber,
    secondary: blueGrey,
  },
});

export default theme;
