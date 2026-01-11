import { Svg, G, Path, SvgProps } from "react-native-svg";
import { withUniwind } from "uniwind";

const StyledG = withUniwind(G, {
  stroke: {
    styleProperty: "color",
    fromClassName: "colorClassName",
  },
});

const PasskeyIcon = (props: SvgProps) => (
  <Svg height={18} width={18} {...props}>
    <StyledG
      colorClassName="text-black dark:text-white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M9 7.25a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z" />
      <Path d="M11.25 16.75a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM13.25 14.75h4" />
      <Path d="M10.172 9.874A6.218 6.218 0 0 0 9 9.751a6.241 6.241 0 0 0-5.709 3.72c-.365.825.087 1.773.947 2.044.632.2 1.373.386 2.201.522" />
      <Path d="M15.75 14.75v1.5" />
    </StyledG>
  </Svg>
);

export { PasskeyIcon };
