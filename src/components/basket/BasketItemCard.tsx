import type { BasketItem } from "@/types/api/types";
import {
  Avatar,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useUpdateBasketItemQuantityMutation } from "../../../api/BasketApi";
import { toast } from "sonner";

type BasketItemProps = {
  item: BasketItem;
};

const BasketItemCard = ({ item }: BasketItemProps) => {
  const [updateQuantity] =
    useUpdateBasketItemQuantityMutation();
  const handleUpdateQuantity = async (quantity: number) => {
    if (quantity < 0) return;
    const res = await updateQuantity({
      productId: item.product.id,
      quantity,
    });

    if ("error" in res)
      toast.error("Erreur - Panier", {
        description: JSON.stringify(res),
      });
  };

  return (
    <Flex
      direction="row"
      p="4"
      justify={"between"}
      align="center"
    >
      <Flex direction="row" gap="4" align={"center"}>
        <Avatar fallback="A" variant="solid" size="5" />
        <Flex direction={"column"}>
          <Text
            style={{ color: "#FDECEB" }}
            weight={"bold"}
            size={"4"}
          >
            {item.product.name}
          </Text>
          <Text style={{ color: "var(--gray-8)" }}>
            {item.product.reference}
          </Text>
        </Flex>
      </Flex>
      <Flex align={"center"} gap="4">
        <Text style={{ color: "#FDECEB" }} size={"4"}>
          {item.product.price} €
        </Text>
        <IconButton
          onClick={() =>
            handleUpdateQuantity(item.quantity - 1)
          }
          variant="ghost"
        >
          <MinusIcon width={"20"} height={"20"} />
        </IconButton>
        <Text style={{ color: "#FDECEB" }} size={"4"}>
          {item.quantity}
        </Text>
        <IconButton
          onClick={() =>
            handleUpdateQuantity(item.quantity + 1)
          }
          variant="ghost"
        >
          <PlusIcon width={"20"} height={"20"} />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default BasketItemCard;
