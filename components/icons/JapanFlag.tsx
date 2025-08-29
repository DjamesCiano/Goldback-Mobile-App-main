import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill="#F0F0F0"
      fillRule="evenodd"
      d="M0 14.966c7.333-1.468 14.667 3.02 22 1.552V1.85C14.667 3.312 7.333-1.17 0 .3v14.666Z"
      clipRule="evenodd"
    />
    <Path
      fill="#F90805"
      fillRule="evenodd"
      d="M15.397 9.216c0-2.416-1.967-4.686-4.403-5.211-2.43-.526-4.398 1.147-4.398 3.59 0 2.442 1.968 4.685 4.398 5.211 2.43.526 4.403-1.147 4.403-3.59Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
