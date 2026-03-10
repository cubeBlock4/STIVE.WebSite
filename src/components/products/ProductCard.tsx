import type { Product } from "@/types/api/types";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useAddToBasketMutation } from "../../../api/BasketApi";
import { toast } from "sonner";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, price, famille } = product;

  const [addToBasket, { isSuccess }] = useAddToBasketMutation();
  const handleAddToBasket = async () => {
    const res = await addToBasket({
      productId: product.id,
      quantity: 1,
    });

    if ("error" in res)
      toast.error("Erreur - Panier", {
        description: JSON.stringify(res.error),
      });
    else
      toast.success("Panier", {
        description: `${name} ajouté au panier avec succès.`,
      });
  }

  return (
    <Box
      style={{
        height: "300px",
        width: "300px",
        border: "1px solid var(--gray-11)",
        borderRadius: "4px",
      }}
      m="2"
      p="2"
    >
      <Flex direction={"column"} gap={"2"}>
        <Avatar
          color={"iris"}
          size={"9"}
          variant={"solid"}
          fallback={name.charAt(0)}
          style={{
            display: "block",
            margin: "0 auto",
          }}
        />
        <Badge
          color={"gray"}
          variant={"solid"}
          style={{
            display: "block",
            width: "fit-content",
            margin: "0 auto",
          }}
        >
          {famille.name}
        </Badge>
      </Flex>
      <Flex p={"4"} direction={"row"} justify={"between"}>
        <Text style={{ color: "var(--gray-1" }}>
          {name}
        </Text>
        <Text style={{ color: "var(--gray-1" }}>
          {price} €
        </Text>
      </Flex>
      <Button
        onClick={handleAddToBasket}
        style={{ display: "block", margin: "0 auto" }}
      >
        Ajouter au panier
      </Button>
    </Box>
  );
};

export default ProductCard;
