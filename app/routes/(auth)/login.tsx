import type { Route } from "../../../.react-router/types/app/routes/+types/home";
import { Navbar } from "@/components/navbar/Navbar";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  Separator,
  Link,
  Callout,
} from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login as loginUser } from "../../../api/AuthApi";
import type { LoginWrite } from "@/types/api/types";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { setCredentials } from "@/store/authSlice";
import { useAppDispatch } from "@/hooks/useAuth";
import { useSession } from "@/providers/AuthProvider";
import { useLoginMutation } from "../../../api/api";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Connexion - STIVE" },
    { name: "description", content: "Connectez-vous à votre compte STIVE" },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const [login] = useLoginMutation();
  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    setIsLoading(true);

    try {
      const loginData: LoginWrite = {
        email: data.email,
        password: data.password,
      };

      const response = await login(loginData);
      
      // Save token to Redux store (and localStorage)
      if (response.data)
        dispatch(
          setCredentials({ token: response.data.token }),
        );

      // Success! Redirect to home page
      navigate({pathname: "/"});
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue s'est produite"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center overflow-hidden animate-fade-in p-5">
        {/* Background glowing orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--red-9)] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse-glow" style={{ zIndex: -1 }}></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#117f90] rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-float" style={{ animationDelay: "1s", zIndex: -1 }}></div>

        <div className="glass-card w-full max-w-[450px] p-8 md:p-10 rounded-3xl relative z-10 shadow-2xl border border-white/10 animate-slide-up">
          <Flex direction="column" gap="5">
            {/* Header */}
            <Flex direction="column" gap="2" align="center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--red-9)] to-[var(--red-11)] flex items-center justify-center shadow-[0_0_20px_var(--red-a8)] mb-2 border border-[var(--red-7)]">
                <span className="text-white font-bold text-2xl tracking-tighter">S</span>
              </div>
              <Heading size="6" weight="bold" style={{ color: "white" }}>
                Bon retour
              </Heading>
              <Text size="2" style={{ color: "var(--gray-9)" }}>
                Connectez-vous pour continuer
              </Text>
            </Flex>

            <Separator size="4" className="opacity-50" />

            {/* API Error Message */}
            {apiError && (
              <Callout.Root color="red" size="1" className="bg-red-500/10 border border-red-500/20">
                <Callout.Text>{apiError}</Callout.Text>
              </Callout.Root>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" gap="4">
                {/* Email Field */}
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium" style={{ color: "var(--gray-3)" }}>
                    E-mail
                  </Text>
                  <TextField.Root
                    type="email"
                    placeholder="john.doe@test.com"
                    {...register("email")}
                    color={errors.email ? "red" : "gray"}
                    variant="soft"
                    className="bg-white/5 border border-white/10 focus-within:border-[var(--red-7)] focus-within:ring-1 focus-within:ring-[var(--red-7)] transition-all"
                    size="3"
                  />
                  {errors.email && (
                    <Text size="1" color="red">
                      {errors.email.message}
                    </Text>
                  )}
                </Flex>

                {/* Password Field */}
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium" style={{ color: "var(--gray-3)" }}>
                    Mot de passe
                  </Text>
                  <TextField.Root
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    color={errors.password ? "red" : "gray"}
                    variant="soft"
                    className="bg-white/5 border border-white/10 focus-within:border-[var(--red-7)] focus-within:ring-1 focus-within:ring-[var(--red-7)] transition-all"
                    size="3"
                  />
                  {errors.password && (
                    <Text size="1" color="red">
                      {errors.password.message}
                    </Text>
                  )}
                </Flex>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[var(--red-9)] to-[var(--red-11)] text-white font-bold text-sm shadow-lg shadow-[var(--red-a6)] hover:shadow-[var(--red-a8)] transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-[var(--red-6)]/30"
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </button>
              </Flex>
            </form>

            {/* Footer */}
            <Flex justify="center" gap="2" mt="2">
              <Text size="2" style={{ color: "var(--gray-10)" }}>
                Vous n'avez pas de compte ?
              </Text>
              <Link href="/register" size="2" weight="medium" className="text-[var(--red-9)] hover:text-[var(--red-10)] transition-colors">
                S'inscrire
              </Link>
            </Flex>
          </Flex>
        </div>
      </div>
    </>
  );
}
