import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/styles.scss";
import { fetchCarts } from "../actions/carts";
import capitalize from "../selectors/capitalize";
import { IUser } from "../types";
import { AppState } from "../reducers/rootReducer";
import { WelcomeCard } from "./WelcomCard";

import gift from "../styles/img/undraw_gift1_sgf8.png";
import xmas from "../styles/img/undraw_snow_globe_923j.png";

export const CartList = () => {
  const children: IUser[] = useSelector((state: AppState) =>
    Object.values(state.children)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  const renderCards = () => {
    return children.map((child) => {
      return (
        <div key={child.id}>
          <div className="card">
            <img src={gift} alt="Person" className="card-image" />
            <h1 className="card-name">
              {capitalize(child.name.firstname)}{" "}
              {capitalize(child.name.lastname)}
            </h1>
            <Link className="link" to={`/child/${child.id}`}>
              <button className="button-cart-list">Click here</button>
            </Link>
          </div>
        </div>
      );
    });
  };

  const welcomeCardData = {
    illustration: xmas,
    subtitle: (
      <>
        Santa, Santa, please stop here.
        <br />
        Fill our your kids Christmas with joy and cheer!{" "}
      </>
    ),
    title: "Droppe Xmas",
  };

  return (
    <div>
      <WelcomeCard welcomeCardDesktopProps={welcomeCardData} />
      <div className="container">{children && renderCards()}</div>
    </div>
  );
};
