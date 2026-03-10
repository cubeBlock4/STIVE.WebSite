import { api } from "./api";
import { paramsReducer } from "./utils";
import type { Product } from "@/types/api/types";

type GetProductFilters = {
  familleId?: number;
}

export const ProductsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], GetProductFilters>({
      query: (params) => ({
        url: paramsReducer("products", params),
      }),
      providesTags: ["Products"]
    }),
  }),
});

export const { useGetProductsQuery } = ProductsApi;