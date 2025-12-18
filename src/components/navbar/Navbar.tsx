import { useNavigation } from '@/config/navigation';
import { Flex, Separator } from '@radix-ui/themes';
import NavigationButton from './NavigationButton';

export function Navbar() {
  const navigation = useNavigation();
  
  return (
    <Flex
      direction="row"
      justify="end"
      style={{
        position: "sticky",
        top: 0,
        right: 0,
        width: "100vw",
        backgroundColor: "rgba(255, 255, 255, 0.09)",
        border: "1px solid var(--divider)",
        borderRadius: 16,
        backdropFilter: "blur(9.6px)",
        margin: 4,
        padding: 8,
      }}
    >
      <Flex direction="row" gap="4" align="end">
        {navigation.map((item) => (
          <NavigationButton item={item} />
        ))}
        
        <Separator orientation={"vertical"} my={"1"} size={"2"} color={"gray"} />

        <NavigationButton item={{ label: "CONNEXION", href: "/login" }} />
        <NavigationButton item={{ label: "INSCRIPTION", href: "/register" }} />
      </Flex>
    </Flex>
  );
}
