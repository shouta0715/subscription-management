import { Button, ContextMenu, Divider } from "@expo/ui/swift-ui";
import { frame, padding } from "@expo/ui/swift-ui/modifiers";
import { Link } from "expo-router";
import { Alert } from "react-native";
import { ThemeToggleContextMenu } from "./theme-toggle-context-menu";
import { DotsIcon } from "@/components/icon/dots";
import { INTERACTIVE_BUTTON_SIZE } from "@/components/modifiers/frame";
import { modifiersPropsToModifiers } from "@/components/modifiers/modifiers-props-to-modifiers";
import { ModifierProps } from "@/components/modifiers/types";

type Props = ModifierProps;

export const MoreContextMenu = ({ modifiers }: Props) => (
  <ContextMenu>
    <ContextMenu.Items>
      {/* TODO: 設定画面に遷移する */}
      <Link asChild href="/">
        <Button systemImage="gearshape">設定</Button>
      </Link>
      <ThemeToggleContextMenu />

      {/* TODO: ヘルプ画面に遷移する */}
      <Link asChild href="/">
        <Button systemImage="questionmark.circle">ヘルプ</Button>
      </Link>
      <Divider />
      <Button
        role="destructive"
        systemImage="rectangle.portrait.and.arrow.right"
        onPress={() => Alert.alert("Logout Button Pressed")}
      >
        ログアウト
      </Button>
    </ContextMenu.Items>
    <ContextMenu.Trigger>
      <Button
        modifiers={[
          padding({ all: 12 }),
          frame(INTERACTIVE_BUTTON_SIZE),
          ...modifiersPropsToModifiers(modifiers),
        ]}
      >
        <DotsIcon aria-label="メニュー" />
      </Button>
    </ContextMenu.Trigger>
  </ContextMenu>
);
