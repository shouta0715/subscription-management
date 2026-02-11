import {
  Button,
  HStack,
  Image,
  Menu,
  Text as SwiftUIText,
} from "@expo/ui/swift-ui";
import { controlSize, frame } from "@expo/ui/swift-ui/modifiers";

import { useSubscriptionSort } from "../hooks/use-subscription-sort";
import { Host } from "@/components/native/host";

export function SubscriptionSortMenu() {
  const { isActiveSortOrder, setSortOrder } = useSubscriptionSort();

  return (
    <Host matchContents>
      <Menu
        label={
          <Button
            modifiers={[
              frame({ minWidth: 100, alignment: "trailing" }),
              controlSize("mini"),
            ]}
          >
            <HStack spacing={2}>
              <SwiftUIText>並び替え</SwiftUIText>
              <Image size={14} systemName="arrow.up.arrow.down" />
            </HStack>
          </Button>
        }
        systemImage="arrow.up.arrow.down"
      >
        <Button
          label="支払いが近い順"
          systemImage={
            isActiveSortOrder("nextBillingDate") ? "checkmark" : undefined
          }
          onPress={() => setSortOrder("nextBillingDate")}
        />
        <Button
          label="名前順"
          systemImage={isActiveSortOrder("name") ? "checkmark" : undefined}
          onPress={() => setSortOrder("name")}
        />
        <Button
          label="価格順"
          systemImage={isActiveSortOrder("price") ? "checkmark" : undefined}
          onPress={() => setSortOrder("price")}
        />
      </Menu>
    </Host>
  );
}
