import { useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import type { AccountTab } from "@/components/account/AccountTabPanel";
import { Link, useLocation } from "react-router";

type AccountTabButtonProps = {
  tab: AccountTab;
  active: boolean;
};

const AccountTabButton = ({ tab, active }: AccountTabButtonProps) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true)
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const color = active || isHovered ? "#FDECEB" : "#FFFFFF30";

  return (
    <Link
      to={tab.href ?? ""}
    >
      <Flex
        direction={"column"}
        gap={"2"}
        align={"center"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: isHovered ? "pointer" : "default",
        }}
      >
        <Text align={"center"} style={{ color }}>
          {tab.label}
        </Text>
        <hr style={{ color, width: "80%" }} />
      </Flex>
    </Link>
  );
};

export default AccountTabButton;
