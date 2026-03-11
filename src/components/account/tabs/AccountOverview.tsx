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
    <div className="w-full h-full animate-fade-in">
      <Flex p={"4"} direction={"column"} gap={"6"}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Flex direction={"row"} align={"center"} gap={"3"} mb="2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--red-9)] to-[var(--red-11)] flex items-center justify-center shadow-lg border border-[var(--red-7)]/50">
               <span className="text-white font-bold text-xl">{account?.firstName.charAt(0) ?? "A"}</span>
            </div>
            <Text size={"6"} weight={"bold"} style={{ color: "#FFF" }}>
              {account?.lastName.toUpperCase()} {account?.firstName}
            </Text>
          </Flex>
          
          <Text size={"4"} weight={"bold"} style={{ color: "var(--red-5)" }}>
            Identité
          </Text>
          
          <Flex direction={"row"} gap={"4"} wrap="wrap">
            <TextField.Root
              placeholder={"Nom"}
              className="flex-1 bg-white/5 border border-white/10 focus-within:border-[var(--red-7)] focus-within:ring-1 focus-within:ring-[var(--red-7)] transition-all min-w-[200px]"
              color="gray" variant="soft" size="3"
              {...register("lastName")}
            />
            <TextField.Root
              placeholder={"Prénom"}
              className="flex-1 bg-white/5 border border-white/10 focus-within:border-[var(--red-7)] focus-within:ring-1 focus-within:ring-[var(--red-7)] transition-all min-w-[200px]"
              color="gray" variant="soft" size="3"
              {...register("firstName")}
            />
          </Flex>
          
          <TextField.Root 
             placeholder={"E-mail"} 
             className="bg-white/5 border border-white/10 focus-within:border-[var(--red-7)] focus-within:ring-1 focus-within:ring-[var(--red-7)] transition-all"
             color="gray" variant="soft" size="3"
             {...register("email")} 
          />
          
          <button
            type={"submit"}
            disabled={!isDirty}
            className="w-full sm:w-[200px] mt-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--red-9)] to-[var(--red-11)] text-white font-bold text-sm shadow-md hover:shadow-lg hover:shadow-[var(--red-a6)] transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-[var(--red-6)]/30"
          >
            Enregistrer
          </button>
        </form>
        
        <div className="h-px w-full bg-white/10 my-4" />
        
        <form
          onSubmit={handleResetPassword(onResetPassword)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <Text size={"4"} weight={"bold"} style={{ color: "var(--red-5)" }}>
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
              className="bg-white/5 border border-white/10 focus-within:border-[var(--red-7)] focus-within:ring-1 focus-within:ring-[var(--red-7)] transition-all"
              color={resetPasswordErrors.currentPassword ? "red" : "gray"} variant="soft" size="3"
              {...registerResetPassword("currentPassword")}
            />
          </FormField>
          {resetPasswordErrors.currentPassword && (
            <Text color={"red"}>
              {resetPasswordErrors.currentPassword.message}
            </Text>
          )}
          
          <Flex direction={"row"} gap={"4"} wrap="wrap">
            <FormField
              error={!!resetPasswordErrors.newPassword}
              helperText={resetPasswordErrors.newPassword?.message}
              style={{ flex: 1, minWidth: "200px" }}
            >
              <TextField.Root
                placeholder={"Nouveau mot de passe"}
                type={"password"}
                autoComplete={"new-password"}
                className="bg-white/5 border border-white/10 focus-within:border-[var(--red-7)] focus-within:ring-1 focus-within:ring-[var(--red-7)] transition-all"
                color={resetPasswordErrors.newPassword ? "red" : "gray"} variant="soft" size="3"
                {...registerResetPassword("newPassword")}
              />
            </FormField>
            
            <FormField
              error={!!resetPasswordErrors.confirmNewPassword}
              helperText={resetPasswordErrors.confirmNewPassword?.message}
              style={{ flex: 1, minWidth: "200px" }}
            >
              <TextField.Root
                placeholder={"Confirmation mot de passe"}
                type={"password"}
                className="bg-white/5 border border-white/10 focus-within:border-[var(--red-7)] focus-within:ring-1 focus-within:ring-[var(--red-7)] transition-all"
                color={resetPasswordErrors.confirmNewPassword ? "red" : "gray"} variant="soft" size="3"
                {...registerResetPassword("confirmNewPassword")}
              />
            </FormField>
          </Flex>
          
          <button
            type="submit"
            disabled={!isDirtyResetPassword}
            className="w-full sm:w-[200px] mt-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--red-9)] to-[var(--red-11)] text-white font-bold text-sm shadow-md hover:shadow-lg hover:shadow-[var(--red-a6)] transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-[var(--red-6)]/30"
          >
            Enregistrer
          </button>
        </form>
      </Flex>
    </div>
  );
};

export default AccountOverview;
