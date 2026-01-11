import { Button, ButtonLabel } from "../button";
import { GoogleIcon } from "../icon/google";
import { OAuthButtonProps } from "./types";

export const GoogleAuthButton = ({ onPress }: OAuthButtonProps) => (
  <Button
    className="h-[44px] w-[300px] items-center justify-center rounded-full border border-[#747775] bg-[#FFFFFF] dark:border-[#8E918F] dark:bg-[#131314]"
    pressableFeedbackVariant="none"
    onPress={onPress}
  >
    <GoogleIcon />
    <ButtonLabel
      bold
      className="text-[#1F1F1F] dark:text-[#E3E3E3]"
      font="inter"
    >
      Continue with Google
    </ButtonLabel>
  </Button>
);
