import { Flex } from "@radix-ui/themes";
import AccountTabPanel, {
  type AccountTab,
} from "@/components/account/AccountTabPanel";
import { redirect } from "react-router";
import AccountOverview from "@/components/account/tabs/AccountOverview";
import { useAppDispatch, useAuth } from "@/hooks/useAuth";
import { useSession } from "@/providers/AuthProvider";
import { AccountContext } from "@/contexts/AccountContext";
import AccountOrders from "@/components/account/tabs/AccountOrders";
import type { Route } from "./+types/account";
import { logout } from "@/store/authSlice";
import type { ThunkDispatch } from "@reduxjs/toolkit";
import AccountAddresses from "@/components/account/tabs/AccountAddresses";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Account - STIVE" },
    {
      name: "description",
      content: "Your account settings - STIVE",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.tab) {
    return redirect("/account/overview");
  }
}

const getTabList = (
  dispatch: ThunkDispatch<any, any, any>,
): AccountTab[] => [
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
    children: AccountAddresses,
  },
  {
    label: "COMMANDES",
    value: "orders",
    href: "/account/orders",
    children: AccountOrders,
  },
  {
    label: "SE DECONNECTER",
    value: "logout",
    href: "/",
    onClick: () => dispatch(logout()),
  },
];

export default function Account({
  params,
}: Route.ComponentProps) {
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const { tab: tabValue } = params;
  const TAB_LIST = getTabList(dispatch);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !isAuthenticated) return null;

  const tab = TAB_LIST.find((t) =>
    tabValue
      ? t.value === tabValue
      : t.value === "overview",
  );
  if (!tab) return null;

  return (
    <div className="relative min-h-[calc(100vh-100px)] w-full py-8 px-4 sm:px-6 lg:px-8 animate-fade-in max-w-7xl mx-auto">
      {/* Background glowing orbs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#117f90] rounded-full mix-blend-screen filter blur-[128px] opacity-10 animate-float" style={{ animationDelay: "1s", zIndex: -1, pointerEvents: "none" }}></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-[var(--red-9)] rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse-glow" style={{ zIndex: -1, pointerEvents: "none" }}></div>

      <div className="glass-card w-full rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 animate-slide-up flex flex-col md:flex-row gap-8 bg-black/20">
        <div className="w-full md:w-64 shrink-0">
          <AccountTabPanel value={tab} tabs={TAB_LIST} />
        </div>
        <div className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-inner">
          {tab.children && <tab.children />}
        </div>
      </div>
    </div>
  );
}
