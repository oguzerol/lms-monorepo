import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import React from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {
  Button,
  Typography,
  Grid,
  Theme,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
      padding: "50px",
      "&:focus": {
        outline: "none",
      },
    },
    logout: {
      whiteSpace: "nowrap",
    },
    finishExam: {
      whiteSpace: "nowrap",
      marginTop: "30px",
    },
  })
);

export default function ExamFinish({ finishExam }: { finishExam: any }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinishExam = () => {
    finishExam.mutate();
  };

  return (
    <div>
      <Button
        color="secondary"
        variant="contained"
        onClick={handleOpen}
        className={classes.logout}
      >
        {!isMobile && "SINAVI"} BİTİR
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <Typography variant="h5">
            Sinavi bitirmek istediginizden emin misiniz?
            <br />
            Bitirdiginiz takdirde tekrar baslayamayacaksiniz.
          </Typography>
          <Grid container spacing={isMobile ? 0 : 3}>
            <Grid item xs>
              <Button
                className={classes.finishExam}
                color="secondary"
                variant="contained"
                fullWidth
                onClick={handleFinishExam}
              >
                SINAVI BİTİRMEK İSTİYORUM
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                className={classes.finishExam}
                variant="outlined"
                fullWidth
                onClick={handleClose}
              >
                VAZGEÇ
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
