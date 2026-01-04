/* eslint-disable no-restricted-imports */
import { cn, Button as NativeButton } from "heroui-native";
import { ComponentProps } from "react";
import { fontStyle, FontVariantProps } from "../font/style";

type ButtonProps = ComponentProps<typeof NativeButton> & FontVariantProps;

const Button = ({ children, className, font, bold, ...props }: ButtonProps) => (
  <NativeButton className={cn(fontStyle({ font, bold, className }))} {...props}>
    {children}
  </NativeButton>
);

type ButtonLabelProps = ComponentProps<typeof NativeButton.Label> &
  FontVariantProps;

const ButtonLabel = ({
  children,
  className,
  font,
  bold,
  ...props
}: ButtonLabelProps) => (
  <NativeButton.Label
    className={cn(fontStyle({ font, bold, className }))}
    {...props}
  >
    {children}
  </NativeButton.Label>
);

export { Button, ButtonLabel };
