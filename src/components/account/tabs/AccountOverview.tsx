import { Avatar, Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useEditCustomerMutation } from "../../../../api/CustomersApi";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { CustomerFormType } from "@/schemas/customer.schema";
import { resetPassword } from "../../../../api/AuthApi";
import type { ResetPasswordFormType } from "@/schemas/auth.schema";
import FormField from "@/components/FormField";
import { useSession } from "@/providers/AuthProvider";
import type { Customer } from "@/types/api/types";

const AccountOverview = () => {
  const { user: account } = useSession();

  const [editAccount] = useEditCustomerMutation();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<CustomerFormType>({
    defaultValues: {
      id: account?.id,
    },
  });

  const {
    register: registerResetPassword,
    handleSubmit: handleResetPassword,
    setError,
    formState: { errors: resetPasswordErrors, isDirty: isDirtyResetPassword },
  } = useForm<ResetPasswordFormType>({
    defaultValues: {
      email: account?.email,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CustomerFormType> = async (body) => {
    if (!account) return;
    const res = await editAccount({
      ...account,
      ...body,
    });

    console.log(res);
  };

  const onResetPassword: SubmitHandler<ResetPasswordFormType> = async (
    body,
  ) => {
    const res = await resetPassword(body);

    if (body.newPassword !== body.confirmNewPassword) {
      setError("confirmNewPassword", {
        message: "Les mots de passe ne correspondent pas.",
      });
    }

    return await res.json();
  };

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
            <Avatar fallback={"S"} variant={"solid"} />
            <Text size={"5"} weight={"bold"} style={{ color: "#FFF" }}>
              DOE John
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
