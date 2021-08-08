import {
  Box,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectAuth } from "../../core/redux/slices/auth";
import UpcomingExamCard from "./UpcomingExamCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "150px",
      display: "flex",
      flexDirection: "column",
      padding: "15px",
    },
  })
);

const UpComingExam = () => {
  const classes = useStyles();
  const { user } = useSelector(selectAuth);

  return (
    <Paper className={classes.root}>
      <Typography component="div" variant="h6">
        <Box fontWeight="fontWeightBold">Merhaba {user?.username},</Box>
      </Typography>
      <UpcomingExamCard />
    </Paper>
  );
};

export default UpComingExam;
