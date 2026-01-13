import { configureStore } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;