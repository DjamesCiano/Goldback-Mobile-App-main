import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#E3BE4D"
      fillRule="evenodd"
      d="M5.814 14.565c.29.167.533.293.705.379l.481.223.481-.223a15.177 15.177 0 0 0 2.839-1.85c1.54-1.279 3.18-3.233 3.18-5.782C13.5 3.734 10.59.833 7 .833S.5 3.733.5 7.312c0 2.549 1.64 4.503 3.18 5.782.778.646 1.554 1.14 2.134 1.471ZM7 4.667A2.667 2.667 0 1 0 7 10a2.667 2.667 0 0 0 0-5.333Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
