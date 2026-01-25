import { Button, Menu } from "@expo/ui/swift-ui";
import { glassEffect } from "@expo/ui/swift-ui/modifiers";
import { Alert } from "react-native";
import { iconOnlyButtonModifiers } from "@/components/button/modifiers";

export const AddButton = () => {
  const handleAddPaymentMethod = () => {
    Alert.alert("支払い方法を追加");
  };

  return (
    <Menu
      label="追加"
      modifiers={[
        ...iconOnlyButtonModifiers,
        glassEffect({ glass: { variant: "regular", interactive: true } }),
      ]}
      systemImage="plus"
      onPrimaryAction={handleAddPaymentMethod}
    >
      <Button
        label="支払い方法"
        systemImage="creditcard"
        onPress={handleAddPaymentMethod}
      />
      <Button
        label="サブスクリプション"
        systemImage="plus.arrow.trianglehead.clockwise"
        onPress={handleAddPaymentMethod}
      />
    </Menu>
  );
};
