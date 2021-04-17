import { useSelector } from "react-redux";
import { AppState } from "../reducers/rootReducer";
import { ICart, IProduct } from "../types";
import { sortByApproved, sortByRejected } from "../selectors/sort";
import CheckoutProduct from "./CheckoutProduct";
import { totalAmount, beforeDiscountAmount } from "../selectors/total";

const Checkout = ({}) => {
  const carts: ICart[] = useSelector((state: AppState) =>
    Object.values(state.carts)
  );
  const products: IProduct[] = useSelector((state: AppState) => state.products);

  const rejectedProducts = sortByRejected(carts).flat(1);

  const approvedProducts = sortByApproved(carts).flat(1);

  let total = 0;
  let noDiscountAmount = 0;

  const renderApprovedProducts = () => {
    return approvedProducts.map((p: any) => {
      const product = products[p.productId];

      return <CheckoutProduct {...product} />;
    });
  };
  const renderDiscaredProducts = () => {
    return rejectedProducts.map((p: any) => {
      const product = products[p.productId];
      return <CheckoutProduct {...product} />;
    });
  };

  return (
    <div>
      <div className="container">
        <div id="ct-content">
          <h1>My Shopping Cart</h1>

          <div className="prodListDisplay">
            <div>
              <div>{renderApprovedProducts()}</div>
              <div className="product-box">
                <div>
                  <div className="productTitle">
                    <h3>
                      <span className="product-name-green">Total Amount:</span>
                    </h3>
                  </div>

                  <div className="priceBlock">
                    <span className="price currency">
                      ${beforeDiscountAmount(noDiscountAmount, products, carts)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="product-box">
                <div>
                  <div className="productTitle">
                    <h3>
                      <span className="product-name-green">
                        Total After Discount:
                      </span>
                    </h3>
                  </div>

                  <div className="priceBlock">
                    <span className="price currency">
                      ${totalAmount(total, products, carts)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="ct-content">
          <h2>{rejectedProducts.length > 0 && "Discarded Products:"}</h2>
          <div>{renderDiscaredProducts()}</div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
