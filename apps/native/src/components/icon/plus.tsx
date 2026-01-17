import { Svg, Path, SvgProps } from "react-native-svg";
import { StyledG } from "./styled";

const PlusIcon = (props: SvgProps) => (
  <Svg height={24} viewBox="0 0 18 18" width={24} {...props}>
    <StyledG
      fill="none"
      strokeClassName="text-black dark:text-white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M9 3.25v11.5M3.25 9h11.5" />
    </StyledG>
  </Svg>
);
export { PlusIcon };
