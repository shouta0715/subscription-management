/* eslint-disable no-restricted-imports */
import { cn } from "heroui-native";
import { ComponentProps } from "react";
import { Text as NativeText } from "react-native";

type Props = ComponentProps<typeof NativeText> & { bold?: boolean };

const Text = ({ className, bold = false, ...props }: Props) => (
  <NativeText
    className={cn("font-normal", bold && "font-bold", className)}
    {...props}
  />
);

export { Text };
