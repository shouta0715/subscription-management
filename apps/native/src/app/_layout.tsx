import "@/tailwind.css";

import { isNullish } from "@package/lib/guard";
import { Stack } from "expo-router";
import React from "react";
import { useSession } from "@/lib/auth-client";
import { Providers } from "@/providers";
import { isAnonymousUser } from "@/util/is-anonymous-user";

function RootLayout() {
  const { data: session } = useSession();

  const isAuthenticated = !isNullish(session);

  const canAccessAuthRoute = !isAuthenticated || isAnonymousUser(session);

  return (
    <Providers>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Protected guard={canAccessAuthRoute}>
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
          <Stack.Screen
            name="(app)"
            options={{ headerShown: false, animation: "none" }}
          />
        </Stack.Protected>
      </Stack>
    </Providers>
  );
}

export default RootLayout;
