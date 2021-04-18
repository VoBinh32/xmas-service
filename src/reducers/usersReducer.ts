import _ from "lodash";
import { FETCH_USER, FETCH_USERS } from "../actions/types";
import { ChildrenActions } from "../actions/children";
import { IUser } from "../types";

type ChildrenState = {
  children: { [key: number]: IUser };
};

const initialState: ChildrenState = {
  children: {},
};

const usersReducer = (
  state = initialState.children,
  action: ChildrenActions
) => {
  switch (action.type) {
    case FETCH_USERS: {
      return { ...state, ..._.mapKeys(action.payload, "id") };
    }
    case FETCH_USER: {
      return { ...state, [action.payload.id]: action.payload };
    }
    default:
      return state;
  }
};

export default usersReducer;
