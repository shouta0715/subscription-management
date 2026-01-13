import { AnimatedLegendList } from "@legendapp/list/reanimated";
import { parseSchema } from "@package/lib/parser";
import { cardIdSchema } from "@package/model/cards";
import { userIdSchema } from "@package/model/users";
import { View } from "react-native";
import { WALLET_CAROUSEL_CONSTANTS } from "../constant";
import { useWalletCarousel } from "../hooks/use-wallet-carousel";
import { CarouselCardItem } from "../types";
import { CardItem } from "./card-item";
import { Text } from "@/components/native/text";

const ItemSeparator = ({ gap }: { gap: number }) => (
  <View style={{ width: gap }} />
);

const cards: CarouselCardItem[] = Array.from({ length: 10 }, (_, index) => ({
  type: "card",
  data: {
    id: parseSchema(cardIdSchema, crypto.randomUUID()),
    userId: parseSchema(userIdSchema, crypto.randomUUID()),
    name: `カード${index + 1}`,
    image: null,
    brand: "visa",
    closingDay: 10,
    paymentDay: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
}));

export function WalletCarousel() {
  const { activeCard, sidePadding, scrollX, onScroll, updateIndexFromOffset } =
    useWalletCarousel({ items: cards });

  return (
    <View>
      <AnimatedLegendList
        horizontal
        ItemSeparatorComponent={() => (
          <ItemSeparator gap={WALLET_CAROUSEL_CONSTANTS.GAP} />
        )}
        contentContainerStyle={{ paddingHorizontal: sidePadding }}
        data={cards}
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
          ここにカード詳細を表示 {activeCard?.data.name}
        </Text>
      </View>
    </View>
  );
}
