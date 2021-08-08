import { Paper, makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      paddingLeft: "12px",
      marginTop: "20px",
      flexDirection: "column",
    },
    box: {
      display: "flex",
      alignItems: "center",
      margin: "10px 0",
    },
    count: {
      fontSize: "16px",
      marginLeft: "5px",
    },
  };
});

const ResultCounts = ({
  correct,
  empty,
  wrong,
}: {
  correct: number;
  empty: number;
  wrong: number;
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <Box className={classes.box}>
        Doğru: <strong className={classes.count}>{correct}</strong>
      </Box>
      <Box className={classes.box}>
        Yanlış: <strong className={classes.count}>{wrong}</strong>
      </Box>
      <Box className={classes.box}>
        Boş: <strong className={classes.count}> {empty}</strong>
      </Box>
    </Paper>
  );
};

export default ResultCounts;
