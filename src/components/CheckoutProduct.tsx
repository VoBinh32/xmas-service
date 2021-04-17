type CheckoutProductProps = {
  title: string;
  price: number;
};

const CheckoutProduct = ({ title, price }: CheckoutProductProps) => {
  return (
    <div className="product-box">
      <div>
        <div className="productTitle">
          <h3>
            <span className="product-name">{title}</span>
          </h3>
        </div>

        <div className="priceBlock">
          <span className="price currency">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
