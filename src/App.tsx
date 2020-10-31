import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { Actions, AppActions } from "redux/app/actions";
import { getConfig } from "utils/index";
import { ErrorScreen } from "components/notifications";
import { Config } from "models/system";
import { GlobalState } from "redux/reducers";
import Routes from "routes";
import "App.scss";

class App extends Component<AppProps, {}> {
  static defaultProps = { appReducer: {} };

  componentDidMount() {
    const { initApp } = this.props;
    initApp(getConfig() as Config);
  }

  componentDidCatch(error: Error, errorInfo: object) {
    // This should be an error service.
    console.log(error, errorInfo);
  }

  render() {
    const { mainError } = this.props;
    let appRender;
    if (mainError.code) {
      appRender = <ErrorScreen error={mainError} />;
    } else {
      // appRender = Routes({ config });
      appRender = Routes({});
    }
    return <div className="app">{appRender}</div>;
  }
}

function mapStateToProps(state: GlobalState) {
  const { mainError, config } = state.appReducer;
  return {
    config,
    mainError,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => {
  return {
    // This is the first method to be executed, if it fails it displays an error.
    initApp(config: Config): void {
      if (config) {
        dispatch(Actions.setSystemConfig(config));
      } else {
        dispatch(Actions.setError("400", "Missing Config"));
      }
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AppProps = PropsFromRedux & {
  appReducer: any;
};

export default connector(App);
