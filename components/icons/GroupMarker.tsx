import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={37}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#D19D2A"
        d="M15.728 36.4C19.468 31.719 28 20.373 28 14c0-7.73-6.27-14-14-14S0 6.27 0 14c0 6.373 8.531 17.719 12.272 22.4a2.203 2.203 0 0 0 3.456 0ZM12.25 20.417V15.75H7.583c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75h4.667V7.583c0-.97.78-1.75 1.75-1.75s1.75.78 1.75 1.75v4.667h4.667c.97 0 1.75.78 1.75 1.75s-.78 1.75-1.75 1.75H15.75v4.667c0 .97-.78 1.75-1.75 1.75s-1.75-.78-1.75-1.75Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h28v36.909H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
