export type NavigationItemType = {
  label: string;
  href: string;
  onClick?: never;
  separator?: never;
} | {
  label: string;
  href?: never;
  onClick: () => void;
  separator?: never;
} | {
  label?: never;
  href?: never;
  onClick?: never;
  separator: true;
};

export const useNavigation = (): NavigationItemType[] => {
  return [
    {
      label: "HOME",
      href: "/",
    },
    {
      label: "LISTE DES VINS",
      href: "/products",
    },
    {
      label: "PANIER",
      href: "/cart",
    },
  ];
};