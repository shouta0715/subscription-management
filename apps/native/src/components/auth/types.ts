import { ComponentProps } from "react";
import { Button } from "../button";

export type OAuthButtonProps = {
  onPress: () => void;
  isPending?: boolean;
} & ComponentProps<typeof Button>;
