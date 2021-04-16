import { combineReducers } from "redux";
import cartsReducer from "./cartsReducer";
import productsReducer from "./productsReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  children: usersReducer,
  carts: cartsReducer,
  products: productsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
