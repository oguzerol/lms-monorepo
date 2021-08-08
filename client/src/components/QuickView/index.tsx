import { Paper, makeStyles, Button, Grid } from "@material-ui/core";
import cn from "classnames";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      paddingLeft: 12,
      [theme.breakpoints.down("sm")]: {
        marginBottom: 10,
      },
      "& button": {
        textAlign: "center",
        minWidth: "inherit",
        borderRadius: "20px",
        height: "28px",
        width: "30px",
        lineHeight: "14px",
        padding: 0,
      },
      "& .MuiGrid-grid-xs-3": {
        maxWidth: "12%",
      },
    },
    container: {
      padding: "10px 0",
      [theme.breakpoints.down("sm")]: {
        padding: "10px 10px 0 10px",
        flexWrap: "nowrap",
        maxWidth: "calc(100vw - 32px)",
        overflowY: "auto",
      },
    },
    answered: {
      background: theme.palette.grey[800],
      color: theme.palette.getContrastText(theme.palette.grey[800]),
    },
    correct: {
      backgroundColor: theme.palette.success.dark,
    },
    wrong: {
      backgroundColor: theme.palette.error.dark,
    },
    empty: {
      backgroundColor: `${
        theme.palette.type === "dark" ? "#68582e" : "#cdac56"
      }`,
    },
    buttonWrapper: {
      textAlign: "center",
      marginBottom: "10px",
    },
  };
});

type List = {
  question_id: number;
  userAnswerId?: number;
  correctAnswerId?: number;
};

const QuickView = ({
  list,
  changeCurrentQuestion,
}: {
  list?: Array<List>;
  changeCurrentQuestion: Function;
  questionsLength: number;
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <Grid container className={classes.container}>
        {list &&
          list.map((answer, index) => {
            let isCorrectAnswerGiven =
              typeof answer.correctAnswerId !== "undefined";

            return (
              <Grid
                item
                xs={3}
                key={`answer_${answer.question_id}`}
                className={classes.buttonWrapper}
              >
                <Button
                  onClick={() => changeCurrentQuestion(index)}
                  className={cn({
                    [classes.answered]: answer.userAnswerId,
                    [classes.correct]:
                      isCorrectAnswerGiven &&
                      answer.userAnswerId === answer.correctAnswerId,
                    [classes.wrong]:
                      isCorrectAnswerGiven &&
                      answer.userAnswerId !== answer.correctAnswerId,

                    [classes.empty]:
                      isCorrectAnswerGiven && !answer.userAnswerId,
                  })}
                  variant={answer.userAnswerId ? "outlined" : "text"}
                >
                  {index + 1}
                </Button>
              </Grid>
            );
          })}
      </Grid>
    </Paper>
  );
};

export default QuickView;
