import { HStack } from "@expo/ui/swift-ui";
import { glassEffect } from "@expo/ui/swift-ui/modifiers";
import { Suspense } from "react";
import { Alert, View } from "react-native";
import { PageContainer } from "@/components/container/page-container";
import { Host } from "@/components/native/host";
import { Text } from "@/components/native/text";
import { AddButton } from "@/features/dashboard/header/components/add-button";
import { MoreContextMenu } from "@/features/dashboard/header/components/more-context-menu";
import { SortButton } from "@/features/dashboard/header/components/sort-button";
import { WalletCarousel } from "@/features/dashboard/wallet-carousel/components";
import { WalletCarouselLoading } from "@/features/dashboard/wallet-carousel/components/loading";

function Dashboard() {
  return (
    <PageContainer className="pt-safe">
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

      <Suspense fallback={<WalletCarouselLoading />}>
        <View className="flex-1">
          <WalletCarousel />
        </View>
      </Suspense>
    </PageContainer>
  );
}

export default Dashboard;
