import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CARD_WIDTH = Math.round(SCREEN_WIDTH * 0.78);
const GAP = 16;
const ITEM_WIDTH = CARD_WIDTH + GAP;
const CARD_HEIGHT = 190;

const INITIAL_SCROLL_INDEX = 0;

export const WALLET_CAROUSEL_CONSTANTS = {
  CARD_WIDTH,
  GAP,
  ITEM_WIDTH,
  SCREEN_WIDTH,
  INITIAL_SCROLL_INDEX,
  CARD_HEIGHT,
};
