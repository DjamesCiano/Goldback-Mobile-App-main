import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M18.51 2.78a.625.625 0 0 0-.783-.792L1.894 7.03A.625.625 0 0 0 1.833 8.2L8.5 11.117l3.559-3.559.884.884-3.576 3.575 2.723 6.637a.625.625 0 0 0 1.171-.04L18.51 2.78Z"
    />
  </Svg>
);
export default SvgComponent;
