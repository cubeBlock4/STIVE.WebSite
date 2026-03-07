import { Box, Flex } from "@radix-ui/themes";
import OrderCard from "@/components/orders/OrderCard";
import type { Order } from "@/types/api/types";

const MOCK_ORDERS: Order[] = [
  {
    id: "2323232",
    status: "pending",
    total: 25644,
  },
  {
    id: "11552",
    status: "pending",
    total: 25644,
  },
  {
    id: "23211232",
    status: "pending",
    total: 25644,
  },
]

const AccountOrders = () => {
  return (
    <Box
      style={{
        backgroundColor: "#121416",
        height: "500px",
        width: "100%",
        borderImage:
          "linear-gradient(to right, #C1C1C1 1%, #5C5C5C 47%, #5B5B5B 100%) 1",
        borderStyle: "solid",
        borderWidth: "1px",
      }}
    >
      <Flex p={"2"} direction={"column"}>
        {MOCK_ORDERS.map(order => (
          <>
            <OrderCard order={order} />
            <hr style={{ width: "96%", margin: "0 auto", color: "var(--gray-11)" }} />
          </>
        ))}
      </Flex>
    </Box>
  );
};

export default AccountOrders;
