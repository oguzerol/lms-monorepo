import { createMuiTheme } from "@material-ui/core";
import getPalette from "./palette";
import overrides from "./overrides";
import { Theme } from "../redux/slices/theme";

const getTheme = (type: Theme) => {
  return createMuiTheme({
    overrides,
    palette: getPalette(type),
    typography: {
      fontFamily: [
        "Nunito",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });
};

export default getTheme;
