import type { Route } from "../../.react-router/types/app/routes/+types/home";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "STIVE - Vins d'exception" },
    { name: "description", content: "Découvrez notre sélection de vins d'exception." },
  ];
}

export default function Home() {
  return (
    <Flex direction="column" gap="0">
      {/* Hero Section */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="6"
        style={{
          minHeight: "calc(100vh - 64px)",
          background: "linear-gradient(160deg, #1C2024 60%, #2e1a1a 100%)",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <Text
          size="2"
          style={{
            color: "#e5534b",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Cave à vins en ligne
        </Text>

        <Heading
          size="9"
          style={{
            color: "#FDECEB",
            fontFamily: "'Bricolage Grotesque Variable', sans-serif",
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: "700px",
          }}
        >
          Des vins d'exception,{" "}
          <span style={{ color: "#e5534b" }}>livrés chez vous</span>
        </Heading>

        <Text
          size="4"
          style={{
            color: "#a09080",
            maxWidth: "500px",
            lineHeight: 1.7,
          }}
        >
          Explorez notre sélection soigneusement choisie de vins rouges, blancs
          et rosés en provenance des meilleures régions viticoles.
        </Text>

        <Flex gap="3" wrap="wrap" justify="center">
          <Button asChild size="4" style={{ cursor: "pointer" }}>
            <Link to="/products">Découvrir nos vins</Link>
          </Button>
          <Button asChild size="4" variant="outline" style={{ cursor: "pointer", color: "#FDECEB", borderColor: "#FDECEB44" }}>
            <Link to="/products">Voir le catalogue</Link>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
