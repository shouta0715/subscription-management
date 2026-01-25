import { AnimatedLegendList } from "@legendapp/list/reanimated";
import { useLiveSuspenseQuery } from "@tanstack/react-db";
import { View } from "react-native";

import { WALLET_CAROUSEL_CONSTANTS } from "../constant";
import { useWalletCarousel } from "../hooks/use-wallet-carousel";
import { CarouselCardItem } from "../types";
import { CardItem } from "./card-item";
import { Text } from "@/components/native/text";
import { cardCollection } from "@/db/card/collection";

const ItemSeparator = ({ gap }: { gap: number }) => (
  <View style={{ width: gap }} />
);

export function WalletCarousel() {
  const { data } = useLiveSuspenseQuery((query) =>
    query.from({ cards: cardCollection }),
  );

  const carouselItems: CarouselCardItem[] = data.map((card) => ({
    type: "card",
    data: card,
  }));

  const { activeCard, sidePadding, scrollX, onScroll, updateIndexFromOffset } =
    useWalletCarousel({ items: carouselItems });

  if (carouselItems.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-8">
        <Text className="text-gray-500">カードが登録されていません</Text>
      </View>
    );
  }

  return (
    <View>
      <AnimatedLegendList
        horizontal
        ItemSeparatorComponent={() => (
          <ItemSeparator gap={WALLET_CAROUSEL_CONSTANTS.GAP} />
        )}
        contentContainerStyle={{ paddingHorizontal: sidePadding }}
        data={carouselItems}
        decelerationRate={0}
        estimatedItemSize={WALLET_CAROUSEL_CONSTANTS.ITEM_WIDTH}
        initialScrollIndex={WALLET_CAROUSEL_CONSTANTS.INITIAL_SCROLL_INDEX}
        keyExtractor={(item) => item.data.id}
        renderItem={({ item, index }) => (
          <CardItem index={index} item={item} scrollX={scrollX} />
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToInterval={WALLET_CAROUSEL_CONSTANTS.ITEM_WIDTH}
        style={{ height: WALLET_CAROUSEL_CONSTANTS.CARD_HEIGHT }}
        onMomentumScrollEnd={(event) =>
          updateIndexFromOffset(event.nativeEvent.contentOffset.x)
        }
        onScroll={onScroll}
        onScrollEndDrag={(event) =>
          updateIndexFromOffset(event.nativeEvent.contentOffset.x)
        }
      />

      <View className="mt-4">
        <Text bold className="text-center">
          {activeCard?.data.name ?? "カードを選択してください"}
        </Text>
      </View>
    </View>
  );
}
