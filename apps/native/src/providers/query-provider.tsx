import { focusManager, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import { queryClient } from "@/lib/query-client";

type Props = {
  children: React.ReactNode;
};

const onUpdateQueryFocusManagerStatus = (status: AppStateStatus) => {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
};

export const TanstackQueryClientProvider = ({ children }: Props) => {
  useEffect(() => {
    const sub = AppState.addEventListener(
      "change",
      onUpdateQueryFocusManagerStatus,
    );

    return () => sub.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
