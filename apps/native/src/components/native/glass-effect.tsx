/* eslint-disable no-restricted-imports */
import {
  GlassView as ExpoGlassView,
  GlassContainer as ExpoGlassContainer,
} from "expo-glass-effect";
import { withUniwind } from "uniwind";

const GlassView = withUniwind(ExpoGlassView);
const GlassContainer = withUniwind(ExpoGlassContainer);

export { GlassView, GlassContainer };
