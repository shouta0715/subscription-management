import "@/tailwind.css";

import { isNullish } from "@package/lib/guard";
import { Stack } from "expo-router";
import React from "react";
import { useSession } from "@/lib/auth-client";
import { Providers } from "@/providers";

function RootLayout() {
  const { data: session } = useSession();
  const isAuthenticated = !isNullish(session);

  return (
    <Providers>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen
            name="sign-up"
            options={{
              title: "",
              headerBackButtonDisplayMode: "minimal",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="sign-in"
            options={{
              title: "",
              headerBackButtonDisplayMode: "minimal",
              headerShadowVisible: false,
            }}
          />
        </Stack.Protected>

        {/* authenticated routes */}
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </Providers>
  );
}

export default RootLayout;
