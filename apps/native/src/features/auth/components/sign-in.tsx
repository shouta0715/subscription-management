import { View } from "react-native";
import { AppleAuthButton } from "@/components/auth/apple-auth-button";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { PasskeyAuthButton } from "@/components/auth/passkey-auth-button";

export function SignIn() {
  return (
    <View className="flex-col items-center gap-2">
      <PasskeyAuthButton
        label="Continue with Passkey"
        onPress={() => console.debug("passkey")}
      />
      <GoogleAuthButton onPress={() => console.debug("google")} />
      <AppleAuthButton onPress={() => console.debug("apple")} />
    </View>
  );
}
