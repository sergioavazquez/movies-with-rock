import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  BrowserRouter as Router,
} from "react-router-dom";

import { ErrorScreen } from "components/notifications";
import SinglePageApp from "components/SinglePageApp";
// import { Config } from "models/system";

const defaultPaths = {
  ROOT: "/",
  NOT_FOUND: "/404",
};

const renderRoutes = withRouter(() => {
  // const paths = useSelector(selectRoutes);
  // const Paths = paths !== null ? paths : defaultPaths;
  const Paths = defaultPaths;
  return (
    <Switch>
      <Route exact path={Paths.ROOT} render={() => <SinglePageApp />} />
      <Route
        path={Paths.NOT_FOUND}
        component={() => (
          <ErrorScreen error={{ code: "404", errorMsg: "Page not found." }} />
        )}
      />
      <Redirect to={Paths.NOT_FOUND} />
    </Switch>
  );
});

interface RoutesProps {
  // config: Config | null;
  location?: string;
}

const Routes = ({ location }: RoutesProps) => {
  // if (!config) {
  //   return <></>;
  // }
  return <Router>{new renderRoutes({ location })}</Router>;
};

Routes.defaultProps = {
  // config: {},
  location: null,
};

export default Routes;
