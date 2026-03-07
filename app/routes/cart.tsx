import { Avatar, Box, Button, Flex, IconButton, Text } from "@radix-ui/themes";
import type { Route } from "./+types/cart";
import { useAccount } from "@/contexts/AccountContext";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/providers/AuthProvider";
import { Cross2Icon } from "@radix-ui/react-icons";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Cart - STIVE" },
    { name: "description", content: "Content of your cart - STIVE" },
  ];
}

const MOCK_BASKET = {
  total: 4500,
  items: [
    {
      label: "Nom de l'article",
      description: "Lorem Ipsum",
      price: 468,
    }
  ]
}

export default function Cart() {
  const { isAuthenticated } = useAuth();
  const { user } = useSession();

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
            <Text style={{ color: "#FDECEB" }} size={"4"}>{MOCK_BASKET.total} €</Text>
          </Flex>
        </Flex>
        <hr style={{ width: "90%", margin: "0 auto", color: "var(--gray-11)" }} />
        {MOCK_BASKET.items.map(item => (
          <Flex direction="row" p="4" justify={"between"} align="center">
            <Flex direction="row" gap="4" align={"center"}>
              <Avatar fallback="A" variant="solid" size="5" />
              <Flex direction={"column"}>
                <Text style={{ color: "#FDECEB" }} weight={"bold"} size={"4"}>{item.label}</Text>
                <Text style={{ color: "var(--gray-8)" }}>{item.description}</Text>
              </Flex>
            </Flex>
            <Flex align={"center"} gap="4">
              <Text style={{ color: "#FDECEB" }} size={"4"}>{item.price} €</Text>
              <IconButton variant="ghost">
                <Cross2Icon width={"20"} height={"20"} />
              </IconButton>
            </Flex>
          </Flex>
        ))}
        <Flex direction={"row"} justify={"end"} gap="2" p="2">
          <Button variant="surface" color="gray">Retour</Button>
          <Button variant="solid">Commander</Button>
        </Flex>
      </Flex>
    </Box>
  )
}