import { Button, HStack, VStack } from "@expo/ui/swift-ui";
import { frame, labelStyle } from "@expo/ui/swift-ui/modifiers";
import { GoogleIcon } from "../icon/google";
import { OAuthButtonProps } from "./types";
import { Text } from "@/components/native/text";

export const GoogleAuthButton = ({
  onPress,
  label = "Continue with Google",
}: OAuthButtonProps) => (
  <Button modifiers={[labelStyle("titleAndIcon")]} onPress={onPress}>
    <HStack spacing={4}>
      <VStack modifiers={[frame({ width: 20, height: 20 })]}>
        <GoogleIcon />
      </VStack>
      <Text type="swift">{label}</Text>
    </HStack>
  </Button>
);
