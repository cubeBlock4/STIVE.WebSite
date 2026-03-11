import { api } from "./api";
import type { Basket, Order } from "@/types/api/types";

export const OrdersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    checkoutBasket: builder.mutation<Basket, void>({
      query: () => ({
        url: "Orders/checkout",
        method: "POST",
      }),
      invalidatesTags: ["Basket", "Orders"],
    }),
    getOrders: builder.query<Order[], void>({
      query: () => "Orders",
      providesTags: ["Orders"],
    })
  }),
  overrideExisting: true,
});

export const { useCheckoutBasketMutation, useGetOrdersQuery } = OrdersApi;