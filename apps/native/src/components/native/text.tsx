/* eslint-disable no-restricted-imports */
import { Text as SwiftText } from "@expo/ui/swift-ui";
import { font as fontModifier } from "@expo/ui/swift-ui/modifiers";
import { ComponentProps } from "react";
import { Text as ReactText } from "react-native";
import { cn } from "tailwind-variants";
import { modifiersPropsToModifiers } from "../modifiers/modifiers-props-to-modifiers";

type ReactTextProps = { type?: "react" } & ComponentProps<typeof ReactText>;

type FontModifierSize = Parameters<typeof fontModifier>[0]["size"];

type SwiftTextProps = {
  type: "swift";
  size?: FontModifierSize;
} & ComponentProps<typeof SwiftText>;

type CommonProps = {
  bold?: boolean;
};

type Props = (ReactTextProps | SwiftTextProps) & CommonProps;

export const Text = (props: Props) => {
  const { bold = false } = props;

  if (props.type === "swift") {
    const { size, modifiers, ...rest } = props;

    return (
      <SwiftText
        modifiers={[
          ...(size || bold
            ? [fontModifier({ size, weight: bold ? "bold" : undefined })]
            : []),
          ...modifiersPropsToModifiers(modifiers),
        ]}
        {...rest}
      />
    );
  }

  const { className, ...rest } = props;

  return <ReactText className={cn(bold && "font-bold", className)} {...rest} />;
};
