import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../actions/carts";
import * as types from "../../actions/types";
import fetchMock from "fetch-mock";
import expect from "expect";
import cart from "../mocks/cart";
import carts from "../mocks/carts";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("fetch cart and fetch carts async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates FETCH_CART when fetching cart has been done", () => {
    fetchMock.getOnce("https://fakestoreapi.com/carts/user/1", {
      body: { carts: cart },
      headers: { "content-type": "application/json" },
    });

    const expectedActions = [
      { type: types.FETCH_CART, payload: { ...cart[0] } },
    ];
    const store = mockStore({});

    return store.dispatch<any>(actions.fetchCart(cart[0].id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("passes dispatch and getState when fetching carts has been done", () => {
    fetchMock.getOnce("https://fakestoreapi.com/carts?limit=5", {
      body: { carts: carts },
      headers: { "content-type": "application/json" },
    });

    const create = () => {
      const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn(() => ({
          type: types.FETCH_CARTS,
          payload: { ...carts },
        })),
      };
      const next = jest.fn();

      const invoke = (action: any) => thunk(store)(next)(action);

      return { store, next, invoke };
    };

    const { store, invoke } = create();
    invoke((dispatch: any, getState: any) => {
      dispatch(actions.fetchCarts());
      getState();
    });
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.getState).toHaveBeenCalled();
  });
  it("passes through FETCH_CARTS action", () => {
    const create = () => {
      const store = {
        getState: jest.fn(() => ({})),
        dispatch: jest.fn(),
      };
      const next = jest.fn();

      const invoke = (action: any) => thunk(store)(next)(action);

      return { store, next, invoke };
    };
    const { next, invoke } = create();
    const action = { type: types.FETCH_CARTS, payload: { ...carts } };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});
