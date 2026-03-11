import { useState } from "react";
import type { Order, OrderItem } from "@/types/api/types";
import { ChevronDownIcon, Cross2Icon, PersonIcon } from "@radix-ui/react-icons";
import { Avatar, Flex, IconButton, Separator, Table, Text } from "@radix-ui/themes";

type OrderCardProps = {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Flex direction="column">
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
          <IconButton variant="ghost" onClick={() => setOpen(o => !o)}>
            <ChevronDownIcon
              width="20" height="20"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
            />
          </IconButton>
          <IconButton variant="ghost">
            <Cross2Icon width={"20"} height={"20"} />
          </IconButton>
        </Flex>
      </Flex>

      {open && (
        <>
          <Separator size="4" />
          <Flex direction="column" px="4" pb="4">
            <Table.Root variant="ghost">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell style={{ color: "var(--gray-8)" }}>Produit</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell style={{ color: "var(--gray-8)" }}>Réf.</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="center" style={{ color: "var(--gray-8)" }}>Qté</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right" style={{ color: "var(--gray-8)" }}>Prix unit.</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell align="right" style={{ color: "var(--gray-8)" }}>Sous-total</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {order.items.map((item: OrderItem) => (
                  <Table.Row key={item.id}>
                    <Table.Cell><Text style={{ color: "#FDECEB" }}>{item.product.name}</Text></Table.Cell>
                    <Table.Cell><Text size="2" style={{ color: "var(--gray-8)" }}>{item.product.reference}</Text></Table.Cell>
                    <Table.Cell align="center"><Text style={{ color: "#FDECEB" }}>{item.quantity}</Text></Table.Cell>
                    <Table.Cell align="right"><Text style={{ color: "#FDECEB" }}>{item.unitPrice} €</Text></Table.Cell>
                    <Table.Cell align="right">
                      <Text style={{ color: "#FDECEB" }}>
                        {(parseFloat(item.unitPrice) * item.quantity).toFixed(2)} €
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default OrderCard;