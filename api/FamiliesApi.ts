import { api } from "./api";
import type { Family } from "@/types/api/types";

export const FamiliesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFamilies: builder.query<Family[], void>({
      query: () => "familles",
      providesTags: ["Families"],
    })
  }),
  overrideExisting: true,
});

export const { useGetFamiliesQuery } = FamiliesApi;