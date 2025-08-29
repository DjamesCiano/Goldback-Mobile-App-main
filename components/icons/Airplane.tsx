import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#E3BE4C"
      d="M21.212 1.236a.75.75 0 0 0-.94-.95l-19 6.05A.75.75 0 0 0 1.2 7.739l8 3.503L13.47 6.97l1.061 1.06-4.29 4.291 3.267 7.964a.75.75 0 0 0 1.405-.05l6.299-18.999Z"
    />
  </Svg>
);
export default SvgComponent;
