import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      [theme.breakpoints.down("sm")]: {
        position: "absolute",
        top: "calc(50% - 30px)",
        padding: "0",
      },
    },
  };
});

const Nav = ({
  next = false,
  currentQuestionIndex,
  changeCurrentQuestion,
}: {
  next?: boolean;
  currentQuestionIndex: number;
  changeCurrentQuestion: Function;
}) => {
  const classes = useStyles();

  const handleClick = () => {
    const newQuestionNumber = next
      ? currentQuestionIndex + 1
      : currentQuestionIndex - 1;
    if (!(newQuestionNumber <= -1 || newQuestionNumber > 79)) {
      changeCurrentQuestion(newQuestionNumber);
    }
  };
  return (
    <IconButton className={classes.root} onClick={handleClick}>
      {next ? (
        <ArrowForwardIcon fontSize="large" />
      ) : (
        <ArrowBackIcon fontSize="large" />
      )}
    </IconButton>
  );
};

export default Nav;
