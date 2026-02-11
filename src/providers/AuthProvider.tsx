import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Customer } from "@/types/api/types";
import { useAuth } from "@/hooks/useAuth";

interface AuthContextType {
  user: Customer | null;
  setUser: (user: Customer | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<Customer | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
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
