import { api } from "./api";
import type { Customer } from "@/types/api/types";

export const CustomersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    editCustomer: builder.mutation<Customer, Customer>({
      query: (body) => ({
        url: `customers`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const { useEditCustomerMutation } = CustomersApi;