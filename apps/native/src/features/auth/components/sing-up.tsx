import {
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  ZStack,
} from "@expo/ui/swift-ui";
import { labelStyle } from "@expo/ui/swift-ui/modifiers";
import { isNullish } from "@package/lib/guard";
import { Link, useRouter } from "expo-router";
import React from "react";
import { AppleAuthButton } from "@/components/auth/apple-auth-button";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { PasskeyAuthButton } from "@/components/auth/passkey-auth-button";
import { Host } from "@/components/native/host";
import { useSignInAnonymous } from "@/hooks/auth/use-sign-in-anonymous";
import { useSession } from "@/lib/auth-client";

export function SignUp() {
  const { signInAnonymous } = useSignInAnonymous();
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignInAnonymous = async () => {
    if (!isNullish(session)) {
      router.replace("/dashboard");

      return;
    }

    try {
      await signInAnonymous();
      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Host className="flex-1">
      <VStack spacing={8}>
        <VStack spacing={8}>
          <Button
            label="ゲストアカウントで続ける"
            modifiers={[labelStyle("titleAndIcon")]}
            onPress={handleSignInAnonymous}
          >
            <Text>ゲストアカウントで続ける</Text>
          </Button>
          <Text>後から引き継ぎ・連携できます</Text>
        </VStack>

        <ZStack>
          <Divider />
          <Text>or</Text>
          <Divider />
        </ZStack>

        <VStack spacing={2}>
          <PasskeyAuthButton onPress={() => console.debug("passkey")} />
          <GoogleAuthButton onPress={() => console.debug("google")} />
          <AppleAuthButton onPress={() => console.debug("apple")} />
        </VStack>

        <HStack spacing={2}>
          <Link asChild href="/sign-in">
            <Text>すでにアカウントをお持ちの方はこちら</Text>
          </Link>
        </HStack>
      </VStack>
    </Host>
  );
}
