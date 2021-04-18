import { ICart, IProduct } from "../types";

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
