import { createContext, useContext } from "react";
import type { Customer } from "@/types/api/types";

export const AccountContext = createContext<Customer | null>(null);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountContext.Provider");
  }
  return context;
}