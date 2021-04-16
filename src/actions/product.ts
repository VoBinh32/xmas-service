import fakeStore from "../apis/fakeStore";
import * as constants from "./types";
import { IProduct } from "../types";
import { Dispatch } from "react";

export interface FetchProduct {
  type: constants.FETCH_PRODUCT;
  payload: IProduct;
}

export interface ApproveProduct {
  type: constants.APPROVE_PRODUCT;
  payload: { productId: number; userId: number };
}

export interface RejectProduct {
  type: constants.REJECT_PRODUCT;
  payload: { productId: number; userId: number };
}

export const fetchProduct = (id: number) => async (
  dispatch: Dispatch<FetchProduct>
) => {
  const response = await fakeStore.get(`/products/${id}`);

  dispatch({ type: constants.FETCH_PRODUCT, payload: response.data });
};

export const approveProduct = (userId: number, productId: number) => (
  dispatch: Dispatch<ApproveProduct>
) => {
  dispatch({
    type: constants.APPROVE_PRODUCT,
    payload: { productId, userId },
  });
};

export const rejectProduct = (userId: number, productId: number) => (
  dispatch: Dispatch<RejectProduct>
) => {
  dispatch({
    type: constants.REJECT_PRODUCT,
    payload: { productId, userId },
  });
};

export type ProductActions = FetchProduct | ApproveProduct | RejectProduct;
