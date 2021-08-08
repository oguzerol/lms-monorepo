import { useFormik } from "formik";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { API_RESET_PASSWORD, URL_LOGIN } from "../../core/route/constants";
import { Button } from "@material-ui/core";
import { useState } from "react";

const validationSchema = yup.object({
  newPassword: yup
    .string()
    .min(8, "Şifre en az sekiz karakterden oluşmalıdır.")
    .required("Şifre gereklidir."),
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  succeed: {
    color: theme.palette.success.dark,
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const [isSucceed, setIsSucceed] = useState(false);

  const history = useHistory();
  const { token }: { token: string } = useParams();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      api: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      await axios
        .put(API_RESET_PASSWORD, {
          newPassword: values.newPassword,
          resetLink: token,
        })
        .then((res) => {
          setIsSucceed(true);
          setTimeout(() => {
            history.push(URL_LOGIN);
          }, 3000);
        })
        .catch((err) => {
          setErrors({ api: err.response.data.message });
        });
    },
  });

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Box mb={3} display="flex" alignItems="center" flexDirection="column">
        <Typography component="h1" variant="h4">
          Şifre Resetleme
        </Typography>
      </Box>
      <form
        className={classes.form}
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="newPassword"
              label="Şifreniz"
              type="password"
              placeholder="Şifrenizi giriniz."
              id="newPassword"
              autoComplete="new-newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.newPassword && Boolean(formik.errors.newPassword)
              }
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          {formik.errors.api && (
            <Typography color="secondary">{formik.errors.api}</Typography>
          )}
          {isSucceed && (
            <Typography className={classes.succeed}>
              Şifreniz başarıyla değiştirildi, 3 saniye sonra girişe
              yönlendileceksiniz!
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          fullWidth
          disabled={formik.isSubmitting || isSucceed}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Kaydet
        </Button>
      </form>

      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="www.onlineydt.com">
            onlineydt
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
};

export default ResetPassword;
