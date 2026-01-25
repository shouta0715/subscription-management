import { ButtonProps } from "@expo/ui/swift-ui";
import {
  labelStyle,
  foregroundStyle,
  frame,
} from "@expo/ui/swift-ui/modifiers";
import { INTERACTIVE_BUTTON_SIZE } from "../modifiers/frame";

export const iconOnlyButtonModifiers = [
  labelStyle("iconOnly"),
  foregroundStyle("primary"),
  frame(INTERACTIVE_BUTTON_SIZE),
] satisfies ButtonProps["modifiers"];
