import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Customer } from "@/types/api/types";
import { useAuth } from "@/hooks/useAuth";
import { useFetchUserQuery } from "../../api/api";

interface AuthContextType {
  user: Customer;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  const { data: user } = useFetchUserQuery(undefined, { skip: !isAuthenticated });

  if (!user) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return context;
}
