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
    <div className="w-full h-full animate-fade-in">
      <Flex p={"2"} direction={"column"} gap={"6"}>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 min-w-0">
            <AddressCard label={"Adresse de facturation"} address={user.billingAddress} onChange={handleUpdateBillingAddress} />
          </div>
          <div className="flex-1 min-w-0">
            <AddressCard label={"Adresse de livraison"} address={user.deliveryAddress} onChange={handleUpdateDeliveryAddress} />
          </div>
        </div>
      </Flex>
    </div>
  );
}

export default AccountAddresses;