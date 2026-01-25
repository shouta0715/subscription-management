import { QueryClient, onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // TODO: デフォルト値を設定する
      staleTime: 0,
      gcTime: 0,
    },
  },
});

onlineManager.setEventListener((setOnline) => {
  const eventSubscription = Network.addNetworkStateListener((state) => {
    setOnline(!!state.isConnected);
  });

  return eventSubscription.remove;
});
