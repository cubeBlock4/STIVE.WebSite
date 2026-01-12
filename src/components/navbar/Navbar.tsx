import { useNavigation } from '@/config/navigation';
import { Box, Flex, Separator } from '@radix-ui/themes';
import NavigationButton from './NavigationButton';

export function Navbar() {
  const navigation = useNavigation();
  
  return (
    <Box style={{
      marginLeft: 10,
      marginRight: 10,
    }}>
      <Flex
        direction="row"
        justify="end"
        style={{
          position: "sticky",
          top: 0,
          right: 0,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          border: "1px solid var(--divider)",
          borderRadius: 16,
          backdropFilter: "blur(9.6px)",
          marginTop: 4,
          padding: 8,
        }}
      >
        <Flex direction="row" gap="4" align="end">
          {navigation.map((item) => (
            <NavigationButton item={item} />
          ))}

          <Separator
            orientation={"vertical"}
            my={"1"}
            size={"2"}
            color={"gray"}
          />

          <NavigationButton item={{ label: "CONNEXION", href: "/login" }} />
          <NavigationButton
            item={{ label: "INSCRIPTION", href: "/register" }}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
