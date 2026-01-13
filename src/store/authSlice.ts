import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "@/types/api/types";

// Load token from localStorage on initialization
const loadTokenFromStorage = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

const initialState: AuthState = {
  token: loadTokenFromStorage(),
  isAuthenticated: !!loadTokenFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", action.payload.token);
      }
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      // Remove from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
