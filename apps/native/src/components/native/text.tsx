/* eslint-disable no-restricted-imports */
import { cn } from "heroui-native";
import { ComponentProps } from "react";
import { Text as NativeText } from "react-native";
import { FontVariantProps, fontStyle } from "../font/style";

type Props = ComponentProps<typeof NativeText> & FontVariantProps;

const Text = ({ className, font, bold, ...props }: Props) => (
  <NativeText className={cn(fontStyle({ font, bold, className }))} {...props} />
);

export { Text };
