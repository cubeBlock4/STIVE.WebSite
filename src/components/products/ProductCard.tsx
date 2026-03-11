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
    <div className="glass-card flex flex-col justify-between h-full min-h-[320px] rounded-2xl p-5 relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--red-9)] rounded-full mix-blend-screen filter blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
      
      <Flex direction={"column"} gap={"3"} align="center" className="relative z-10 mt-2">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--red-9)] to-[var(--red-11)] flex items-center justify-center shadow-lg group-hover:shadow-[var(--red-a8)] transition-all duration-300 group-hover:scale-105 border border-[var(--red-7)]/50">
          <span className="text-white font-bold text-3xl tracking-tighter">{name.charAt(0).toUpperCase()}</span>
        </div>
        <Badge
          color={"red"}
          variant={"soft"}
          size="2"
          radius="full"
          className="bg-[var(--red-a3)] text-[var(--red-11)] border border-[var(--red-a4)]"
        >
          {famille.name}
        </Badge>
      </Flex>
      
      <div className="mt-6 flex flex-col flex-grow justify-end relative z-10">
        <Flex direction={"row"} justify={"between"} align="end" className="mb-4">
          <Text className="text-white font-semibold text-lg leading-tight truncate mr-2" title={name}>
            {name}
          </Text>
          <Text className="text-[var(--red-9)] font-bold text-xl whitespace-nowrap">
            {Number(price).toFixed(2)} €
          </Text>
        </Flex>
        
        <button
          onClick={handleAddToBasket}
          className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-[var(--red-9)] hover:to-[var(--red-11)] border border-white/10 hover:border-transparent text-white font-medium text-sm transition-all duration-300 active:scale-95 shadow-sm hover:shadow-lg hover:shadow-[var(--red-a6)]"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
