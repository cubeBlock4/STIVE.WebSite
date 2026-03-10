import { api } from "./api";
import type {
  Basket,
  BasketItemWrite,
} from "@/types/api/types";

export const BasketApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBasket: builder.query<Basket, void>({
      query: () => "basket",
      providesTags: ["Basket"],
    }),
    addToBasket: builder.mutation<Basket, BasketItemWrite>({
      query: (body) => ({
        url: "basket/items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Basket"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetBasketQuery,
  useAddToBasketMutation,
} = BasketApi;
