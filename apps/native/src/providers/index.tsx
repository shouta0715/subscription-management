import { HeroUINativeProvider } from "heroui-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";
import { TanstackQueryClientProvider } from "./query-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <TanstackQueryClientProvider>
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets);
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <HeroUINativeProvider>{children}</HeroUINativeProvider>
      </GestureHandlerRootView>
    </SafeAreaListener>
  </TanstackQueryClientProvider>
);
