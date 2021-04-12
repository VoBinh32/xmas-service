import React, { Dispatch, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, ChildrenActions } from "../actions/children";
import { fetchCarts, CartsActions } from "../actions/carts";
import { ICart, IUser } from "../types";
import "../styles/styles.scss";
import { AppState } from "../reducers/rootReducer";
import { WelcomeCard, WelcomeCardDesktopData } from "./WelcomCard";
import gift from "../styles/img/undraw_gift1_sgf8.png";

// type CartListProps = {
//   children: Object[];
//   carts: Object[];
//   fetchUsers: () => void;
//   fetchCarts: () => void;
// };

export const CartList = () => {
  const children = useSelector((state: AppState) =>
    Object.values(state.children)
  );
  const carts = useSelector((state: AppState) => Object.values(state.carts));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const selectCardId = (userId: number) => {
    const cardId = carts.find((cart) => cart.userId === userId).id;
    return cardId;
  };

  const renderCards = () => {
    return children.map((child) => {
      return (
        <div key={child.id}>
          <div className="card">
            <img src={gift} alt="Person" className="card__image" />
            <h1 className="card__name">
              {capitalize(child.name.firstname)}{" "}
              {capitalize(child.name.lastname)}
            </h1>
            <button className="button-cart-list">Click here</button>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <WelcomeCard
        welcomeCardDesktopProps={WelcomeCardDesktopData.welcomeCardDesktopProps}
      />
      <div className="container">{renderCards()}</div>
    </div>
  );
};
