import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from "@material-ui/core/colors/blueGrey";
// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: "dark",
    color: blueGrey["A400"]
  },
});

export default theme;
