import { View } from "react-native";
import { Button, ButtonLabel } from "@/components/button";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Button size="sm" variant="primary">
        <ButtonLabel>サインアップ</ButtonLabel>
      </Button>
    </View>
  );
}
