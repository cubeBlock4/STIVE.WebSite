import { Avatar, Box, Button, Flex, Text } from "@radix-ui/themes";
import type { Route } from "./+types/cart";
import { useAuth } from "@/hooks/useAuth";
import { useGetBasketQuery } from "../../api/BasketApi";
import BasketItemCard from "@/components/basket/BasketItemCard";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Cart - STIVE" },
    { name: "description", content: "Content of your cart - STIVE" },
  ];
}

export default function Cart() {
  const { isAuthenticated } = useAuth();
  const { data: basket } = useGetBasketQuery();

  if (!isAuthenticated) return null;

  return (
    <Box
      style={{
        backgroundColor: "#121416",
        marginTop: "100px",
        height: "100%",
        width: "100%",
        borderImage:
          "linear-gradient(to right, #C1C1C1 1%, #5C5C5C 47%, #5B5B5B 100%) 1",
        borderStyle: "solid",
        borderWidth: "1px",
      }}
    >
      <Flex direction="column">
        <Flex direction={"row"} justify={"between"} p="4" width={"100%"}>
          <Flex direction={"row"} gap={"4"} align={"center"}>
            <Avatar fallback="P" variant="solid" size={"4"} />
            <Text style={{ color: "#FDECEB" }} size={"5"}>Panier</Text>
          </Flex>
          <Flex direction={"row"} gap="2" align="center">
            <Text style={{ color: "#FDECEB" }} size={"4"}>Total :</Text>
            <Text style={{ color: "#FDECEB" }} size={"4"}>{basket.totalAmount} €</Text>
          </Flex>
        </Flex>
        <hr style={{ width: "98%", margin: "0 auto", color: "var(--gray-11)" }} />
        {basket.items.map(item => <BasketItemCard item={item} />)}
        <Flex direction={"row"} justify={"end"} gap="2" p="2">
          <Button variant="surface" color="gray">Retour</Button>
          <Button variant="solid">Commander</Button>
        </Flex>
      </Flex>
    </Box>
  )
}