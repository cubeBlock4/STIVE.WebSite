import type { Route } from "../+types/account";
import { Flex } from "@radix-ui/themes";
import AccountTabPanel, {
  type AccountTab,
} from "@/components/account/AccountTabPanel";
import { redirect } from "react-router";
import AccountOverview from "@/components/account/tabs/AccountOverview";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/providers/AuthProvider";
import { AccountContext } from "@/contexts/AccountContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Account - STIVE" },
    { name: "description", content: "Your account settings - STIVE" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.tab) {
    return redirect("/account/overview");
  }
}

const TAB_LIST: AccountTab[] = [
  {
    label: "INFORMATIONS",
    value: "overview",
    href: "/account/overview",
    children: AccountOverview,
  },
  {
    label: "ADRESSES",
    value: "addresses",
    href: "/account/addresses",
  },
  {
    label: "COMMANDES",
    value: "orders",
    href: "/account/orders",
  },
  {
    label: "SE DECONNECTER",
    value: "logout",
  },
];

export default function Account({ params }: Route.ComponentProps) {
  const { isAuthenticated } = useAuth();
  const { user } = useSession();
  const { tab: tabValue } = params;
  const tab = TAB_LIST.find((t) =>
    tabValue ? t.value === tabValue : t.value === "overview",
  );

  if (!isAuthenticated) return null;
  if (!tab) return null;

  return (
    <AccountContext.Provider value={user}>
      <Flex direction={"row"} gap={"2"} p={"2"}>
        <AccountTabPanel value={tab} tabs={TAB_LIST} />
        {tab.children && <tab.children />}
      </Flex>
    </AccountContext.Provider>
  );
}
