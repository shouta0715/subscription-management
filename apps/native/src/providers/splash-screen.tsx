import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";

void SplashScreen.preventAutoHideAsync();

type Props = {
  children: React.ReactNode;
};
export const SplashScreenProvider = ({ children }: Props) => {
  const { isPending } = useSession();

  const isReady = !isPending;

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) return null;

  return children;
};
