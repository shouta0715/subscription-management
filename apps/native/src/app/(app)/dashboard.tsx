import React from "react";
import { View } from "react-native";
import { GlassContainer } from "@/components/native/glass-effect";
import { SafeAreaView } from "@/components/native/safe-area-view";
import { Text } from "@/components/native/text";
import { AddContextMenu } from "@/features/dashboard/components/add-context-menu";
import { MoreContextMenu } from "@/features/dashboard/components/more-context-menu";

function Dashboard() {
  return (
    <SafeAreaView className="bg-background flex-1 p-4">
      <View className="flex-row items-center justify-between">
        <Text bold className="text-2xl">
          ウォレット
        </Text>

        <GlassContainer className="flex-row items-center gap-2">
          <AddContextMenu />
          <MoreContextMenu />
        </GlassContainer>
      </View>
    </SafeAreaView>
  );
}

export default Dashboard;
