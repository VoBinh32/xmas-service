import { ICart, IProduct } from "../types";

export const sortByAmount = (products: IProduct[]) => {
  return products.sort((a: IProduct, b: IProduct) => {
    return a.price < b.price ? 1 : -1;
  });
};
export const sortByApproved = (carts: ICart[]) =>
  carts.map((cart: ICart) => {
    return cart.products.filter(
      (product: any) => product.isDiscarded === false
    );
  });
export const sortByRejected = (carts: ICart[]) =>
  carts.map((cart: ICart) => {
    return cart.products.filter((product: any) => product.isDiscarded === true);
  });
