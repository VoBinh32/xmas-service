import fakeStore from "../apis/fakeStore";
import { fetchUser, fetchUsers } from "./children";
import * as constants from "./types";
import { ICart, IUser } from "../types";
import { Dispatch } from "react";
import { fetchProduct } from "./product";

export interface FetchCart {
  type: constants.FETCH_CART;
  payload: ICart;
}

export interface FetchCarts {
  type: constants.FETCH_CARTS;
  payload: ICart[];
}

export const fetchCart = (userId: number) => async (
  dispatch: Dispatch<any>
) => {
  const response = await fakeStore.get(`/carts/user/${userId}`);

  const products = response.data[0].products;

  products.forEach((product: { productId: number; quantity: number }) => {
    const { productId } = product;
    dispatch(fetchProduct(productId));
  });

  dispatch(fetchUser(response.data[0].userId));

  dispatch({
    type: constants.FETCH_CART,
    payload: { ...response.data[0] },
  });
};

export const fetchCarts = () => async (
  dispatch: Dispatch<any>,
  getState: any
) => {
  await dispatch(fetchUsers());
  const promises: any = [];
  const children: IUser[] = Object.values(getState().children);

  if (children.length === 5) {
    for (let i = 0; i < children.length; i++) {
      await promises.push(
        fakeStore.get(`/carts/user/${children[i] ? children[i].id : null}`)
      );
    }

    const a = await Promise.all(promises);
    const response = a.map((item: any) => ({ ...item.data[0] }));

    dispatch({
      type: constants.FETCH_CARTS,
      payload: response,
    });
  }
};

export type CartsActions = FetchCart | FetchCarts;
