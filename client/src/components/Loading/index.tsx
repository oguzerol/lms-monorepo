import { createStyles, makeStyles, Theme } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    base: {},
    pageLoad: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
  })
);

type Props = {
  type?: "pageLoad" | "base";
};

const Loading = ({ type = "base" }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes[type]}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
