import { useNavigation } from '@/config/navigation';
import { Avatar, Flex, Separator } from '@radix-ui/themes';
import NavigationButton from './NavigationButton';
import { useSession } from "@/providers/AuthProvider";
import { Link } from 'react-router';

export function Navbar() {
  const navigation = useNavigation();
  const { isAuthenticated, user } = useSession();

  return (
    <div className="px-4 pt-4 sticky top-0 z-50 w-full mb-8 animate-fade-in">
      <div className="glass-panel rounded-2xl px-6 py-3 flex flex-row justify-between items-center transition-all duration-300 mx-auto max-w-7xl">
        <Link to="/" className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105 active:scale-95">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--red-9)] to-[var(--red-11)] flex items-center justify-center shadow-lg group-hover:shadow-[var(--red-a6)] transition-all duration-300 border border-[var(--red-7)]">
            <span className="text-white font-bold text-xl tracking-tighter">S</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight hidden sm:block">STIVE</span>
        </Link>
        <Flex direction="row" gap="4" align="center">
          {navigation.map((item) => (
            <NavigationButton key={item.href} item={item} />
          ))}

          <Separator
            orientation={"vertical"}
            my={"1"}
            size={"2"}
            color={"gray"}
            className="hidden md:block"
          />

          {isAuthenticated && user ? (
            <Link to={"/account"} className="transition-transform hover:scale-105 active:scale-95 ml-2">
              <Avatar fallback={user.firstName.charAt(0)} variant={"solid"} className="shadow-lg hover:shadow-[var(--red-a6)] transition-all cursor-pointer border border-white/10" radius="full" />
            </Link>
          ) : (
            <Flex gap="3" align="center" className="ml-2">
              <NavigationButton item={{ label: "CONNEXION", href: "/login" }} />
              <Link to="/register">
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--red-track)] to-[var(--red-8)] text-[var(--red-2)] font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[var(--red-a6)] active:scale-95 cursor-pointer border border-[var(--red-6)]/30 hidden sm:block">
                  INSCRIPTION
                </button>
              </Link>
            </Flex>
          )}
        </Flex>
      </div>
    </div>
  );
}
