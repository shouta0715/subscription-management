import type { Card } from "@package/model/cards";
import type {
  CardPaymentMethod,
  ApplePaymentMethod,
  GooglePaymentMethod,
  OtherPaymentMethod,
} from "@package/model/payment-methods";

export type CardItem = CardPaymentMethod & { card: Card };
export type AppleItem = ApplePaymentMethod;
export type GoogleItem = GooglePaymentMethod;
export type OtherItem = OtherPaymentMethod;

export type PaymentMethodItem = CardItem | AppleItem | GoogleItem | OtherItem;
