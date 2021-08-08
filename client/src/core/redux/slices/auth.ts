import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const SET_AUTH = "SET_AUTH";
export const DELETE_AUTH = "DELETE_AUTH";

export type User = {
  id: number;
  email: string;
  username: string;
};

export type AuthState = {
  user: null | User;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.isLoading = true;
    },
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    deleteAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setAuth, deleteAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
