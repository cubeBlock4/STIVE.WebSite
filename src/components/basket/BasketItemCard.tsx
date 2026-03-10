import type { BasketItem } from "@/types/api/types";
import {
  Avatar,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";

type BasketItemProps = {
  item: BasketItem;
};

const BasketItemCard = ({ item }: BasketItemProps) => {
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
        <IconButton variant="ghost">
          <Cross2Icon width={"20"} height={"20"} />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default BasketItemCard;
