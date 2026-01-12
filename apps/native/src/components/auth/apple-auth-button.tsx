import { Button, ButtonLabel } from "../button";
import { AppleIcon } from "../icon/apple";
import { OAuthButtonProps } from "./types";

export const AppleAuthButton = ({
  onPress,
  isPending,
  isDisabled,
  ...props
}: OAuthButtonProps) => (
  <Button
    className="h-[44px] w-[300px] items-center justify-center rounded-full border bg-black dark:bg-white"
    isDisabled={isPending || isDisabled}
    pressableFeedbackVariant="none"
    variant="ghost"
    onPress={onPress}
    {...props}
  >
    <AppleIcon aria-label="Apple" />
    <ButtonLabel
      bold
      className="-ml-2.5 text-white dark:text-black"
      font="inter"
    >
      Continue with Apple
    </ButtonLabel>
  </Button>
);
