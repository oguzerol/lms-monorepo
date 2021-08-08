import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: "absolute",
      top: 0,
      width: "100%",
      textAlign: "center",
    },
    currentQuestion: {
      paddingBottom: "22px",
      paddingTop: "5px",
      fontSize: "28px",
      margin: 0,
    },
  };
});

const QuestionNumber = ({
  currentQuestionIndex,
}: {
  currentQuestionIndex: number;
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.currentQuestion}>
        {currentQuestionIndex + 1}
      </Typography>
    </div>
  );
};

export default QuestionNumber;
