import { Button, ContextMenu } from "@expo/ui/swift-ui";
import { padding, frame, glassEffect } from "@expo/ui/swift-ui/modifiers";
import { Alert } from "react-native";
import { PlusIcon } from "@/components/icon/plus";
import { INTERACTIVE_BUTTON_SIZE } from "@/components/modifiers/frame";
import { modifiersPropsToModifiers } from "@/components/modifiers/modifiers-props-to-modifiers";
import { ModifierProps } from "@/components/modifiers/types";

type Props = ModifierProps;

export const AddButton = ({ modifiers }: Props) => {
  const handleAddPaymentMethod = () => {
    Alert.alert("支払い方法を追加");
  };

  return (
    <ContextMenu activationMethod="longPress">
      <ContextMenu.Items>
        <Button systemImage="creditcard" onPress={handleAddPaymentMethod}>
          支払い方法
        </Button>
        <Button
          systemImage="plus.arrow.trianglehead.clockwise"
          onPress={handleAddPaymentMethod}
        >
          サブスクリプション
        </Button>
      </ContextMenu.Items>
      <ContextMenu.Trigger>
        <Button
          modifiers={[
            padding({ all: 12 }),
            frame(INTERACTIVE_BUTTON_SIZE),
            glassEffect({ glass: { variant: "regular", interactive: true } }),
            ...modifiersPropsToModifiers(modifiers),
          ]}
          onPress={handleAddPaymentMethod}
        >
          <PlusIcon aria-label="追加" />
        </Button>
      </ContextMenu.Trigger>
    </ContextMenu>
  );
};
