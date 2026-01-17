import { Button } from "@expo/ui/swift-ui";
import { frame, padding } from "@expo/ui/swift-ui/modifiers";
import { SortIcon } from "@/components/icon/sort";
import { INTERACTIVE_BUTTON_SIZE } from "@/components/modifiers/frame";
import { modifiersPropsToModifiers } from "@/components/modifiers/modifiers-props-to-modifiers";
import { ModifierProps } from "@/components/modifiers/types";

type Props = {
  onPress: () => void;
} & ModifierProps;

export const SortButton = ({ onPress, modifiers }: Props) => (
  <Button
    modifiers={[
      padding({ all: 12 }),
      frame(INTERACTIVE_BUTTON_SIZE),
      ...modifiersPropsToModifiers(modifiers),
    ]}
    onPress={onPress}
  >
    <SortIcon aria-label="ソート" height={24} width={24} />
  </Button>
);
