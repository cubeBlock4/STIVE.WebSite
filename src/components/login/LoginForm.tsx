import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormType, schema } from "@/schemas/login";
import { Box, Flex, TextField } from "@radix-ui/themes";
import { Form, Label } from "radix-ui";
import {
  PasswordToggleField,
  PasswordToggleFieldIcon,
  PasswordToggleFieldInput,
  PasswordToggleFieldToggle,
} from "@radix-ui/react-password-toggle-field";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormType>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormType> = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction={"column"}
        gap={"2"}
        style={{
          padding: "1rem",
        }}
      >
        <Flex direction={"column"} gap={"1"}>
          <Label.Root htmlFor={"email"}>E-mail</Label.Root>
          <TextField.Root id={"email"} placeholder={"john.doe@test.com"} />
        </Flex>
        <Flex direction={"column"} gap={"1"}>
          <Label.Root htmlFor={"email"}>Mot de passe</Label.Root>
          <PasswordToggleField>
            <Flex direction={"row"} justify={"center"} align={"center"}>
              <PasswordToggleFieldInput />
              <PasswordToggleFieldToggle>
                <PasswordToggleFieldIcon
                  visible={<EyeOpenIcon />}
                  hidden={<EyeClosedIcon />}
                />
              </PasswordToggleFieldToggle>
            </Flex>
          </PasswordToggleField>
        </Flex>
      </Flex>
    </form>
  );
};
