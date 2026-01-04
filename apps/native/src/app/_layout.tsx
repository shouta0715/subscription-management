import "@/tailwind.css";

import { isNullish } from "@package/lib/guard";
import { Stack } from "expo-router";
import { isOnboardingCompleted } from "@/features/onboarding/utils/is-completed";
import { useSession } from "@/lib/auth-client";
import { Providers } from "@/providers";

export default function RootLayout() {
  const { data: session } = useSession();
  const isAuthenticated = !isNullish(session);

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="index" />
        </Stack.Protected>

        {/* authenticated routes */}
        <Stack.Protected guard={isAuthenticated && isOnboardingCompleted()}>
          <Stack.Screen name="(authenticated)" />
        </Stack.Protected>

        {/* onboarding routes */}
        <Stack.Protected guard={!isOnboardingCompleted()}>
          <Stack.Screen name="(onboarding)" />
        </Stack.Protected>
      </Stack>
    </Providers>
  );
}
