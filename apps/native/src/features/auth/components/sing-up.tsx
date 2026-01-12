import { isNullish } from "@package/lib/guard";
import { Link, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { AppleAuthButton } from "@/components/auth/apple-auth-button";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { PasskeyAuthButton } from "@/components/auth/passkey-auth-button";
import { Button, ButtonLabel } from "@/components/button";
import { Text } from "@/components/native/text";
import { useSignInAnonymous } from "@/hooks/auth/use-sign-in-anonymous";
import { useSession } from "@/lib/auth-client";

export function SignUp() {
  const { signInAnonymous, isPending } = useSignInAnonymous();
  const session = useSession();
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
    <View className="pb-safe flex-1 items-center gap-4">
      <View className="flex-col items-center gap-2">
        <Button
          className="border-border w-[300px] border"
          isDisabled={isPending}
          variant="ghost"
          onPress={handleSignInAnonymous}
        >
          <ButtonLabel bold className="text-center">
            ゲストアカウントで続ける
          </ButtonLabel>
        </Button>
        <Text className="text-muted text-center text-xs">
          後から引き継ぎ・連携できます
        </Text>
      </View>
      <View className="flex-row items-center justify-center">
        <View className="h-px flex-1 bg-gray-200" />
        <Text className="shrink-0 px-4 text-center text-gray-500" font="inter">
          or
        </Text>
        <View className="h-px flex-1 bg-gray-200" />
      </View>

      <View className="flex-col gap-2">
        <PasskeyAuthButton
          isDisabled={isPending}
          onPress={() => console.debug("passkey")}
        />
        <GoogleAuthButton
          isDisabled={isPending}
          onPress={() => console.debug("google")}
        />
        <AppleAuthButton
          isDisabled={isPending}
          onPress={() => console.debug("apple")}
        />
      </View>

      <View className="mt-auto flex-row items-center justify-center">
        <Link asChild href="/sign-in">
          <Text
            bold
            className="text-link text-center underline underline-offset-2"
            font="inter"
          >
            すでにアカウントをお持ちの方はこちら
          </Text>
        </Link>
      </View>
    </View>
  );
}
