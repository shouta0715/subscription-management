import { isNullish } from "@package/lib/guard";
import { Link, Redirect } from "expo-router";
import { View } from "react-native";
import { Button, ButtonLabel } from "@/components/button";
import { useSession } from "@/lib/auth-client";

function Page() {
  const { data: session } = useSession();
  const isAuthenticated = !isNullish(session);

  if (isAuthenticated) {
    return <Redirect href="/dashboard" />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Link asChild href="/sign-up">
        <Button size="sm" variant="primary">
          <ButtonLabel bold>新しくはじめる</ButtonLabel>
        </Button>
      </Link>
      <Link asChild href="/sign-in">
        <Button size="sm" variant="secondary">
          <ButtonLabel bold>既存のアカウントでログイン</ButtonLabel>
        </Button>
      </Link>
    </View>
  );
}

export default Page;
