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
    <Box
      style={{
        backgroundColor: "#121416",
        height: "500px",
        width: "400px",
        borderImage:
          "linear-gradient(to left, #C1C1C1 1%, #5C5C5C 47%, #5B5B5B 100%) 1",
        borderStyle: "solid",
        borderWidth: "1px",
      }}
    >
      <Flex direction={"column"} style={{ padding: 16 }} gap={"6"}>
        {tabs.map((tab) => (
          <AccountTabButton tab={tab} active={tab.value === value.value} />
        ))}
      </Flex>
    </Box>
  );
};

export default AccountTabPanel;
