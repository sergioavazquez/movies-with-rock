import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import css from "./transitions.module.scss";

interface Props {
  showContent: boolean;
  content: Function;
  placeholder: Function;
  time?: number;
  type?: string;
}
const SmoothSwitch: React.FC<Props> = ({
  showContent,
  content,
  placeholder,
  time = 600,
  type = "fade",
}) => {
  const nodeRef = React.useRef(null);
  const nodeRefPh = React.useRef(null);

  const animationPrefix = `smooth-${type}`;
  const transitionNames = {
    enter: css[`${animationPrefix}-enter`],
    enterActive: css[`${animationPrefix}-enter-active`],
    enterDone: css[`${animationPrefix}-enter-done`],
    exit: css[`${animationPrefix}-exit`],
    exitActive: css[`${animationPrefix}-exit-active`],
    exitDone: css[`${animationPrefix}-exit-done`],
  };
  const timing = { enter: time, exit: time };
  const loaderTransitionProps = {
    timeout: timing,
    classNames: transitionNames,
  };

  return (
    <TransitionGroup timeout={timing} component={null}>
      {showContent && (
        <CSSTransition
          nodeRef={nodeRef}
          in={showContent}
          {...loaderTransitionProps}
        >
          <div ref={nodeRef}>{content()}</div>
        </CSSTransition>
      )}
      {!showContent && (
        <CSSTransition
          in={!showContent}
          nodeRef={nodeRefPh}
          {...loaderTransitionProps}
        >
          <div ref={nodeRefPh}>{placeholder()}</div>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

SmoothSwitch.defaultProps = {
  time: 600,
  type: "fade",
};

export default SmoothSwitch;
