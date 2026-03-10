import type { Order } from "@/types/api/types";
import { Cross2Icon, PersonIcon } from "@radix-ui/react-icons";
import { Avatar, Flex, IconButton, Text } from "@radix-ui/themes";

type OrderCardProps = {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Flex direction={"row"} p="4" justify={"between"} align={"center"}>
      <Flex direction={"row"} gap="4">
        <Avatar variant="solid" fallback={"C"}>
          <PersonIcon />
        </Avatar>
        <Flex direction={"column"}>
          <Text weight={"bold"} size={"3"} style={{ color: "#FDECEB" }}>Commande #{order.id}</Text>
          <Text size={"2"} style={{ color: "var(--gray-8)" }}>{order.status}</Text>
        </Flex>
      </Flex>
      <Flex direction={"row"} align={"center"} gap="4">
        <Text style={{ color: "#FDECEB" }}>Total : {order.totalAmount} €</Text>
        <IconButton variant="ghost">
          <Cross2Icon width={"20"} height={"20"} />
        </IconButton>
      </Flex>
    </Flex>
  )
}

export default OrderCard;