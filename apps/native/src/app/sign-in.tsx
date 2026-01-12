import { isNullish } from "@package/lib/guard";
import { Redirect } from "expo-router";
import { View } from "react-native";
import { SignIn } from "@/features/auth/components/sign-in";
import { useSession } from "@/lib/auth-client";
import { isAnonymousUser } from "@/util/is-anonymous-user";

function Page() {
  const { data: session } = useSession();

  if (!isNullish(session) && !isAnonymousUser(session)) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <View className="bg-background flex-1 p-4">
      <SignIn />
    </View>
  );
}

export default Page;
