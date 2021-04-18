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
import _ from "lodash";
import { totalAmount } from "../selectors/total";

interface ParamTypes {
  id: string;
}

export const CartProducts = () => {
  const dispatch = useDispatch();
  const { id } = useParams<ParamTypes>();
  const child: IUser = useSelector(
    (state: AppState) => state.children[parseInt(id)]
  );
  const carts: ICart[] = useSelector((state: AppState) =>
    Object.values(state.carts)
  );

  const cart: ICart = useSelector(
    (state: AppState) => state.carts[parseInt(id)]
  );
  const products: IProduct[] = useSelector((state: AppState) => state.products);

  let total: number = 0;

  useEffect(() => {
    dispatch(fetchCart(parseInt(id)));
  }, [id]);
  const count = _.countBy(_.flatMap(carts, "products"), "productId");

  const renderProducts = () => {
    const sortedProducts = cart.products
      .map((cartProduct: { productId: number }) => {
        return products[cartProduct.productId];
      })
      .filter((p) => p)
      .sort((a, b) => a.price - b.price);

    return sortedProducts.map((product) => {
      return (
        <Product
          key={product.id}
          {...product}
          userId={parseInt(id)}
          count={count[product.id]}
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
        <h3>*The list below is automatically sorted by amount</h3>
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
