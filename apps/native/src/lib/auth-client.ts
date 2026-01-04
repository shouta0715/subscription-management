import { expoClient } from "@better-auth/expo/client";
import { passkeyClient } from "@better-auth/passkey/client";
import { anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
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
    passkeyClient(),
  ],
});

export const authClient = betterAuthClient;

export const { useSession } = betterAuthClient;
