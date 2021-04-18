import { CartList } from "../../components/CartList";
import { mount, shallow } from "enzyme";
import * as reactRedux from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import children from "../mocks/users";
import products from "../mocks/product";
import carts from "../mocks/carts";
import { BrowserRouter } from "react-router-dom";
import gift from "../../styles/img/undraw_gift1_sgf8.png";
import xmas from "../../styles/img/undraw_snow_globe_923j.png";
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

describe.only("CartList components", () => {
  const shareState = {
    children,
    products,
    carts,
  };

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
          <CartList />
        </BrowserRouter>
      </reactRedux.Provider>
    );
    expect(component.find("WelcomeCard")).toHaveLength(1);
    expect(component.find(".container")).toHaveLength(1);
    expect(component.find("h1.card-name")).toHaveLength(5);
    expect(component.find("Link")).toHaveLength(5);
    expect(component.find("img").at(0).prop("src")).toEqual(xmas);
    expect(component.find("img").at(1).prop("src")).toEqual(gift);
    expect(component.find(".card")).toHaveLength(5);
  });
});
