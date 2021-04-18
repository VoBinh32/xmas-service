import {
  APPROVE_PRODUCT,
  FETCH_CART,
  FETCH_CARTS,
  REJECT_PRODUCT,
} from "../actions/types";
import { CartsActions } from "../actions/carts";
import { ProductActions } from "../actions/product";
import { ICart } from "../types";

type CartsState = {
  carts: { [key: number]: ICart };
};

const initialState: CartsState = {
  carts: {},
};

const cartsReducer = (
  state = initialState.carts,
  action: CartsActions | ProductActions
) => {
  switch (action.type) {
    case FETCH_CART: {
      return { ...state, [action.payload.userId]: action.payload };
    }
    case FETCH_CARTS: {
      const newState = { ...state };
      action.payload.forEach((cart) => {
        if (cart) {
          newState[cart.userId] = {
            ...cart,
            products: cart.products.map((product) => {
              return {
                ...(state[cart.userId] && state[cart.userId].products.length > 0
                  ? state[cart.userId].products.find(
                      (p) => p.productId === product.productId
                    )
                  : {}),
                ...product,
              };
            }),
          };
        }
      });
      return { ...newState };
    }

    case APPROVE_PRODUCT: {
      const { userId, productId } = action.payload;
      const cart = state[userId];

      if (cart && cart.products && cart.products.length > 0) {
        cart.products = cart.products.map((product) => {
          if (product.productId === productId) {
            return { ...product, isDiscarded: false };
          }
          return product;
        });
      }
      return { ...state, [userId]: cart };
    }
    case REJECT_PRODUCT: {
      const { userId, productId } = action.payload;
      const cart = state[userId];

      if (cart && cart.products && cart.products.length > 0) {
        cart.products = cart.products.map((product) => {
          if (product.productId === productId) {
            return { ...product, isDiscarded: true };
          }
          return product;
        });
      }
      return { ...state, [userId]: cart };
    }
    default:
      return state;
  }
};

export default cartsReducer;
