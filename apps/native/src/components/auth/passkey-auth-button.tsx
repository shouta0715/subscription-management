import { Button, ButtonLabel } from "../button";
import { PasskeyIcon } from "../icon/passkey";
import { OAuthButtonProps } from "./types";

type Props = OAuthButtonProps & {
  label?: string;
};

export const PasskeyAuthButton = ({
  onPress,
  label = "Create a Passkey",
  isPending,
  isDisabled,
  ...props
}: Props) => (
  <Button
    className="h-[44px] w-[300px] items-center justify-center rounded-full border border-[#747775] bg-[#FFFFFF] dark:border-[#8E918F] dark:bg-[#131314]"
    isDisabled={isPending || isDisabled}
    pressableFeedbackVariant="none"
    onPress={onPress}
    {...props}
  >
    <PasskeyIcon aria-label="Passkey" />
    <ButtonLabel
      bold
      className="text-[#1F1F1F] dark:text-[#E3E3E3]"
      font="inter"
    >
      {label}
    </ButtonLabel>
  </Button>
);
