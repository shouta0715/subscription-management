import { Link } from "expo-router";
import { View } from "react-native";
import { Button, ButtonLabel } from "@/components/button";

function Page() {
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
