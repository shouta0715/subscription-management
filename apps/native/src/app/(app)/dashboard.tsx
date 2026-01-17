import { HStack } from "@expo/ui/swift-ui";
import { glassEffect } from "@expo/ui/swift-ui/modifiers";
import { Alert, View } from "react-native";
import { Host } from "@/components/native/host";
import { SafeAreaView } from "@/components/native/safe-area-view";
import { Text } from "@/components/native/text";
import { AddButton } from "@/features/dashboard/header/components/add-button";
import { MoreContextMenu } from "@/features/dashboard/header/components/more-context-menu";
import { SortButton } from "@/features/dashboard/header/components/sort-button";
import { WalletCarousel } from "@/features/dashboard/wallet-carousel/components";

function Dashboard() {
  return (
    <SafeAreaView className="bg-background flex-1">
      {/* ヘッダー */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text bold className="text-2xl">
          ウォレット
        </Text>

        <Host matchContents>
          <HStack spacing={12}>
            <AddButton />
            <HStack
              modifiers={[
                glassEffect({
                  glass: { variant: "regular", interactive: true },
                }),
              ]}
            >
              <SortButton onPress={() => Alert.alert("Sort Button Pressed")} />
              <MoreContextMenu />
            </HStack>
          </HStack>
        </Host>
      </View>

      {/* ウォレットカルーセル */}
      <View className="flex-1">
        <WalletCarousel />
      </View>
    </SafeAreaView>
  );
}

export default Dashboard;
