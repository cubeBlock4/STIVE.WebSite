import { useSession } from "@/providers/AuthProvider";
import AddressCard from "@/components/account/address/AddressCard";
import { Box, Flex } from "@radix-ui/themes";
import type { Address } from "@/types/api/types";
import { useEditCustomerMutation } from "../../../../api/CustomersApi";
import { toast } from "sonner";

const AccountAddresses = () => {
  const { user } = useSession();

  if (!user) return null;

  const [editCustomer] = useEditCustomerMutation();
  const handleUpdateBillingAddress = async (newAddress: Address) => {
    const res = await editCustomer({
      ...user,
      billingAddress: newAddress,
    })

    if ("error" in res)
      toast.error("Erreur - Mise à jour d'adresse", {
        description: JSON.stringify(res),
      });
    else
      toast.success("Adresse", {
        description: "Mise à jour de l'adresse réussie avec succès."
      })
  };

  const handleUpdateDeliveryAddress = async (
    newAddress: Address,
  ) => {
    const res = await editCustomer({
      ...user,
      deliveryAddress: newAddress,
    });

    if ("error" in res)
      toast.error("Erreur - Mise à jour d'adresse", {
        description: JSON.stringify(res),
      });
    else
      toast.success("Adresse", {
        description:
          "Mise à jour de l'adresse réussie avec succès.",
      });
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
      <Flex p={"2"} direction={"row"} gap={"4"}>
        <AddressCard label={"Adresse de facturation"} address={user.billingAddress} onChange={handleUpdateBillingAddress} />
        <AddressCard label={"Adresse de livraison"} address={user.deliveryAddress} onChange={handleUpdateDeliveryAddress} />
      </Flex>
    </Box>
  );
}

export default AccountAddresses;