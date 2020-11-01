import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  BrowserRouter as Router,
} from "react-router-dom";
import { getConfig } from "utils";
import { ErrorScreen } from "components/notifications";
import SinglePageApp from "components/SinglePageApp";

const defaultPaths = {
  ROOT: "/",
  NOT_FOUND: "/404",
};

const { paths } = getConfig();

const renderRoutes = withRouter(() => {
  const Paths = paths ?? defaultPaths;
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

const Routes = () => {
  return <Router>{new renderRoutes({})}</Router>;
};

export default Routes;
