import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "8px",
    marginRight: theme.spacing(1),
  },
  title: {
    fontWeight: "bold",
    lineHeight: 1,
  },
  time: {
    paddingLeft: "5px",
    fontWeight: "bold",
    lineHeight: 1,
  },
}));

type Props = {
  title: String;
  time: String;
};

const TimeItem = ({ title, time }: Props) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.paper}>
      <Typography variant="subtitle2" className={classes.title}>
        {title} :
      </Typography>
      <Typography
        variant="subtitle1"
        className={classes.time}
        color="secondary"
      >
        {time}
      </Typography>
    </Paper>
  );
};

export default TimeItem;
