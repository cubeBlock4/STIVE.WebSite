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
import { register as registerUser } from "../../../api/AuthApi";
import type { RegisterWrite } from "@/types/api/types";
import { registerSchema, type RegisterFormData } from "@/schemas/auth.schema";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Inscription - STIVE" },
    { name: "description", content: "Créez votre compte STIVE" },
  ];
}

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    setApiError(null);
    setIsLoading(true);

    try {
      const registerData: RegisterWrite = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };

      await registerUser(registerData);

      // Success! Redirect to login page
      navigate("/login");
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--red-9)] rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse-glow" style={{ zIndex: -1 }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#117f90] rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-float" style={{ animationDelay: "2s", zIndex: -1 }}></div>

        <div className="glass-card w-full max-w-[500px] p-8 md:p-10 rounded-3xl relative z-10 shadow-2xl border border-white/10 animate-slide-up">
          <Flex direction="column" gap="5">
            {/* Header */}
            <Flex direction="column" gap="2" align="center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--red-9)] to-[var(--red-11)] flex items-center justify-center shadow-[0_0_20px_var(--red-a8)] mb-2 border border-[var(--red-7)]">
                <span className="text-white font-bold text-2xl tracking-tighter">S</span>
              </div>
              <Heading size="6" weight="bold" style={{ color: "white" }}>
                Créer un compte
              </Heading>
              <Text size="2" style={{ color: "var(--gray-9)" }}>
                Rejoignez STIVE dès aujourd'hui
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
                {/* Name Fields */}
                <Flex gap="3" direction="row">
                  <Flex direction="column" gap="1" style={{ flex: 1 }}>
                    <Text size="2" weight="medium" style={{ color: "var(--gray-3)" }}>
                      Prénom
                    </Text>
                    <TextField.Root
                      placeholder="Jean"
                      {...register("firstName")}
                      color={errors.firstName ? "red" : "gray"}
                      variant="soft"
                      className="bg-white/5 border border-white/10 focus-within:border-[var(--red-7)] focus-within:ring-1 focus-within:ring-[var(--red-7)] transition-all"
                      size="3"
                    />
                    {errors.firstName && (
                      <Text size="1" color="red">
                        {errors.firstName.message}
                      </Text>
                    )}
                  </Flex>

                  <Flex direction="column" gap="1" style={{ flex: 1 }}>
                    <Text size="2" weight="medium" style={{ color: "var(--gray-3)" }}>
                      Nom
                    </Text>
                    <TextField.Root
                      placeholder="Dupont"
                      {...register("lastName")}
                      color={errors.lastName ? "red" : "gray"}
                      variant="soft"
                      className="bg-white/5 border border-white/10 focus-within:border-[var(--red-7)] focus-within:ring-1 focus-within:ring-[var(--red-7)] transition-all"
                      size="3"
                    />
                    {errors.lastName && (
                      <Text size="1" color="red">
                        {errors.lastName.message}
                      </Text>
                    )}
                  </Flex>
                </Flex>

                {/* Email Field */}
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium" style={{ color: "var(--gray-3)" }}>
                    Email
                  </Text>
                  <TextField.Root
                    type="email"
                    placeholder="jean.dupont@example.com"
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

                {/* Confirm Password Field */}
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium" style={{ color: "var(--gray-3)" }}>
                    Confirmer le mot de passe
                  </Text>
                  <TextField.Root
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    color={errors.confirmPassword ? "red" : "gray"}
                    variant="soft"
                    className="bg-white/5 border border-white/10 focus-within:border-[var(--red-7)] focus-within:ring-1 focus-within:ring-[var(--red-7)] transition-all"
                    size="3"
                  />
                  {errors.confirmPassword && (
                    <Text size="1" color="red">
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </Flex>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 px-4 py-3.5 rounded-xl bg-gradient-to-r from-[var(--red-9)] to-[var(--red-11)] text-white font-bold text-sm shadow-lg shadow-[var(--red-a6)] hover:shadow-[var(--red-a8)] transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-[var(--red-6)]/30"
                >
                  {isLoading ? "Inscription en cours..." : "S'inscrire"}
                </button>
              </Flex>
            </form>

            {/* Footer */}
            <Flex justify="center" gap="2" mt="2">
              <Text size="2" style={{ color: "var(--gray-10)" }}>
                Vous avez déjà un compte ?
              </Text>
              <Link href="/login" size="2" weight="medium" className="text-[var(--red-9)] hover:text-[var(--red-10)] transition-colors">
                Se connecter
              </Link>
            </Flex>
          </Flex>
        </div>
      </div>
    </>
  );
}
