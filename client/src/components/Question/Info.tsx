import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      fontSize: "18px",
      padding: "0 10px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
  };
});

const Info = ({ currentQuestionInfo }: { currentQuestionInfo?: String }) => {
  const classes = useStyles();

  return !currentQuestionInfo ? null : (
    <Typography className={classes.root}>{currentQuestionInfo}</Typography>
  );
};

export default Info;
