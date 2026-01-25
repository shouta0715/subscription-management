import { AnimatedLegendList } from "@legendapp/list/reanimated";
import { isNullish } from "@package/lib/guard";
import { eq } from "@tanstack/db";
import { useLiveSuspenseQuery } from "@tanstack/react-db";
import { View } from "react-native";
import { match } from "ts-pattern";

import { WALLET_CAROUSEL_CONSTANTS } from "../constant";
import { useWalletCarousel } from "../hooks/use-wallet-carousel";
import { CardItem } from "./card-item";
import { ApplePaymentMethodCard } from "@/components/cards/apple";
import { CardPaymentMethodCard } from "@/components/cards/card";
import { GooglePaymentMethodCard } from "@/components/cards/google";
import { OtherPaymentMethodCard } from "@/components/cards/other";
import { Text } from "@/components/native/text";
import { cardCollection } from "@/db/card/collection";
import { paymentMethodCollection } from "@/db/payment-method/collection";
import type { PaymentMethodItem } from "@/types/payment-method";

const ItemSeparator = ({ gap }: { gap: number }) => (
  <View style={{ width: gap }} />
);

export function WalletCarousel() {
  const { data: rawData } = useLiveSuspenseQuery((query) =>
    query
      .from({ paymentMethod: paymentMethodCollection })
      .leftJoin({ card: cardCollection }, ({ paymentMethod, card }) =>
        eq(paymentMethod.cardId, card.id),
      )
      .select(({ paymentMethod, card }) => ({
        ...paymentMethod,
        card,
      })),
  );

  const data: PaymentMethodItem[] = rawData.map((item) => {
    if (item.type === "card") {
      if (isNullish(item.card)) {
        throw new Error(`Card not found for payment method ${item.id}`);
      }

      return { ...item, card: item.card };
    }

    return item;
  });

  const { activeCard, sidePadding, scrollX, onScroll, updateIndexFromOffset } =
    useWalletCarousel({ items: data });

  if (data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center py-8">
        <Text className="text-gray-500">支払い方法が登録されていません</Text>
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
        data={data}
        decelerationRate={0}
        estimatedItemSize={WALLET_CAROUSEL_CONSTANTS.ITEM_WIDTH}
        initialScrollIndex={WALLET_CAROUSEL_CONSTANTS.INITIAL_SCROLL_INDEX}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <CardItem index={index} scrollX={scrollX}>
            {match(item)
              .with({ type: "card" }, (item) => (
                <CardPaymentMethodCard item={item} />
              ))
              .with({ type: "apple" }, (item) => (
                <ApplePaymentMethodCard item={item} />
              ))
              .with({ type: "google" }, (item) => (
                <GooglePaymentMethodCard item={item} />
              ))
              .with({ type: "other" }, (item) => (
                <OtherPaymentMethodCard item={item} />
              ))
              .exhaustive()}
          </CardItem>
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
          {activeCard?.label ?? "支払い方法を選択してください"}
        </Text>
      </View>
    </View>
  );
}
