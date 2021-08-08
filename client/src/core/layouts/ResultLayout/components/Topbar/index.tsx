import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { Button, Switch } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { URL_DASHBOARD } from "../../../../route/constants";
import ydtLogoDark from "../../../../../assets/images/ydt_logo_dark.png";
import ydtLogo from "../../../../../assets/images/ydt_logo.png";
import { selectIsDarkTheme, toggleTheme } from "../../../../redux/slices/theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    hide: {
      display: "none",
    },
    flexGrow: {
      flexGrow: 1,
    },
    ydtLink: {
      display: "flex",
    },
    ydtLogo: {
      width: 70,
      [theme.breakpoints.up("md")]: {
        width: 90,
      },
      height: "100%",
    },
    toolbar: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      [theme.breakpoints.up("md")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    menuIcon: {
      paddingLeft: 1,
      "&:hover ,&:focus": {
        background: "transparent",
      },
    },
    logoutIcon: {
      whiteSpace: "nowrap",
      paddingRight: 0,
      "&:hover ,&:focus": {
        background: "transparent",
      },
    },
  })
);

const Topbar = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const isDarkTheme = useSelector(selectIsDarkTheme);

  const classes = useStyles();

  const handleThemeChange = () => {
    const currentTheme = isDarkTheme ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    dispatch(toggleTheme(currentTheme));
  };

  const handleOpen = () => {
    history.push(URL_DASHBOARD);
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      className={clsx(classes.appBar)}
    >
      <Toolbar className={classes.toolbar}>
        <Link to={URL_DASHBOARD} className={classes.ydtLink}>
          <img
            src={isDarkTheme ? ydtLogoDark : ydtLogo}
            alt="YDT logo"
            className={classes.ydtLogo}
          />
        </Link>
        <div className={classes.flexGrow} />
        <Switch
          checked={isDarkTheme}
          onChange={handleThemeChange}
          color="secondary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <Button color="secondary" variant="contained" onClick={handleOpen}>
          KAPAT
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
