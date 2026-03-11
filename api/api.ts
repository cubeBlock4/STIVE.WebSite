import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store/store";
import type {
  Customer,
  LoginResponse,
  LoginWrite,
} from "@/types/api/types";

// Base query with auth token injection
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const token = (getState() as RootState).auth.token;
    
    // If we have a token, include it in the Authorization header
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    fetchUser: builder.query<Customer, void>({
      query: () => ({
        url: "auth/me"
      }),
      providesTags: ["Customers", "Basket"],
    }),
    login: builder.mutation<LoginResponse, LoginWrite>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body
      }),
      invalidatesTags: ["Customers"],
    })
  }),
  tagTypes: ["Products", "Customers", "Basket", "Orders", "Families"]
});

export const { useFetchUserQuery, useLoginMutation } = api;