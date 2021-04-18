import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import capitalize from "../selectors/capitalize";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../reducers/rootReducer";
import { fetchCart } from "../actions/carts";
import { ICart, IProduct, IUser } from "../types";
import { WelcomeCard } from "./WelcomCard";
import illustration from "../styles/img/undraw_happy_birthday_s72n.png";
import Product from "./Product";

import { totalAmount } from "../selectors/total";

interface ParamTypes {
  id: string;
}

export const CartProducts = () => {
  const dispatch = useDispatch();
  const { id } = useParams<ParamTypes>();
  const child: IUser = useSelector((state: AppState) => state.children[id]);
  const carts: ICart[] = useSelector((state: AppState) =>
    Object.values(state.carts)
  );

  const cart: ICart = useSelector((state: AppState) => state.carts[id]);
  const products: IProduct[] = useSelector((state: AppState) => state.products);

  let total: number = 0;

  useEffect(() => {
    dispatch(fetchCart(parseInt(id)));
  }, [id]);

  const renderProducts = () => {
    return cart.products.map((cartProduct: { productId: number }) => {
      const product = products[cartProduct.productId];

      return (
        <Product
          key={cartProduct.productId}
          {...product}
          userId={parseInt(id)}
        />
      );
    });
  };

  const welcomeCardData = () => ({
    illustration: illustration,
    subtitle: (
      <>
        Dear Santa,
        <br />
        Here is what I want for Christmas:{" "}
      </>
    ),
    title: `${capitalize(child.name.firstname)}'s Wish List`,
  });

  return (
    <div>
      {child && <WelcomeCard welcomeCardDesktopProps={welcomeCardData()} />}
      <div>
        <h1 className="card-name">
          {" "}
          Total Amount: ${totalAmount(total, products, carts)}
        </h1>
      </div>

      <div className="container">
        <div className="button-container">
          <Link className="link" to="/">
            <button className="custom-btn btn-back">Back</button>
          </Link>
          <Link className="link" to="/checkout">
            <button className="custom-btn btn-checkout">Checkout</button>
          </Link>
        </div>
        {cart && renderProducts()}
      </div>
    </div>
  );
};
