import { Svg, Path, SvgProps } from "react-native-svg";
import { StyledG } from "./styled";

const SortIcon = (props: SvgProps) => (
  <Svg height={24} viewBox="0 0 18 18" width={24} {...props}>
    <StyledG fillClassName="text-black dark:text-white">
      <Path d="M15.75 8.25h-5.5a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5ZM10.25 6.5h5.5a.75.75 0 0 0 0-1.5h-5.5a.75.75 0 0 0 0 1.5ZM14.25 11.5h-4a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5Z" />
      <Path d="M6.72 5.78a.747.747 0 0 0 1.06 0 .75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 0 0-1.06 0l-2.5 2.5a.75.75 0 1 0 1.06 1.06L4 4.56v8.88l-1.22-1.22a.75.75 0 1 0-1.06 1.06l2.5 2.5a.747.747 0 0 0 1.06 0l2.5-2.5a.75.75 0 1 0-1.06-1.06L5.5 13.44V4.56l1.22 1.22Z" />
    </StyledG>
  </Svg>
);

export { SortIcon };
