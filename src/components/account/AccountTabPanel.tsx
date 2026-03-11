import { Box, Flex } from "@radix-ui/themes";
import AccountTabButton from "@/components/account/AccountTabButton";

export type AccountTab = {
  label: string;
  value: string;
  href?: string;
  onClick?: () => void;
  children?: React.ComponentType;
};

type AccountTabPanelProps = {
  value: AccountTab;
  tabs: AccountTab[];
};

const AccountTabPanel = ({ value, tabs }: AccountTabPanelProps) => {
  return (
    <div className="w-full h-full">
      <Flex direction={"column"} className="py-2" gap={"4"}>
        {tabs.map((tab) => (
          <AccountTabButton key={tab.value} tab={tab} active={tab.value === value.value} />
        ))}
      </Flex>
    </div>
  );
};

export default AccountTabPanel;
