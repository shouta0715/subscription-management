import { Button, HStack, Text, VStack } from "@expo/ui/swift-ui";
import { frame, labelStyle } from "@expo/ui/swift-ui/modifiers";
import { PasskeyIcon } from "../icon/passkey";
import { OAuthButtonProps } from "./types";

type Props = OAuthButtonProps & {
  label?: string;
};

export const PasskeyAuthButton = ({
  onPress,
  label = "Create a Passkey",
}: Props) => (
  <Button modifiers={[labelStyle("titleAndIcon")]} onPress={onPress}>
    <HStack spacing={4}>
      <VStack modifiers={[frame({ width: 20, height: 20 })]}>
        <PasskeyIcon aria-label="Passkey" />
      </VStack>
      <Text>{label}</Text>
    </HStack>
  </Button>
);
