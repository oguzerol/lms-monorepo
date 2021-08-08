import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { API_FORGOT_PASSWORD } from "../../core/route/constants";
import { useState } from "react";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz.")
    .required("Email gerekli."),
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paperWrapper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    top: "50%",
    left: "50%",
    maxHeight: "80vh",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    "&:focus": {
      outline: "none",
    },
  },
  succeed: {
    color: theme.palette.success.dark,
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();

  const [isSucceed, setIsSucceed] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      api: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      await axios
        .post(API_FORGOT_PASSWORD, {
          email: values.email,
        })
        .then((response) => {
          setIsSucceed(true);
        })
        .catch((err: any) => {
          setErrors({ api: err.response.data.message });
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Container maxWidth="md" className={classes.root}>
      <Box mb={3}>
        <Typography variant="h5">Şifrenizi Yenileyiniz</Typography>
      </Box>
      <Typography>
        Şifre yenileme linki e-posta adresinize gönderilecektir. Yolladığımız
        e-postayı göremiyorsanız gereksiz (spam) kutunuzu kontrol etmeyi
        unutmayın!
      </Typography>
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
              placeholder="Email adresinizi giriniz."
              id="email"
              disabled={formik.isSubmitting || isSucceed}
              label="E-mail Adresiniz"
              name="email"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          {formik.errors.api && (
            <Typography color="secondary">{formik.errors.api}</Typography>
          )}
          {isSucceed && (
            <Typography className={classes.succeed}>
              E-Mail Gönderildi!
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
          E-posta Gönder
        </Button>
      </form>
    </Container>
  );
};

export default ForgotPassword;
