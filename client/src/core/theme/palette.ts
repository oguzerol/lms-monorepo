import { Theme } from "../redux/slices/theme";

const white = "#FFFFFF";
const black = "#000000";

const getPalette = (type: Theme) => {
  if (type === "dark") {
    return {
      type,
      black,
      white,
      primary: {
        main: "#9D9898",
      },
      secondary: {
        main: "#B21C1A",
        contrastText: "#fff",
      },
    };
  } else {
    return {
      type,
      black,
      white,
      primary: {
        main: "#413D3D",
      },
      secondary: {
        main: "#B21C1A",
        contrastText: "#fff",
      },
    };
  }
};

export default getPalette;
