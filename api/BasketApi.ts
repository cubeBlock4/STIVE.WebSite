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
    removeFromBasket: builder.mutation<Basket, number>({
      query: (productId) => ({
        url: `basket/items/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Basket"],
    }),
    updateBasketItemQuantity: builder.mutation<Basket, BasketItemWrite>({
      query: ({productId, quantity}) => ({
        url: `basket/items/${productId}`,
        method: "PUT",
        body: {
          quantity,
        },
      }),
      invalidatesTags: ["Basket"],
    })
  }),
  overrideExisting: true,
});

export const {
  useGetBasketQuery,
  useAddToBasketMutation,
  useRemoveFromBasketMutation,
  useUpdateBasketItemQuantityMutation,
} = BasketApi;
