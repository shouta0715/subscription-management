/* eslint-disable no-restricted-imports */
import { Text as SwiftText } from "@expo/ui/swift-ui";
import {
  font as fontModifier,
  foregroundStyle,
} from "@expo/ui/swift-ui/modifiers";
import { ComponentProps, FC } from "react";
import { Text as ReactText } from "react-native";
import { cn } from "tailwind-variants";
import { modifiersPropsToModifiers } from "../modifiers/modifiers-props-to-modifiers";
import { ThemeColor, useThemeColor } from "@/lib/theme";

type ReactTextProps = { type?: "react" } & ComponentProps<typeof ReactText>;

type FontModifierSize = Parameters<typeof fontModifier>[0]["size"];

type SwiftTextProps = {
  type: "swift";
  size?: FontModifierSize;
  color?: ThemeColor;
} & ComponentProps<typeof SwiftText>;

type CommonProps = {
  bold?: boolean;
};

type Props = (ReactTextProps | SwiftTextProps) & CommonProps;

const SwiftThemeText: FC<Extract<Props, { type: "swift" }>> = (props) => {
  const { size, modifiers, bold, ...rest } = props;
  const labelColor = useThemeColor(props.color ?? "label-primary");

  return (
    <SwiftText
      modifiers={[
        foregroundStyle({ type: "color", color: labelColor }),
        ...(size || bold
          ? [fontModifier({ size, weight: bold ? "bold" : undefined })]
          : []),
        ...modifiersPropsToModifiers(modifiers),
      ]}
      {...rest}
    />
  );
};

export const Text: FC<Props> = (props) => {
  const { bold = false } = props;

  if (props.type === "swift") {
    return <SwiftThemeText {...props} />;
  }

  const { className, ...rest } = props;

  return (
    <ReactText
      className={cn("text-label-primary", bold && "font-bold", className)}
      {...rest}
    />
  );
};
