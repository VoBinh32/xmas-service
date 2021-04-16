import _ from "lodash";
import { FETCH_PRODUCT } from "../actions/types";
import { ProductActions } from "../actions/product";
import { IProduct } from "../types";

type ProductsState = {
  products: IProduct[];
};

const initialState: ProductsState = {
  products: [],
};

const productsReducer = (state = initialState.products, action: any) => {
  switch (action.type) {
    case FETCH_PRODUCT: {
      return { ...state, [action.payload.id]: action.payload };
    }
    default:
      return state;
  }
};

export default productsReducer;
