import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../actions/product";
import * as types from "../../actions/types";
import fetchMock from "fetch-mock";
import expect from "expect";
import product from "../mocks/product";
import user from "../mocks/user";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("fetch product actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates FETCH_PRODUCT when fetching product has been done", () => {
    const expectedActions = [{ type: types.FETCH_PRODUCT, payload: product }];
    const store = mockStore({});

    return store.dispatch<any>(actions.fetchProduct(product.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("creates APPROVE_PRODUCT when approving product has been done", () => {
    const expectedActions = [
      {
        type: types.APPROVE_PRODUCT,
        payload: { productId: product.id, userId: user.id },
      },
    ];
    const store = mockStore({ product });

    store.dispatch<any>(actions.approveProduct(product.id, user.id));

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("creates REJECT_PRODUCT when rejecting product has been done", () => {
    const expectedActions = [
      {
        type: types.REJECT_PRODUCT,
        payload: { productId: product.id, userId: user.id },
      },
    ];
    const store = mockStore({ product });

    store.dispatch<any>(actions.rejectProduct(product.id, user.id));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
