interface BaseAction {
  type: string;
}

export const createReducer = <State, Action extends BaseAction>(
  initialState: State,
  handlers: {
    [handlerName: string]: Function;
  }
) => {
  return (state = initialState, action: Action): State => {
    const handler = handlers[action.type];
    let updatedState = state;

    if (handler) {
      updatedState = handler(state, action);
    }
    return updatedState;
  };
};
