import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    fillerLogin: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUser, fillerLogin, logout } = userSlice.actions;
export default userSlice.reducer;
