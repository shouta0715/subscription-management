import { focusManager } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import { queryClient } from "@/lib/query-client";
import { persistStorageClient } from "@/lib/storage/client";

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
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: persistStorageClient }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
