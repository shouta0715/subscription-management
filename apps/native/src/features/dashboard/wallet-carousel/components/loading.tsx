import { View, ActivityIndicator } from "react-native";
import { Text } from "@/components/native/text";

export function WalletCarouselLoading() {
  return (
    <View className="flex-1 items-center justify-center py-8">
      <ActivityIndicator size="large" />
      <Text className="mt-4 text-gray-500">データを読み込んでいます...</Text>
    </View>
  );
}
