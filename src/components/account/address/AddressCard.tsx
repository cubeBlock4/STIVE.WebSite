import type { Address } from "@/types/api/types";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import AddressForm from "@/components/account/address/AddressForm";

type AddressCardProps = {
  label: string;
  address?: Address;
  onChange?: (newAddress: Address) => void;
};

const AddressCard = ({ label, address, onChange }: AddressCardProps) => {
  return (
    <Box
      style={{
        border: "1px solid var(--gray-11)",
      }}
      width={"300px"}
      height={"fit-content"}
    >
      <Flex direction={"column"} gap={"2"} p={"2"}>
        <Text
          style={{ color: "#FDECEB", margin: "0 auto" }}
          size={"5"}
          weight={"bold"}
        >
          {label}
        </Text>
        <Text style={{ color: "#FDECEB" }}>
          Nom de la voie : {address?.street}
        </Text>
        <Text style={{ color: "#FDECEB" }}>
          Commune : {address?.country}
        </Text>
        <Text style={{ color: "#FDECEB" }}>
          Code postal : {address?.postalCode}
        </Text>
        <Text style={{ color: "#FDECEB" }}>
          Pays : {address?.country}
        </Text>
        <AddressForm address={address} onSave={onChange}>
          <Button style={{ margin: "0 auto" }}>
            Modifier
          </Button>
        </AddressForm>
      </Flex>
    </Box>
  );
};

export default AddressCard;
