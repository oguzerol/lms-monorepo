import { makeStyles, Button } from "@material-ui/core";
import cn from "classnames";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flex: 1,
      width: "100%",
      justifyContent: "left",
      textAlign: "left",
      padding: "6px 20px",
      lineHeight: "1.50",
      "&:not(:last-child)": {
        marginBottom: "10px",
      },
      "&.MuiButton-text": {
        border: "1px solid transparent",
      },
      "&.MuiButton-outlined": {
        backgroundColor: theme.palette.grey[800],
        border: `1px solid ${theme.palette.grey[700]}`,
        color: theme.palette.info.contrastText,
      },
    },
    isSelected: {
      backgroundColor:
        theme.palette.type === "dark"
          ? "rgba(255, 255, 255, 0.08)!important"
          : "",
    },
    correct: {
      backgroundColor: `${theme.palette.success.dark} !important`,
      color: theme.palette.info.contrastText,
    },
    empty: {
      backgroundColor: `${
        theme.palette.type === "dark" ? "#68582e" : "#cdac56"
      }!important`,
    },

    icon: {
      paddingRight: "25px",
      fontSize: "22px",
      lineHeight: "25px",
    },
  };
});

const Answer = ({
  handleChange,
  isSelected,
  text,
  isCorrect,
  label,
  userAnswer,
}: {
  handleChange: Function;
  isSelected?: Boolean;
  isCorrect?: Boolean;
  text: String;
  label: String;
  userAnswer?: number;
}) => {
  const classes = useStyles();

  let isCorrectAnswerGiven = typeof isCorrect === "boolean";

  return (
    <Button
      className={cn(classes.root, {
        [classes.correct]: isCorrectAnswerGiven && isCorrect,
        [classes.isSelected]: isSelected,
        [classes.empty]: isCorrectAnswerGiven && !userAnswer && isCorrect,
      })}
      onClick={() => handleChange()}
      variant={isSelected ? "outlined" : "text"}
    >
      <span className={classes.icon}>{text}</span>
      <span>{label}</span>
    </Button>
  );
};

export default Answer;
