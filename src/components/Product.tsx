import { approveProduct, rejectProduct } from "../actions/product";
import { useDispatch } from "react-redux";

type ProductProps = {
  id: number;
  userId: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

const Product = ({
  title,
  price,
  description,
  image,
  userId,
  id,
}: ProductProps) => {
  const dispatch = useDispatch();

  const acceptProduct = () => {
    dispatch(approveProduct(userId, id));
  };

  const discardProduct = () => {
    dispatch(rejectProduct(userId, id));
  };
  return (
    <div className="product-card">
      <img src={image} alt={title} />

      <div className="product-info">
        <p className="info-name">{title}</p>

        <p className="info-description">
          {description && description.substring(0, 100)}...
        </p>

        <p className="info-price">${price}</p>
      </div>
      <div>
        <button onClick={acceptProduct} className="button--tertiary">
          Accept
        </button>
        <button onClick={discardProduct} className="button--secondary">
          Discard
        </button>
      </div>
    </div>
  );
};

export default Product;
