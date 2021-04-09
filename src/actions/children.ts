import fakeStore from "../apis/fakeStore";
import * as constants from "./types";
import { IUser } from "../types";
import { Dispatch } from "react";

export interface FetchUser {
  type: constants.FETCH_USER;
  payload: IUser;
}

export interface FetchUserSuccess {
  type: constants.FETCH_USER_SUCCESS;
  payload: IUser;
}

export const fetchUser = (userId: number) => async (
  dispatch: Dispatch<FetchUser>
) => {
  const response = await fakeStore.get(`/users/${userId}`);
  dispatch({
    type: constants.FETCH_USER,
    payload: { id: response.data.id, name: response.data.name },
  });
};

export function fetchUserSuccess(user: IUser): FetchUserSuccess {
  return {
    type: constants.FETCH_USER_SUCCESS,
    payload: user,
  };
}
