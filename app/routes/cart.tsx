import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
} from "@radix-ui/themes";
import type { Route } from "./+types/cart";
import { useAuth } from "@/hooks/useAuth";
import { useGetBasketQuery } from "../../api/BasketApi";
import BasketItemCard from "@/components/basket/BasketItemCard";
import CheckoutConfirmDialog from "@/components/basket/CheckoutConfirmDialog";
import { useCheckoutBasketMutation } from "../../api/OrdersApi";
import { toast } from "sonner";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cart - STIVE" },
    {
      name: "description",
      content: "Content of your cart - STIVE",
    },
  ];
}

export default function Cart() {
  const { isAuthenticated } = useAuth();
  const { data: basket } = useGetBasketQuery();

  const [checkout] = useCheckoutBasketMutation();
  const handleCheckout = async () => {
    const res = await checkout();

    if ("error" in res)
      toast.error("Erreur - Commande", {
        description: JSON.stringify(res),
      });
    else
      toast.success("Commande", {
        description: "Commande passée avec succès.",
      });
  };

  if (!isAuthenticated || !basket) return null;

  return (
    <div className="relative min-h-[calc(100vh-100px)] w-full py-8 px-4 sm:px-6 lg:px-8 animate-fade-in max-w-5xl mx-auto">
      {/* Background glowing orbs */}
      <div className="absolute top-0 right-10 w-64 h-64 bg-[var(--red-9)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse-glow" style={{ zIndex: -1, pointerEvents: "none" }}></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#117f90] rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-float" style={{ animationDelay: "1s", zIndex: -1, pointerEvents: "none" }}></div>

      <div className="glass-card w-full rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 animate-slide-up bg-black/20">
        <Flex direction="column" gap="6">
          <Flex direction={"row"} justify={"between"} align={"center"} className="w-full pb-4 border-b border-white/10 flex-wrap gap-4">
            <Flex direction={"row"} gap={"4"} align={"center"}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--red-9)] to-[var(--red-11)] flex items-center justify-center shadow-lg border border-[var(--red-7)]/50">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <Text className="text-white font-bold text-2xl tracking-tight">
                Votre Panier
              </Text>
            </Flex>
            <div className="glass-panel px-5 py-2.5 rounded-xl flex items-center gap-3">
              <Text className="text-[var(--gray-9)] font-medium text-sm">
                Total :
              </Text>
              <Text className="text-[var(--red-9)] font-bold text-xl">
                {Number(basket.totalAmount).toFixed(2)} €
              </Text>
            </div>
          </Flex>
          
          {basket.items.length > 0 ? (
            <div className="flex flex-col gap-4">
              {basket.items.map((item) => (
               <div key={item.id} className="animate-slide-up" style={{ animationFillMode: "both" }}>
                 <BasketItemCard item={item} />
               </div>
              ))}
              <Flex direction={"row"} justify={"end"} gap="2" pt="4" className="border-t border-white/10 mt-2">
                <CheckoutConfirmDialog
                  totalAmount={basket.totalAmount}
                  onConfirm={handleCheckout}
                />
              </Flex>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
               <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                 <span className="text-[var(--gray-9)] text-3xl">🛒</span>
               </div>
               <Text className="text-[var(--gray-9)] text-lg mb-4">Votre panier est vide.</Text>
            </div>
          )}
        </Flex>
      </div>
    </div>
  );
}
