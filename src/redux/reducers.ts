import { combineReducers } from "redux";
import appReducer from "redux/app/reducer";

const rootReducer = combineReducers({ appReducer });

export type GlobalState = ReturnType<typeof rootReducer>;

export default rootReducer;
