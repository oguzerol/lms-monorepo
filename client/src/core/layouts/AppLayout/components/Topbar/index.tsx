import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Switch } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteAuth } from "../../../../redux/slices/auth";
import { URL_DASHBOARD, URL_LOGIN } from "../../../../route/constants";
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
      width: 90,
      paddingLeft: theme.spacing(1),
      height: "100%",
    },
    toolbar: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    menuIcon: {
      paddingLeft: 1,
      "&:hover ,&:focus": {
        background: "transparent",
      },
    },
    logoutIcon: {
      paddingRight: 0,
      "&:hover ,&:focus": {
        background: "transparent",
      },
    },
  })
);

type Props = {
  open: boolean;
  handleDrawerToggle: () => void;
};

const Topbar = ({ open, handleDrawerToggle }: Props) => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(selectIsDarkTheme);
  const history = useHistory();

  const classes = useStyles();

  const handleThemeChange = () => {
    const currentTheme = isDarkTheme ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    dispatch(toggleTheme(currentTheme));
  };

  const handleLogout = () => {
    dispatch(deleteAuth());
    localStorage.removeItem("token");
    axios.defaults.headers.common.token = null;
    history.replace(URL_LOGIN);
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      className={clsx(classes.appBar)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          className={classes.menuIcon}
          onClick={handleDrawerToggle}
          disableRipple
        >
          <MenuIcon />
        </IconButton>
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
        <IconButton
          color="inherit"
          className={classes.logoutIcon}
          onClick={handleLogout}
          disableRipple
        >
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
