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
                Connexion
              </Heading>
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
                {/* Email Field */}
                <Flex direction="column" gap="1">
                  <Text size="2" weight="medium" style={{ color: "white" }}>
                    E-mail
                  </Text>
                  <TextField.Root
                    type="email"
                    placeholder="john.doe@test.com"
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
                    placeholder="Mot de passe"
                    {...register("password")}
                    color={errors.password ? "red" : undefined}
                  />
                  {errors.password && (
                    <Text size="1" color="red">
                      {errors.password.message}
                    </Text>
                  )}
                </Flex>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="3"
                  disabled={isLoading}
                  color="red"
                  style={{
                    marginTop: "8px",
                    cursor: isLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </Flex>
            </form>

            <Separator size="4" />

            {/* Footer */}
            <Flex justify="center" gap="2">
              <Text size="2" style={{ color: "var(--gray-11)" }}>
                Vous n'avez pas de compte ?
              </Text>
              <Link href="/register" size="2" weight="medium">
                S'inscrire
              </Link>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
