import { isNullish } from "@package/lib/guard";
import { Redirect } from "expo-router";
import { View } from "react-native";
import { SignUp } from "@/features/auth/components/sing-up";
import { useSession } from "@/lib/auth-client";
import { isAnonymousUser } from "@/util/is-anonymous-user";

function Page() {
  const { data: session } = useSession();
  // MEMO: 匿名アカウントじゃない場合はダッシュボードにリダイレクト
  if (!isNullish(session) && !isAnonymousUser(session)) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <View className="bg-background flex-1 p-4">
      <SignUp />
    </View>
  );
}

export default Page;
