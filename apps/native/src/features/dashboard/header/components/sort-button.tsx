import { Button } from "@expo/ui/swift-ui";

import { iconOnlyButtonModifiers } from "@/components/button/modifiers";

type Props = {
  onPress: () => void;
};

export const SortButton = ({ onPress }: Props) => (
  <Button
    label="ソート"
    modifiers={iconOnlyButtonModifiers}
    systemImage="arrow.up.arrow.down"
    onPress={onPress}
  />
);
