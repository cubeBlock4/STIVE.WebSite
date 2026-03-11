import { Box, Flex, Spinner } from "@radix-ui/themes";
import OrderCard from "@/components/orders/OrderCard";
import { useGetOrdersQuery } from "../../../../api/OrdersApi";

const AccountOrders = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();

  if (isLoading) return <Spinner />;
  if (!orders) return null;

  return (
    <div className="w-full h-full animate-fade-in">
      <Flex p={"2"} direction={"column"} gap="4">
        {orders.map(order => (
          <div key={order.id} className="w-full">
            <OrderCard order={order} />
            <hr style={{ width: "100%", margin: "16px auto 0", borderColor: "var(--white-a3)" }} />
          </div>
        ))}
      </Flex>
    </div>
  );
};

export default AccountOrders;
