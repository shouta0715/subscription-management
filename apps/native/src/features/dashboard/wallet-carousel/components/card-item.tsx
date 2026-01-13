import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withSpring,
  type SharedValue,
} from "react-native-reanimated";

import { WALLET_CAROUSEL_CONSTANTS } from "../constant";
import type { CarouselCardItem } from "../types";
import { UserCardItem } from "./user-card-item";

type CardItemProps = {
  item: CarouselCardItem;
  index: number;
  scrollX: SharedValue<number>;
};

export function CardItem({ item, index, scrollX }: CardItemProps) {
  const rStyle = useAnimatedStyle(() => {
    const x = scrollX.value / WALLET_CAROUSEL_CONSTANTS.ITEM_WIDTH;
    const dist = Math.abs(x - index);

    const scale = withSpring(
      interpolate(dist, [0, 1, 2], [1.0, 0.92, 0.88], Extrapolation.CLAMP),
      {
        dampingRatio: 1,
        duration: 150,
      },
    );
    const translateY = withSpring(
      interpolate(dist, [0, 1, 2], [0, 10, 18], Extrapolation.CLAMP),
      {
        dampingRatio: 1,
        duration: 150,
      },
    );
    const opacity = withSpring(
      interpolate(dist, [0, 1, 2], [1, 0.85, 0.7], Extrapolation.CLAMP),
      {
        dampingRatio: 1,
        duration: 150,
      },
    );

    return { transform: [{ translateY }, { scale }], opacity };
  });

  return (
    <Animated.View
      style={[{ width: WALLET_CAROUSEL_CONSTANTS.CARD_WIDTH }, rStyle]}
    >
      <UserCardItem card={item.data} />
    </Animated.View>
  );
}
