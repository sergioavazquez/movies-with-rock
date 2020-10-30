import React from "react";
import PropTypes from "prop-types";
import { ErrorNotification } from "models/notifications";
import css from "./spa.module.scss";

const block = "spa";

interface ErrorNotificationsProps {
  error: ErrorNotification;
}

const SinglePageApp = ({ error }: ErrorNotificationsProps) => {
  return (
    <div className={css[`${block}__main`]}>
      <h1>Hello!!</h1>
      <h2>{error.errorMsg}</h2>
    </div>
  );
};

SinglePageApp.defaultProps = {
  error: {
    code: 400,
    errorMsg: "Oops",
  },
};

SinglePageApp.propTypes = {
  error: PropTypes.shape({
    code: PropTypes.number,
    errorMsg: PropTypes.string,
  }),
};

export default SinglePageApp;
