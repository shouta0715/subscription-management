import { Button } from "heroui-native";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Button size="sm" variant="primary">
        <Button.Label>Sign Up</Button.Label>
      </Button>
    </View>
  );
}
