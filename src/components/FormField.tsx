import type { CSSProperties, ReactNode } from "react";
import { Flex, Text } from "@radix-ui/themes";

type FormFieldProps = {
  error?: boolean;
  helperText?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const FormField = ({ error, helperText, style, children}: FormFieldProps) => {
  return (
    <Flex direction={"column"} gap={"1"} style={style}>
      {children}
      {error && helperText && <Text size={"1"} color={"red"}>{helperText}</Text>}
    </Flex>
  );
}

export default FormField;