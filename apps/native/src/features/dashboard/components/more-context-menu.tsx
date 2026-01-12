import { Alert } from "react-native";
import { ContextMenuAction } from "react-native-context-menu-view";
import { match } from "ts-pattern";
import { Button } from "@/components/button";
import { DotsIcon } from "@/components/icon/dots";
import { ContextMenu } from "@/components/native/context-menu";
import { GlassView } from "@/components/native/glass-effect";

const MENU_ACTIONS = [
  {
    id: "settings",
    title: "設定",
    systemIcon: "gearshape",
  },
  {
    id: "account",
    title: "アカウント情報",
    systemIcon: "person.circle",
  },
  {
    id: "notifications",
    title: "通知設定",
    systemIcon: "bell.badge",
  },
  {
    id: "help",
    title: "ヘルプ・サポート",
    systemIcon: "questionmark.circle",
  },
] as const;

const actions = MENU_ACTIONS.map(({ title, systemIcon }) => ({
  title,
  systemIcon,
})) satisfies ContextMenuAction[];

type MenuActionId = (typeof MENU_ACTIONS)[number]["id"];

export const MoreContextMenu = () => {
  const handleMenuPress = (actionId: MenuActionId) => {
    match(actionId)
      .with("settings", () => {
        // TODO: 設定ページへの遷移を実装
        Alert.alert("設定", "設定ページを実装予定です");
      })
      .with("account", () => {
        // TODO: アカウント情報ページへの遷移を実装
        Alert.alert("アカウント情報", "アカウント情報ページを実装予定です");
      })
      .with("notifications", () => {
        // TODO: 通知設定ページへの遷移を実装
        Alert.alert("通知設定", "通知設定ページを実装予定です");
      })
      .with("help", () => {
        // TODO: ヘルプページへの遷移を実装
        Alert.alert("ヘルプ・サポート", "ヘルプページを実装予定です");
      })
      .exhaustive();
  };

  return (
    <ContextMenu
      dropdownMenuMode
      actions={actions}
      onPress={(e) => {
        const action = MENU_ACTIONS[e.nativeEvent.index];

        handleMenuPress(action.id);
      }}
    >
      <GlassView
        isInteractive
        className="flex-row items-center justify-center rounded-full"
      >
        <Button isIconOnly pressableFeedbackVariant="none" variant="ghost">
          <DotsIcon aria-label="More" />
        </Button>
      </GlassView>
    </ContextMenu>
  );
};
