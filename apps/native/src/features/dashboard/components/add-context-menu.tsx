import { Alert } from "react-native";
import { ContextMenuAction } from "react-native-context-menu-view";
import { match } from "ts-pattern";
import { Button } from "@/components/button";
import { PlusIcon } from "@/components/icon/plus";
import { ContextMenu } from "@/components/native/context-menu";
import { GlassView } from "@/components/native/glass-effect";

const ADD_MENU_ACTIONS = [
  {
    id: "card",
    title: "カード",
    systemIcon: "creditcard",
  },
  {
    id: "subscription",
    title: "サブスクリプション",
    systemIcon: "arrow.clockwise.circle",
  },
] as const;

type AddMenuActionId = (typeof ADD_MENU_ACTIONS)[number]["id"];

const actions = ADD_MENU_ACTIONS.map(({ title, systemIcon }) => ({
  title,
  systemIcon,
})) satisfies ContextMenuAction[];

export const AddContextMenu = () => {
  const handleMenuPress = (actionId: AddMenuActionId) => {
    match(actionId)
      .with("card", () => {
        // TODO: カード追加ページへの遷移を実装
        Alert.alert("カード追加", "カード追加ページを実装予定です");
      })
      .with("subscription", () => {
        // TODO: サブスクリプション追加ページへの遷移を実装
        Alert.alert(
          "サブスクリプション追加",
          "サブスクリプション追加ページを実装予定です",
        );
      })
      .exhaustive();
  };

  return (
    <ContextMenu
      disableShadow
      actions={actions}
      onPress={(e) => {
        const action = ADD_MENU_ACTIONS[e.nativeEvent.index];

        handleMenuPress(action.id);
      }}
    >
      <GlassView isInteractive className="rounded-full">
        <Button isIconOnly pressableFeedbackVariant="none" variant="ghost">
          <PlusIcon aria-label="Add" />
        </Button>
      </GlassView>
    </ContextMenu>
  );
};
