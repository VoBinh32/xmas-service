import fakeStore from "../apis/fakeStore";

import * as constants from "./types";
import { ICart } from "../types";
import { Dispatch } from "react";

export interface FetchCart {
  type: constants.FETCH_CART;
  payload: ICart;
}

export interface FetchCartSuccess {
  type: constants.FETCH_CART_SUCCESS;
  payload: ICart;
}

export const fetchCart = (userId: number) => async (
  dispatch: Dispatch<FetchCart>
) => {
  const response = await fakeStore.get(`/carts/user/${userId}`);
  dispatch({ type: constants.FETCH_CART, payload: { ...response.data } });
};

export function fetchCartSuccess(cart: ICart): FetchCartSuccess {
  return {
    type: constants.FETCH_CART_SUCCESS,
    payload: cart,
  };
}
