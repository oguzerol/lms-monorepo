import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { Switch } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  API_USER_EXAMS,
  URL_DASHBOARD,
  URL_RESULTS,
} from "../../../../route/constants";
import ydtLogoDark from "../../../../../assets/images/ydt_logo_dark.png";
import ydtLogo from "../../../../../assets/images/ydt_logo.png";
import { selectIsDarkTheme, toggleTheme } from "../../../../redux/slices/theme";

import ExamTimer from "../../../../../components/ExamTimer";
import ExamFinish from "../../../../../components/ExamFinish";
import { useMutation, useQueryClient } from "react-query";
import { ExamType } from "../../../../types/exam";
import useUserExam from "../../../../querys/useUserExam";
import { toastError } from "../../../../utils/toaster";

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
  const queryClient = useQueryClient();
  const { examId }: { examId?: String } = useParams();
  const history = useHistory();

  const { data: exam }: { data?: ExamType; isLoading: any; error: any } =
    useUserExam(examId);

  const examEndTime = exam?.standalone_end_time;

  const dispatch = useDispatch();
  const isDarkTheme = useSelector(selectIsDarkTheme);

  const classes = useStyles();

  const handleThemeChange = () => {
    const currentTheme = isDarkTheme ? "light" : "dark";
    localStorage.setItem("theme", currentTheme);
    dispatch(toggleTheme(currentTheme));
  };

  const finishExamMutation = useMutation(
    () => axios.put(`${API_USER_EXAMS}/${examId}/end`),
    {
      onError: (error: any) => {
        toastError(`Bir hata ${error.response.data.message}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries("UserExams");
        queryClient.invalidateQueries("UserResults");
        history.push(URL_RESULTS);
      },
    }
  );

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
        {exam && (
          <>
            <ExamTimer endTime={examEndTime} />
            <ExamFinish finishExam={finishExamMutation} />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
