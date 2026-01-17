import React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";
import { StyledG } from "./styled";

const DotsIcon = (props: SvgProps) => (
  <Svg
    height={18}
    viewBox="0 0 18 18"
    width={18}
    {...props}
    className="text-black dark:text-white"
  >
    <StyledG
      fill="none"
      strokeClassName="text-black dark:text-white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M9 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM3.25 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM14.75 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
    </StyledG>
  </Svg>
);
export { DotsIcon };
