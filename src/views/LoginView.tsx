import { Box, Flex } from "@radix-ui/themes";
import { LoginForm } from "@/components/login/LoginForm";

const LoginView = () => {
  return (
    <Flex
      direction={"row"}
      style={{
        height: "100vh",
      }}
    >
      <Box
        style={{
          backgroundColor: "#FFFCF6",
          flex: 5,
          height: "100%",
          width: "100%",
        }}
      >
        <Flex
          height={"100%"}
          width={"100%"}
          justify={"center"}
          align={"center"}
        >
          <img src="/logo.png" alt="logo" />
        </Flex>
      </Box>
      <Box
        style={{
          backgroundColor: "var(--red-4)",
          flex: 2,
          height: "100%",
          width: "100%",
        }}
      >
        <LoginForm />
      </Box>
    </Flex>
  );
};

export default LoginView;
