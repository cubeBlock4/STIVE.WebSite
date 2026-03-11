import type { Route } from "../../.react-router/types/app/routes/+types/home";
import { useGetProductsQuery } from "../../api/ProductsApi";
import {
  Box,
  Button,
  Flex,
  Grid,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import ProductCard from "@/components/products/ProductCard";
import FamilySelector from "@/components/families/FamilySelector";
import { useState } from "react";
import type { Family } from "@/types/api/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Liste des vins - STIVE" },
    {
      name: "description",
      content: "Consulter la liste des vins - STIVE",
    },
  ];
}

type Filters = {
  family?: Family;
  search?: string;
};

export default function Products() {
  const [filters, setFilters] = useState<Filters>({});
  const { data: products, isLoading } = useGetProductsQuery(
    { familleId: filters.family?.id, name: filters.search },
  );

  if (isLoading) return <Spinner />;

  const handleResetFilters = () => {
    setFilters({
      family: undefined,
      search: "",
    });
  };

  return (
    <Flex direction={"column"} gap={"2"}>
      <Flex
        direction={"row"}
        gap={"2"}
        p={"2"}
        align={"center"}
        justify={"center"}
        width={"100%"}
      >
        <Text style={{ color: "#FDECEB" }}>Filtres</Text>
        <FamilySelector
          value={filters.family}
          onChange={(newValue) => {
            setFilters({
              ...filters,
              family: newValue,
            });
          }}
        />
        <TextField.Root
          placeholder={"Rechercher..."}
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
            })
          }
        />
        <Button
          variant={"soft"}
          onClick={handleResetFilters}
        >
          Réinitialiser
        </Button>
      </Flex>
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
    </Flex>
  );
}
