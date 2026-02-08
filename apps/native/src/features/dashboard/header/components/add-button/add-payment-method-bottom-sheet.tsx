import { BottomSheet, Group, RNHostView } from "@expo/ui/swift-ui";
import { View } from "react-native";
import { bottomSheetModifiers } from "./modifiers";
import { Text } from "@/components/native/text";

type AddPaymentMethodBottomSheetProps = {
  isPresented: boolean;
  onIsPresentedChange: (isPresented: boolean) => void;
};

export const AddPaymentMethodBottomSheet = ({
  isPresented,
  onIsPresentedChange,
}: AddPaymentMethodBottomSheetProps) => (
  <BottomSheet
    isPresented={isPresented}
    onIsPresentedChange={onIsPresentedChange}
  >
    <Group modifiers={bottomSheetModifiers}>
      <RNHostView>
        <View className="flex-1 items-center justify-center">
          <Text>支払い方法を追加</Text>
        </View>
      </RNHostView>
    </Group>
  </BottomSheet>
);
