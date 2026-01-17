import { G } from "react-native-svg";
import { withUniwind } from "uniwind";

export const StyledG = withUniwind(G, {
  stroke: {
    styleProperty: "color",
    fromClassName: "strokeClassName",
  },
  fill: {
    styleProperty: "color",
    fromClassName: "fillClassName",
  },
});
