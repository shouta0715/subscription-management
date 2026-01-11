import { isNullish } from "@package/lib/guard";
import { Redirect } from "expo-router";
import { View } from "react-native";
import { SignUp } from "@/features/auth/components/sing-up";
import { useSession } from "@/lib/auth-client";

function Page() {
  const { data: session } = useSession();

  if (!isNullish(session)) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <View className="bg-background flex-1 p-4">
      <SignUp />
    </View>
  );
}

export default Page;
