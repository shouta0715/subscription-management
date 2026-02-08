import { Button, Menu, Divider } from "@expo/ui/swift-ui";

import { Link } from "expo-router";
import { Alert } from "react-native";
import { ThemeToggleContextMenu } from "./theme-toggle-context-menu";
import { iconOnlyButtonModifiers } from "@/components/button/modifiers";

export const MoreContextMenu = () => (
  <Menu
    label={
      <Button
        label="もっと"
        modifiers={iconOnlyButtonModifiers}
        systemImage="ellipsis"
        onPress={() => Alert.alert("More Context Menu Pressed")}
      />
    }
  >
    <Link asChild href="/setting">
      <Button label="設定" systemImage="gearshape" />
    </Link>
    <ThemeToggleContextMenu />

    <Link asChild href="/help">
      <Button label="ヘルプ" systemImage="questionmark.circle" />
    </Link>
    <Divider />
    <Button
      label="ログアウト"
      role="destructive"
      systemImage="rectangle.portrait.and.arrow.right"
      onPress={() => Alert.alert("Logout Button Pressed")}
    />
  </Menu>
);
