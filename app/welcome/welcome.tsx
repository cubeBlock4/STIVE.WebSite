import { Navbar } from "@/components/navbar/Navbar";
import { Flex, Text } from "@radix-ui/themes";

export function Welcome() {
  return (
    <>
      <Flex direction={"column"} gap={"2"}>
        <Text size="8" weight="bold" className="text-white">
          Welcome to STIVE!
        </Text>
      </Flex>
    </>
  );
}
