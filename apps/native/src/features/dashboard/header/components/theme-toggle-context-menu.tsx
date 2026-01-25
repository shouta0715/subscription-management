import { Button, Menu } from "@expo/ui/swift-ui";
import { ComponentPropsWithRef } from "react";
import { match } from "ts-pattern";
import { Uniwind, useUniwind } from "uniwind";
import { ThemeName } from "@/types/theme";

type SystemImage = ComponentPropsWithRef<typeof Button>["systemImage"];
type ExcludeSystemThemeName = Exclude<ThemeName, "system">;

const currentThemeSystemImage = (theme: ExcludeSystemThemeName): SystemImage =>
  match<ExcludeSystemThemeName, SystemImage>(theme)
    .with("light", () => "moon")
    .with("dark", () => "sun.max")
    .exhaustive();

export const ThemeToggleContextMenu = () => {
  const { theme: currentTheme, hasAdaptiveThemes } = useUniwind();

  const isActiveTheme = (theme: ExcludeSystemThemeName) => {
    if (hasAdaptiveThemes) return false;

    return theme === currentTheme;
  };

  return (
    <Menu label="外観" systemImage={currentThemeSystemImage(currentTheme)}>
      <Button
        label="システム"
        systemImage={hasAdaptiveThemes ? "checkmark" : undefined}
        onPress={() => Uniwind.setTheme("system")}
      />
      <Button
        label="ダーク"
        systemImage={isActiveTheme("dark") ? "checkmark" : undefined}
        onPress={() => Uniwind.setTheme("dark")}
      />
      <Button
        label="ライト"
        systemImage={isActiveTheme("light") ? "checkmark" : undefined}
        onPress={() => Uniwind.setTheme("light")}
      />
    </Menu>
  );
};
