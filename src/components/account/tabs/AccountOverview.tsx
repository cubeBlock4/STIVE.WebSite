import { Avatar, Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useEditCustomerMutation } from "../../../../api/CustomersApi";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import type { CustomerFormType } from "@/schemas/customer.schema";
import { resetPassword } from "../../../../api/AuthApi";
import type { ResetPasswordFormType } from "@/schemas/auth.schema";
import FormField from "@/components/FormField";
import { useSession } from "@/providers/AuthProvider";
import { toast } from "sonner";

const AccountOverview = () => {
  const { user: account } = useSession();

  const [editAccount] = useEditCustomerMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = useForm<CustomerFormType>({
    values: {
      id: account?.id ?? 0,
      email: account?.email ?? "",
    },
  });

  const {
    register: registerResetPassword,
    handleSubmit: handleResetPassword,
    setValue: setResetPasswordValue,
    setError,
    formState: { errors: resetPasswordErrors, isDirty: isDirtyResetPassword },
  } = useForm<ResetPasswordFormType>({
    defaultValues: {
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (account?.email) {
      setResetPasswordValue("email", account.email);
    }
  }, [account?.email]);

  const onSubmit: SubmitHandler<CustomerFormType> = async (body) => {
    if (!account) return;
    const res = await editAccount({
      ...account,
      ...body,
    });

    if (res.error)
      toast.error("Erreur - Compte", {
        description: JSON.stringify(res),
      })
    else
      toast.success("Compte", {
        description: "Modification du compte prises en compte avec succès."
      })
  };

  const onResetPassword: SubmitHandler<ResetPasswordFormType> = async (
    body,
  ) => {
    if (body.newPassword !== body.confirmNewPassword) {
      setError("confirmNewPassword", {
        message: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    const res = await resetPassword(body);

    if (!res.ok)
      toast.error("Erreur - Modification du mot de passe", {
        description: JSON.stringify(res),
      });
    else
      toast.success("Modification du mot de passe", {
        description:
          "Mot de passe modifié avec succès",
      });
  };

  if (!account) return null;

  return (
    <Box
      style={{
        backgroundColor: "#121416",
        height: "500px",
        width: "100%",
        borderImage:
          "linear-gradient(to right, #C1C1C1 1%, #5C5C5C 47%, #5B5B5B 100%) 1",
        borderStyle: "solid",
        borderWidth: "1px",
      }}
    >
      <Flex p={"4"} m={"4"} direction={"column"} gap={"4"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Flex direction={"row"} align={"center"} gap={"2"}>
            <Avatar fallback={account?.firstName.charAt(0) ?? "A"} variant={"solid"} />
            <Text size={"5"} weight={"bold"} style={{ color: "#FFF" }}>
              {account?.lastName.toUpperCase()} {account?.firstName}
            </Text>
          </Flex>
          <Text size={"3"} weight={"bold"} style={{ color: "#FFF" }}>
            Identité
          </Text>
          <Flex direction={"row"} gap={"4"}>
            <TextField.Root
              placeholder={"Nom"}
              style={{ flex: 1 }}
              {...register("lastName")}
            />
            <TextField.Root
              placeholder={"Prénom"}
              style={{ flex: 1 }}
              {...register("firstName")}
            />
          </Flex>
          <TextField.Root placeholder={"E-mail"} {...register("email")} />
          <Button
            type={"submit"}
            variant={"solid"}
            style={{ width: "200px" }}
            disabled={!isDirty}
          >
            Enregistrer
          </Button>
        </form>
        <form
          onSubmit={handleResetPassword(onResetPassword)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Text size={"3"} weight={"bold"} style={{ color: "#FFF" }}>
            Modifier votre mot de passe
          </Text>
          <FormField
            error={!!resetPasswordErrors.currentPassword}
            helperText={resetPasswordErrors.currentPassword?.message}
          >
            <TextField.Root
              placeholder={"Mot de passe actuel"}
              type={"password"}
              autoComplete={"current-password"}
              {...registerResetPassword("currentPassword")}
            />
          </FormField>
          {resetPasswordErrors.currentPassword && (
            <Text color={"red"}>
              {resetPasswordErrors.currentPassword.message}
            </Text>
          )}
          <Flex direction={"row"} gap={"4"}>
            <FormField
              error={!!resetPasswordErrors.newPassword}
              helperText={resetPasswordErrors.newPassword?.message}
              style={{ flex: 1 }}
            >
              <TextField.Root
                placeholder={"Nouveau mot de passe"}
                type={"password"}
                autoComplete={"new-password"}
                {...registerResetPassword("newPassword")}
              />
            </FormField>
            <FormField
              error={!!resetPasswordErrors.confirmNewPassword}
              helperText={resetPasswordErrors.confirmNewPassword?.message}
              style={{ flex: 1 }}
            >
              <TextField.Root
                placeholder={"Confirmation nouveau mot de passe"}
                type={"password"}
                style={{ flex: 1 }}
                {...registerResetPassword("confirmNewPassword")}
              />
            </FormField>
          </Flex>
          <Button
            variant={"solid"}
            style={{ width: "200px" }}
            disabled={!isDirtyResetPassword}
          >
            Enregistrer
          </Button>
        </form>
      </Flex>
    </Box>
  );
};

export default AccountOverview;
