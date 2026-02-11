import type { Product } from "@/types/api/types";
import { Box, Flex, Text } from "@radix-ui/themes";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { name } = product;

  return (
    <Box>
      <Flex>
        <Text>{name}</Text>
      </Flex>
    </Box>
  )
};

export default ProductCard;
