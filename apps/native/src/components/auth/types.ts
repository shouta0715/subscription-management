import { Button } from "@expo/ui/swift-ui";
import { ComponentProps } from "react";

export type OAuthButtonProps = {
  onPress: () => void;
  isPending?: boolean;
} & ComponentProps<typeof Button>;
