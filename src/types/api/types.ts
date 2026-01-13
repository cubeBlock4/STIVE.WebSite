export type RegisterWrite = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type LoginWrite = {
  email: string;
  password: string;
}

export type LoginResponse = {
  token: string;
  // Add other fields your API returns (e.g., user info)
}

export type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
}

