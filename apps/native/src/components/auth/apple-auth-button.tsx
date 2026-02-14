import { Button, HStack, Text, VStack } from "@expo/ui/swift-ui";
import { labelStyle, frame } from "@expo/ui/swift-ui/modifiers";
import { AppleIcon } from "../icon/apple";
import { OAuthButtonProps } from "./types";

export const AppleAuthButton = ({
  onPress,
  label = "Continue with Apple",
}: OAuthButtonProps) => (
  <Button modifiers={[labelStyle("titleAndIcon")]} onPress={onPress}>
    <HStack spacing={4}>
      <VStack modifiers={[frame({ width: 20, height: 20 })]}>
        <AppleIcon aria-label="Apple" />
      </VStack>
      <Text>{label}</Text>
    </HStack>
  </Button>
);
