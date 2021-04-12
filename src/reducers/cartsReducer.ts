import _ from "lodash";

import { FETCH_CART, FETCH_CARTS } from "../actions/types";
import { CartsActions } from "../actions/carts";
import { ICart } from "../types";

type CartsState = {
  carts: ICart[] | object;
};

const initialState: CartsState = {
  carts: {},
};

const cartsReducer = (state = initialState.carts, action: CartsActions) => {
  switch (action.type) {
    case FETCH_CART: {
      return { ...state, [action.payload.id]: action.payload };
    }
    case FETCH_CARTS: {
      return { ...state, ..._.mapKeys(action.payload, "id") };
    }
    default:
      return state;
  }
};

export default cartsReducer;
