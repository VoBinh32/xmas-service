import React from "react";
import { Route, BrowserRouter, Link, Switch } from "react-router-dom";

import { CartList } from "./components/CartList";
import { CartProducts } from "./components/CartProducts";
import Checkout from "./components/Checkout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={CartList} />
            <Route path="/child/:id" exact component={CartProducts} />
            <Route path="/checkout" exact component={Checkout} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
