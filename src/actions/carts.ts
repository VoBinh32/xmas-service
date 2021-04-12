import fakeStore from "../apis/fakeStore";
import { v4 as uuidv4 } from "uuid";
import { FetchUsers, fetchUsers } from "./children";
import * as constants from "./types";
import { ICart, IUser } from "../types";
import { Dispatch } from "react";

export interface FetchCart {
  type: constants.FETCH_CART;
  payload: ICart;
}

export interface FetchCarts {
  type: constants.FETCH_CARTS;
  payload: ICart[];
}

export const fetchCart = (userId: number) => async (
  dispatch: Dispatch<FetchCart>
) => {
  const response = await fakeStore.get(`/carts/user/${userId}`);

  dispatch({ type: constants.FETCH_CART, payload: { ...response.data } });
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
    const response = a.map((item: any) => ({ ...item.data[0], id: uuidv4() }));

    dispatch({
      type: constants.FETCH_CARTS,
      payload: response,
    });
  }
};

export type CartsActions = FetchCart | FetchCarts;
