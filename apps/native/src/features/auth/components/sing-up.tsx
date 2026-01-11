import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { AppleAuthButton } from "@/components/auth/apple-auth-button";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { PasskeyAuthButton } from "@/components/auth/passkey-auth-button";
import { Button, ButtonLabel } from "@/components/button";
import { Text } from "@/components/native/text";

export function SignUp() {
  return (
    <View className="pb-safe flex-1 items-center gap-4">
      <Button
        className="w-[300px]"
        variant="ghost"
        onPress={() => console.debug("skip")}
      >
        <ButtonLabel bold className="text-center">
          ログインをスキップ
        </ButtonLabel>
      </Button>
      <View className="flex-row items-center justify-center">
        <View className="h-px flex-1 bg-gray-200" />
        <Text className="shrink-0 px-4 text-center text-gray-500" font="inter">
          or
        </Text>
        <View className="h-px flex-1 bg-gray-200" />
      </View>

      <View className="flex-col gap-2">
        <PasskeyAuthButton onPress={() => console.debug("passkey")} />
        <GoogleAuthButton onPress={() => console.debug("google")} />
        <AppleAuthButton onPress={() => console.debug("apple")} />
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
