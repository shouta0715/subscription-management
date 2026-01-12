import { Svg, G, Path, SvgProps } from "react-native-svg";

const PlusIcon = (props: SvgProps) => (
  <Svg height={18} width={18} {...props}>
    <G
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M9 3.25v11.5M3.25 9h11.5" />
    </G>
  </Svg>
);
export { PlusIcon };
