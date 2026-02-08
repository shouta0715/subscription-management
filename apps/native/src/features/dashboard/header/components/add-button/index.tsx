import { Button, Menu, ZStack } from "@expo/ui/swift-ui";
import { glassEffect } from "@expo/ui/swift-ui/modifiers";
import { useState } from "react";
import { AddPaymentMethodBottomSheet } from "./add-payment-method-bottom-sheet";
import { AddSubscriptionBottomSheet } from "./add-subscription-bottom-sheet";
import { iconOnlyButtonModifiers } from "@/components/button/modifiers";

export const AddButton = () => {
  const [isPaymentMethodPresented, setIsPaymentMethodPresented] =
    useState(false);
  const [isSubscriptionPresented, setIsSubscriptionPresented] = useState(false);

  const handleOpenPaymentMethod = () => {
    setIsPaymentMethodPresented(true);
  };

  const handleOpenSubscription = () => {
    setIsSubscriptionPresented(true);
  };

  return (
    <ZStack>
      <Menu
        label="追加"
        modifiers={[
          ...iconOnlyButtonModifiers,
          glassEffect({ glass: { variant: "regular", interactive: true } }),
        ]}
        systemImage="plus"
        onPrimaryAction={handleOpenPaymentMethod}
      >
        <Button
          label="支払い方法"
          systemImage="creditcard"
          onPress={handleOpenPaymentMethod}
        />
        <Button
          label="サブスクリプション"
          systemImage="plus.arrow.trianglehead.clockwise"
          onPress={handleOpenSubscription}
        />
      </Menu>

      <AddPaymentMethodBottomSheet
        isPresented={isPaymentMethodPresented}
        onIsPresentedChange={setIsPaymentMethodPresented}
      />

      <AddSubscriptionBottomSheet
        isPresented={isSubscriptionPresented}
        onIsPresentedChange={setIsSubscriptionPresented}
      />
    </ZStack>
  );
};
