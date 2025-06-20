import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./services/apiSlice";
import userSlice from "./feature/userSlice";
import parentSlice from "./feature/parentSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    parent: parentSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
