import { Svg, G, Path, SvgProps } from "react-native-svg";

const DotsIcon = (props: SvgProps) => (
  <Svg height={18} width={18} {...props}>
    <G
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M9 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM3.25 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM14.75 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
    </G>
  </Svg>
);
export { DotsIcon };
