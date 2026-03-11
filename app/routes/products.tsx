import type { Route } from "../../.react-router/types/app/routes/+types/home";
import { useGetProductsQuery } from "../../api/ProductsApi";
import {
  Box,
  Button,
  Flex,
  Grid,
  Spinner,
  Text,
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
};

export default function Products() {
  const [filters, setFilters] = useState<Filters>({});
  const { data: products, isLoading } = useGetProductsQuery(
    { familleId: filters.family?.id },
  );

  if (isLoading) return <Spinner />;

  const handleResetFilters = () => {
    setFilters({
      family: undefined,
    })
  }

  return (
    <div className="relative min-h-[calc(100vh-100px)] w-full py-8 px-4 sm:px-6 lg:px-8 animate-fade-in max-w-7xl mx-auto">
      {/* Background glowing orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[var(--red-9)] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse-glow" style={{ zIndex: -1, pointerEvents: "none" }}></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#117f90] rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-float" style={{ animationDelay: "1s", zIndex: -1, pointerEvents: "none" }}></div>

      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Notre <span className="text-gradient">Cave</span>
          </h1>
          <Text size="2" className="text-[var(--gray-9)] mt-1 block">Découvrez notre sélection de vins d'exception.</Text>
        </div>

        <div className="glass-panel px-4 py-3 rounded-2xl flex flex-row gap-4 items-center w-full sm:w-auto overflow-x-auto shadow-lg">
          <Text size="2" weight="medium" className="text-white whitespace-nowrap">
            Filtrer par :
          </Text>
          <div className="min-w-[150px]">
            <FamilySelector
              value={filters.family}
              onChange={(newValue) => {
                setFilters({
                  ...filters,
                  family: newValue,
                });
              }}
            />
          </div>
          {filters.family && (
            <button 
              onClick={handleResetFilters}
              className="px-3 py-1.5 rounded-lg bg-[var(--red-a3)] text-[var(--red-11)] hover:bg-[var(--red-a4)] hover:text-white transition-colors text-sm font-medium whitespace-nowrap border border-[var(--red-a5)] cursor-pointer"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <Flex justify="center" align="center" style={{ minHeight: "50vh" }}>
          <Spinner size="3" />
        </Flex>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products && products.map((product, index) => (
            <div 
              key={product.id + "-container"} 
              className="animate-slide-up h-full"
              style={{ animationDelay: `${index * 0.05}s`, opacity: 0, animationFillMode: "forwards" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
