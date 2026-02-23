import { frame } from "@expo/ui/swift-ui/modifiers";

/**
 * インタラクティブなボタンのサイズ
 */
export const INTERACTIVE_BUTTON_SIZE = {
  width: 44,
  height: 44,
} satisfies Parameters<typeof frame>[0];

export const FULL_SIZE = Infinity;
