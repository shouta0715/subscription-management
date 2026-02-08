import { BottomSheet, Group, RNHostView } from "@expo/ui/swift-ui";
import { View } from "react-native";
import { bottomSheetModifiers } from "./modifiers";
import { Text } from "@/components/native/text";

type AddSubscriptionBottomSheetProps = {
  isPresented: boolean;
  onIsPresentedChange: (isPresented: boolean) => void;
};

export const AddSubscriptionBottomSheet = ({
  isPresented,
  onIsPresentedChange,
}: AddSubscriptionBottomSheetProps) => (
  <BottomSheet
    isPresented={isPresented}
    onIsPresentedChange={onIsPresentedChange}
  >
    <Group modifiers={bottomSheetModifiers}>
      <RNHostView>
        <View className="flex-1 items-center justify-center">
          <Text>サブスクリプションを追加</Text>
        </View>
      </RNHostView>
    </Group>
  </BottomSheet>
);
