import { VStack } from "@expo/ui/swift-ui";
import { AppleAuthButton } from "@/components/auth/apple-auth-button";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { PasskeyAuthButton } from "@/components/auth/passkey-auth-button";
import { Host } from "@/components/native/host";

export function SignIn() {
  return (
    <Host className="flex-1">
      <VStack spacing={2}>
        <PasskeyAuthButton
          label="Continue with Passkey"
          onPress={() => console.debug("passkey")}
        />
        <GoogleAuthButton onPress={() => console.debug("google")} />
        <AppleAuthButton onPress={() => console.debug("apple")} />
      </VStack>
    </Host>
  );
}
