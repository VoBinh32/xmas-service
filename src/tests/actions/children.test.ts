import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../../actions/children";
import * as types from "../../actions/types";
import fetchMock from "fetch-mock";
import expect from "expect";
import user from "../mocks/user";
import users from "../mocks/users";
import _ from "lodash";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates FETCH_USER when fetching user has been done", () => {
    fetchMock.getOnce("https://fakestoreapi.com/users/1", {
      body: { user },
      headers: { "content-type": "application/json" },
    });

    const expectedActions = [{ type: types.FETCH_USER, payload: { ...user } }];
    const store = mockStore({});

    return store.dispatch<any>(actions.fetchUser(user.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates FETCH_USERS when fetching users has been done", () => {
    fetchMock.get("https://fakestoreapi.com/carts?limit=4", {
      body: { users: { ...users[1], ...users[2], ...users[3], ...users[4] } },
      headers: { "content-type": "application/json" },
    });
    fetchMock.get("https://fakestoreapi.com/carts/user/8", {
      body: { users: users[8] },
      headers: { "content-type": "application/json" },
    });

    const expectedActions = {
      type: types.FETCH_USERS,
      payload: Object.values(users),
    };
    const store = mockStore({});

    return store.dispatch<any>(actions.fetchUsers()).then(() => {
      expect(store.getActions()).toEqual([expectedActions]);
    });
  });
});
