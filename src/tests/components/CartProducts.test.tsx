import { CartProducts } from "../../components/CartProducts";
import { mount, shallow } from "enzyme";
import * as reactRedux from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import children from "../mocks/users";
import products from "../mocks/products";
import carts from "../mocks/carts";
import { BrowserRouter } from "react-router-dom";

import { combineReducers, createStore } from "redux";
import cartsReducer from "../../reducers/cartsReducer";
import productsReducer from "../../reducers/productsReducer";
import childrenReducer from "../../reducers/usersReducer";

const initStore = (initialState: any) =>
  createStore(
    combineReducers({
      children: childrenReducer,
      products: productsReducer,
      carts: cartsReducer,
    }),
    initialState
  );

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe.only("CartProducts components", () => {
  const shareState = {
    children: children[1],
    products,
    carts,
  };

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({
      id: "1",
    }),
    useRouteMatch: () => ({ url: "/child/1" }),
  }));

  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
  beforeEach(() => {
    useSelectorMock.mockImplementation((callback) => {
      return callback(shareState);
    });
  });

  let renderCards = jest.fn();
  afterEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });
  it("should render CartList correctly", () => {
    const dispatch = jest.fn();

    useDispatchMock.mockReturnValue(jest.fn());
    const store = initStore({ ...shareState });
    const component = mount(
      <reactRedux.Provider store={store}>
        <BrowserRouter>
          <CartProducts />
        </BrowserRouter>
      </reactRedux.Provider>
    );

    expect(component.find("Link")).toHaveLength(2);
    expect(component.find(".card-name")).toHaveLength(1);
    expect(component.find("h3")).toHaveLength(1);
  });
});
