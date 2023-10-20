import { createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
  palette: {
    secondary: blueGrey,
  },
});

export default theme;
