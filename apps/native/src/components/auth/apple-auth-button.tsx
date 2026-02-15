import { Button, HStack, VStack } from "@expo/ui/swift-ui";
import { frame, labelStyle } from "@expo/ui/swift-ui/modifiers";
import { AppleIcon } from "../icon/apple";
import { OAuthButtonProps } from "./types";
import { Text } from "@/components/native/text";

export const AppleAuthButton = ({
  onPress,
  label = "Continue with Apple",
}: OAuthButtonProps) => (
  <Button modifiers={[labelStyle("titleAndIcon")]} onPress={onPress}>
    <HStack spacing={4}>
      <VStack modifiers={[frame({ width: 20, height: 20 })]}>
        <AppleIcon aria-label="Apple" />
      </VStack>
      <Text type="swift">{label}</Text>
    </HStack>
  </Button>
);
