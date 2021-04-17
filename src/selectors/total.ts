import _ from "lodash";
import { sortByApproved } from "./sort";
import { ICart, IProduct } from "../types";

export const beforeDiscountAmount = (
  noDiscountAmount: number,
  products: IProduct[],
  carts: ICart[]
) => {
  const result = _.countBy(_.flatMap(sortByApproved(carts)), "productId");
  for (const [key, value] of Object.entries(result)) {
    noDiscountAmount += products[parseInt(key)].price * value;
  }
  return noDiscountAmount.toFixed(2);
};

export const totalAmount = (
  total: number,
  products: IProduct[],
  carts: ICart[]
) => {
  const result = _.countBy(_.flatMap(sortByApproved(carts)), "productId");
  for (const [key, value] of Object.entries(result)) {
    if (value === 1) {
      total += products[parseInt(key)].price;
    } else if (value === 2) {
      total += products[parseInt(key)].price * 2 * 0.8;
    } else if (value === 3) {
      total += products[parseInt(key)].price * 3 * 0.7;
    }
  }
  return total.toFixed(2);
};
