import React from "react";
import { Alert, View } from "react-native";
import { Button } from "@/components/button";
import { PlusIcon } from "@/components/icon/plus";
import { GlassContainer, GlassView } from "@/components/native/glass-effect";
import { SafeAreaView } from "@/components/native/safe-area-view";
import { Text } from "@/components/native/text";
import { MoreContextMenu } from "@/features/dashboard/context-menu/components/more-context-menu";
import { WalletCarousel } from "@/features/dashboard/wallet-carousel/components";

function Dashboard() {
  return (
    <SafeAreaView className="bg-background flex-1">
      {/* ヘッダー */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <Text bold className="text-2xl">
          ウォレット
        </Text>

        <GlassContainer className="flex-row items-center gap-2">
          <GlassView
            isInteractive
            className="flex-row items-center justify-center rounded-full"
          >
            <Button
              isIconOnly
              pressableFeedbackVariant="none"
              variant="ghost"
              onPress={() => Alert.alert("カードを追加")}
            >
              <PlusIcon aria-label="カードを追加" />
            </Button>
          </GlassView>

          <MoreContextMenu />
        </GlassContainer>
      </View>

      {/* ウォレットカルーセル */}
      <View className="flex-1">
        <WalletCarousel />
      </View>
    </SafeAreaView>
  );
}

export default Dashboard;
