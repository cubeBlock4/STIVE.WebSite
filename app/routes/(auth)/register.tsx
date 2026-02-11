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
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{
          minHeight: "calc(100vh - 100px)",
          padding: "20px",
        }}
      >
        <Box
          style={{
            width: "100%",
            maxWidth: "450px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "var(--radius-4)",
            backdropFilter: "blur(10px)",
            padding: "var(--space-5)",
          }}
        >
          <Flex direction="column" gap="5">
            {/* Header */}
            <Flex direction="column" gap="2" align="center">
              <Heading size="6" weight="bold" style={{ color: "white" }}>
                Créer un compte
              </Heading>
              <Text size="2" style={{ color: "var(--gray-11)" }}>
                Rejoignez STIVE dès aujourd'hui
              </Text>
            </Flex>

            <Separator size="4" />

            {/* API Error Message */}
            {apiError && (
              <Callout.Root color="red" size="1">
                <Callout.Text>{apiError}</Callout.Text>
              </Callout.Root>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex direction="column" gap="4">
                {/* Name Fields */}
                <Flex gap="3" direction="row">
                  <Flex direction="column" gap="1" style={{ flex: 1 }}>
                    <Text size="2" weight="medium" style={{ color: "white" }}>
                      Prénom
                    </Text>
                    <TextField.Root
                      placeholder="Jean"
                      {...register("firstName")}
                      color={errors.firstName ? "red" : undefined}
                    />
                    {errors.firstName && (
                      <Text size="1" color="red">
                        {errors.firstName.message}
                      </Text>
                    )}
                  </Flex>

                  <Flex direction="column" gap="1" style={{ flex: 1 }}>
                    <Text size="2" weight="medium" style={{ color: "white" }}>
                      Nom
                    </Text>
                    <TextField.Root
                      placeholder="Dupont"
                      {...register("lastName")}
                      color={errors.lastName ? "red" : undefined}
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
                  <Text size="2" weight="medium" style={{ color: "white" }}>
                    Email
                  </Text>
                  <TextField.Root
                    type="email"
                    placeholder="jean.dupont@example.com"
                    {...register("email")}
                    color={errors.email ? "red" : undefined}
                  />
                  {errors.email && (
                    <Text size="1" color="red">
                      {errors.email.message}
                    </Text>
                  )}
                </Flex>

                {/* Password Field */}
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium" style={{ color: "white" }}>
                    Mot de passe
                  </Text>
                  <TextField.Root
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    color={errors.password ? "red" : undefined}
                  />
                  {errors.password && (
                    <Text size="1" color="red">
                      {errors.password.message}
                    </Text>
                  )}
                </Flex>

                {/* Confirm Password Field */}
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium" style={{ color: "white" }}>
                    Confirmer le mot de passe
                  </Text>
                  <TextField.Root
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    color={errors.confirmPassword ? "red" : undefined}
                  />
                  {errors.confirmPassword && (
                    <Text size="1" color="red">
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </Flex>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="3"
                  disabled={isLoading}
                  style={{
                    marginTop: "8px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {isLoading ? "Inscription en cours..." : "S'inscrire"}
                </Button>
              </Flex>
            </form>

            <Separator size="4" />

            {/* Footer */}
            <Flex justify="center" gap="2">
              <Text size="2" style={{ color: "var(--gray-11)" }}>
                Vous avez déjà un compte ?
              </Text>
              <Link href="/login" size="2" weight="medium">
                Se connecter
              </Link>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
