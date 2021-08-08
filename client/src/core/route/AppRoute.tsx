import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/auth";

import EmptyLayout from "../layouts/EmptyLayout";
import { URL_LOGIN } from "./constants";
import Loading from "../../components/Loading";

type Props = {
  component: React.FC<RouteComponentProps>;
  path: string;
  layout?: React.FunctionComponent | typeof EmptyLayout;
  privateRoute?: boolean;
  exact?: boolean;
};

const AppRoute = ({
  component: Component,
  path,
  layout: Layout = EmptyLayout,
  privateRoute = false,
  exact = false,
  ...rest
}: Props) => {
  const auth = useSelector(selectAuth);
  const { isAuthenticated, isLoading } = auth;

  const renderLayout = (props: RouteComponentProps) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );

  return (
    <Route
      path={path}
      exact={exact}
      {...rest}
      render={(props) => {
        if (isLoading) {
          return <Loading type="pageLoad" />;
        }
        if (privateRoute && isAuthenticated === false) {
          return <Redirect to={URL_LOGIN} />;
        }
        return renderLayout(props);
      }}
    />
  );
};

export default AppRoute;
