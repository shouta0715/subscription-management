import { expoClient } from "@better-auth/expo/client";
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
  ],
});

export const authClient = betterAuthClient;

export const { useSession } = betterAuthClient;
