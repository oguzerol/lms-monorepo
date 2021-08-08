import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const TOGGLE_THEME = "TOGGLE_THEME";

export type Theme = "light" | "dark";

export type ThemeState = {
  theme: Theme;
};

const initialState: ThemeState = {
  theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.theme;
export const selectIsDarkTheme = (state: RootState) =>
  state.theme.theme === "dark";

export default themeSlice.reducer;
