import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parent: null,
  isLoading: true,
  isAuthenticated: false,
};

export const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    setParent: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.parent = action.payload;
    },
    fillerLogin: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    logoutParent: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.parent = null;
    },
  },
});

export const { setParent, logoutParent } = parentSlice.actions;
export default parentSlice.reducer;
