import type { Route } from "../../.react-router/types/app/routes/+types/home";
import { useGetProductsQuery } from "../../api/ProductsApi";
import { Spinner } from "@radix-ui/themes";
import ProductCard from "@/components/products/ProductCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Liste des vins - STIVE" },
    { name: "description", content: "Consulter la liste des vins - STIVE" },
  ];
}

export default function Products() {
  const { data: products, isLoading } = useGetProductsQuery({});

  if (isLoading)
    return <Spinner />;
  
  return (
    <>
      {products && products.map((product) => (
        <ProductCard product={product} />
      ))}
    </>
  );
}