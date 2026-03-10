import type { Address } from "@/types/api/types";
import { Dialog, TextField } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";

type AddressFormProps = {
  address?: Address;
  onSave?: (newAddress: Address) => void;
  children?: ReactNode;
}

const AddressForm = ({ address, onSave, children }: AddressFormProps) => {
  const { register, handleSubmit } = useForm<Address>({
    defaultValues: address,
  });

  const onSubmit = (data: Address) => {
    onSave?.(data);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content
        style={{ backgroundColor: "var(--gray-12)" }}
      >
        <Dialog.Title style={{ color: "#FDECEB" }}>
          Modifier l'adresse
        </Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={"column"} gap={"2"} p={"2"}>
            <label>
              <Text style={{ color: "#FDECEB" }}>
                Nom de la voie
              </Text>
              <TextField.Root {...register("street")} />
            </label>
            <label>
              <Text style={{ color: "#FDECEB" }}>
                Commune
              </Text>
              <TextField.Root {...register("city")} />
            </label>
            <label>
              <Text style={{ color: "#FDECEB" }}>
                Code postal
              </Text>
              <TextField.Root type={"number"} max={99999} {...register("postalCode")} />
            </label>
            <label>
              <Text style={{ color: "#FDECEB" }}>Pays</Text>
              <TextField.Root {...register("country")} />
            </label>
            <Dialog.Close>
              <Button
                type="submit"
                style={{ margin: "0 auto" }}
              >
                Sauvegarder
              </Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default AddressForm;
