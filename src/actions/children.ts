import fakeStore from "../apis/fakeStore";
import * as constants from "./types";
import { IUser } from "../types";
import { Dispatch } from "react";

export interface FetchUser {
  type: constants.FETCH_USER;
  payload: IUser;
}

export interface FetchUsers {
  type: constants.FETCH_USERS;
  payload: IUser[];
}

export const fetchUsers = () => async (dispatch: Dispatch<any>) => {
  const response = await fakeStore.get("/users?limit=4");
  const another = await fakeStore.get("/users/8");

  return dispatch({
    type: constants.FETCH_USERS,
    payload: [...response.data, another.data],
  });
};

export const fetchUser = (userId: number) => async (
  dispatch: Dispatch<FetchUser>
) => {
  const response = await fakeStore.get(`/users/${userId}`);

  dispatch({
    type: constants.FETCH_USER,
    payload: { ...response.data },
  });
};

export type ChildrenActions = FetchUser | FetchUsers;
