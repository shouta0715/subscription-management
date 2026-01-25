import { isNullish } from "@package/lib/guard";
import { useCallback, useMemo, useState } from "react";
import {
  ScrollHandlerProcessed,
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import { WALLET_CAROUSEL_CONSTANTS } from "../constant";
import type { PaymentMethodItem } from "@/types/payment-method";

type Props = {
  items: PaymentMethodItem[];
};

type Return = {
  activeCard: PaymentMethodItem | null;
  sidePadding: number;
  scrollX: SharedValue<number>;
  onScroll: ScrollHandlerProcessed;
  updateIndexFromOffset: (offsetX: number) => void;
};

export function useWalletCarousel({ items }: Props): Return {
  const scrollX = useSharedValue(
    WALLET_CAROUSEL_CONSTANTS.INITIAL_SCROLL_INDEX *
      WALLET_CAROUSEL_CONSTANTS.ITEM_WIDTH,
  );

  const [activeIndex, setActiveIndex] = useState(
    WALLET_CAROUSEL_CONSTANTS.INITIAL_SCROLL_INDEX,
  );

  const updateIndexFromOffset = useCallback((offsetX: number) => {
    // 一番近いカードに丸める
    const next = Math.round(offsetX / WALLET_CAROUSEL_CONSTANTS.ITEM_WIDTH);
    setActiveIndex(next);
  }, []);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const sidePadding =
    (WALLET_CAROUSEL_CONSTANTS.SCREEN_WIDTH -
      WALLET_CAROUSEL_CONSTANTS.CARD_WIDTH) /
    2;

  const activeCard = useMemo(() => {
    const currentCard = items[activeIndex];
    if (isNullish(currentCard)) return null;

    return currentCard;
  }, [items, activeIndex]);

  return {
    activeCard,
    sidePadding,
    scrollX,
    onScroll,
    updateIndexFromOffset,
  };
}
