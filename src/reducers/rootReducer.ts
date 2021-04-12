import { combineReducers } from "redux";
import cartsReducer from "./cartsReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  children: usersReducer,
  carts: cartsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
