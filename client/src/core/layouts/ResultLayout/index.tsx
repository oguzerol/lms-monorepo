import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { Topbar } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "66px 10px 10px",
    height: "100vh",
    maxWidth: "100vw",
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
      padding: "84px 20px 20px",
    },
  },
  content: {
    overflow: "hidden",
    height: "100%",
  },
}));

type Props = {
  children: React.ReactNode;
};

const ResultLayout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <div
      className={clsx({
        [classes.root]: true,
      })}
    >
      <Topbar />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

ResultLayout.propTypes = {
  children: PropTypes.node,
};

export default ResultLayout;
