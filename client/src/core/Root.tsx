import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Toaster } from "react-hot-toast";

import AppLayout from "./layouts/AppLayout";
import getTheme from "../core/theme";
import AppRoute from "./route/AppRoute";
import {
  URL_DASHBOARD,
  URL_EXAM,
  URL_LOGIN,
  URL_REGISTER,
  URL_MY_EXAMS,
  URL_EXAMS,
  URL_RESULTS,
  URL_KVKK,
  URL_RESET_PASSWORD,
} from "./route/constants";
import { selectTheme } from "./redux/slices/theme";
import { SocketProvider } from "./contexts/socket";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import NotFound from "../pages/NotFound";
import MyExams from "../pages/MyExams";
import Exam from "../pages/Exam";
import Result from "../pages/Result";
import ExamLayout from "./layouts/ExamLayout";
import ResultLayout from "./layouts/ResultLayout";
import Results from "../pages/Results";
import Products from "../pages/Exams";
import KVKK from "../pages/KVKK";

import "../assets/fonts.css";

const queryClient = new QueryClient();

const Root = () => {
  const theme = useSelector(selectTheme);
  return (
    <ThemeProvider theme={getTheme(theme)}>
      <CssBaseline />
      <Toaster position="bottom-right" reverseOrder={false} />
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Switch>
              <AppRoute
                exact
                path={URL_DASHBOARD}
                component={Dashboard}
                privateRoute
                layout={AppLayout}
              />
              <AppRoute
                exact
                path={`${URL_EXAMS}`}
                component={Products}
                privateRoute
                layout={AppLayout}
              />
              <AppRoute
                exact
                path={URL_MY_EXAMS}
                component={MyExams}
                privateRoute
                layout={AppLayout}
              />
              <AppRoute
                exact
                path={URL_RESULTS}
                component={Results}
                privateRoute
                layout={AppLayout}
              />
              <AppRoute
                exact
                path={`${URL_EXAM}/:examId`}
                component={Exam}
                privateRoute
                layout={ExamLayout}
              />
              <AppRoute
                exact
                path={`${URL_RESULTS}/:examId`}
                component={Result}
                privateRoute
                layout={ResultLayout}
              />

              <AppRoute path={URL_LOGIN} component={Login} />
              <AppRoute path={URL_REGISTER} component={Register} />
              <AppRoute path={URL_RESET_PASSWORD} component={ResetPassword} />
              <AppRoute path={URL_KVKK} component={KVKK} />
              <AppRoute path={`*`} component={NotFound} privateRoute />
            </Switch>
          </Router>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SocketProvider>
    </ThemeProvider>
  );
};

export default Root;
