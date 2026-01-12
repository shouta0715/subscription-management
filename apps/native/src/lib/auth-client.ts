import { expoClient } from "@better-auth/expo/client";
import { anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { expoPasskeyClient } from "expo-better-auth-passkey";
import * as SecureStore from "expo-secure-store";
import { env } from "@/env/client";

export const betterAuthClient = createAuthClient({
  baseURL: env.EXPO_PUBLIC_API_URL,
  plugins: [
    expoClient({
      scheme: "sub-mana",
      storagePrefix: "sub-mana",
      storage: SecureStore,
    }),
    anonymousClient(),
    expoPasskeyClient(),
  ],
});

export const authClient = betterAuthClient;

export const { useSession } = betterAuthClient;
