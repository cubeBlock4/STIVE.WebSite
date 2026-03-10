import type { Route } from "../../.react-router/types/app/routes/+types/home";
import { useGetProductsQuery } from "../../api/ProductsApi";
import { Box, Grid, Spinner } from "@radix-ui/themes";
import ProductCard from "@/components/products/ProductCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Liste des vins - STIVE" },
    {
      name: "description",
      content: "Consulter la liste des vins - STIVE",
    },
  ];
}

export default function Products() {
  const { data: products, isLoading } = useGetProductsQuery(
    {},
  );

  if (isLoading) return <Spinner />;

  return (
    <Grid
      columns={{
        initial: "1",
        sm: "2",
        md: "3",
        lg: "4",
        xl: "5",
      }}
      rows={"repeat(2, 350px)"}
      gap={"4"}
    >
      {products &&
        products.map((product) => (
          <Box
            key={product.id + "-container"}
            style={{ margin: "0 auto" }}
          >
            <ProductCard
              key={product.id}
              product={product}
            />
          </Box>
        ))}
    </Grid>
  );
}
