import { useFormik } from "formik";
import axios from "axios";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
import * as yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import {
  API_LOGIN,
  URL_DASHBOARD,
  URL_REGISTER,
} from "../../core/route/constants";
import { selectAuth, setAuth } from "../../core/redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "@material-ui/core";
import ForgotPassword from "../../components/ForgotPassword";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Geçerli bir email adresi giriniz.")
    .required("Email gerekli."),
  password: yup
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
  paperWrapper: {
    [theme.breakpoints.down("xs")]: {
      width: "85vw",
    },
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
}));

const Login = () => {
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      api: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      await axios
        .post(API_LOGIN, {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          axios.defaults.headers.common.token = response.data.token;
          localStorage.setItem("token", response.data.token);

          dispatch(setAuth(response.data.user));
          history.replace(URL_DASHBOARD);
        })
        .catch((err: any) => {
          setErrors({ api: err.response.data.message });
        });
    },
  });

  const toggleForgotPasswordModal = () => {
    setIsForgotModalOpen(!isForgotModalOpen);
  };

  if (isAuthenticated) return <Redirect to={URL_DASHBOARD} />;

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Box mb={3} display="flex" alignItems="center" flexDirection="column">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Giriş Yap
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
              placeholder="Email adresinizi giriniz."
              id="email"
              label="E-mail Adresiniz"
              name="email"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="text"
                disableRipple
                disableFocusRipple
                disableElevation
                color={"primary"}
                onClick={toggleForgotPasswordModal}
                style={{
                  textTransform: "capitalize",
                  backgroundColor: "transparent",
                }}
              >
                Şifremi Unuttum
              </Button>
            </Box>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Şifreniz"
              type="password"
              placeholder="Şifrenizi giriniz."
              id="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          {formik.errors.api && (
            <Typography color="secondary">{formik.errors.api}</Typography>
          )}
        </Box>
        <Button
          type="submit"
          fullWidth
          disabled={formik.isSubmitting}
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Giriş Yap
        </Button>
        <Typography color="textSecondary" variant="body2" align="right">
          Hesabın yok mu?{" "}
          <Link
            component={RouterLink}
            to={URL_REGISTER}
            variant="body2"
            color="secondary"
          >
            Üye ol
          </Link>
        </Typography>
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
      <Modal
        open={isForgotModalOpen}
        onClose={toggleForgotPasswordModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paperWrapper}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={toggleForgotPasswordModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <ForgotPassword />
        </div>
      </Modal>
    </Container>
  );
};

export default Login;
