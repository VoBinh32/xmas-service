import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import history from "./history";

import { CartList } from "./components/CartList";
import { CartProducts } from "./components/CartProducts";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={CartList} />
            <Route path="/carts/:id" exact component={CartProducts} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
