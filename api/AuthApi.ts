import type { RegisterWrite, LoginWrite, LoginResponse } from "@/types/api/types";

export const register = async (data: RegisterWrite) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/Auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      message: "Une erreur est survenue lors de l'inscription" 
    }));
    throw new Error(error.message || "Échec de l'inscription");
  }

  return await response.json();
};

export const login = async (data: LoginWrite): Promise<LoginResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      message: "Email ou mot de passe incorrect" 
    }));
    throw new Error(error.message || "Échec de la connexion");
  }

  return await response.json();
};