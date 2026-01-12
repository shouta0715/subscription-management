import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import interRegular from "../../assets/fonts/Inter-Regular.ttf";
import interSemiBold from "../../assets/fonts/Inter-SemiBold.ttf";
import notoSansJPRegular from "../../assets/fonts/NotoSansJP-Regular.ttf";
import notoSansJPSemiBold from "../../assets/fonts/NotoSansJP-SemiBold.ttf";
import { useSession } from "@/lib/auth-client";

void SplashScreen.preventAutoHideAsync();

type Props = {
  children: React.ReactNode;
};
export const SplashScreenProvider = ({ children }: Props) => {
  const { isPending } = useSession();
  const [loaded] = useFonts({
    "NotoSansJP-Regular": notoSansJPRegular,
    "NotoSansJP-SemiBold": notoSansJPSemiBold,
    "Inter-Regular": interRegular,
    "Inter-SemiBold": interSemiBold,
  });

  const isReady = !isPending && loaded;

  useEffect(() => {
    if (isReady) {
      SplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) return null;

  return children;
};
