import type { RegisterWrite } from "@/types/api/types";

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