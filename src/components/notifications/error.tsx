import React from "react";
import PropTypes from "prop-types";
import { ErrorNotification } from "models/notifications";
import css from "./error.module.scss";

const block = "error";

interface ErrorNotificationsProps {
  error: ErrorNotification;
}

const ErrorScreen = ({ error }: ErrorNotificationsProps) => {
  return (
    <div className={css[`${block}__main`]}>
      <h1>{error.code}</h1>
      <h2>{error.errorMsg}</h2>
    </div>
  );
};

ErrorScreen.defaultProps = {
  error: {
    code: "400",
    errorMsg: "Oops",
  },
};

ErrorScreen.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.string,
    errorMsg: PropTypes.string,
  }),
};

export { ErrorScreen };
