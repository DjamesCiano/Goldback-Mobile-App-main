import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      d="m6.47 12.03 3.054 3.054 6.03-6.577-1.107-1.014-4.97 5.423L7.53 10.97l-1.06 1.06Z"
    />
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M.25 11c0 5.928 4.822 10.75 10.75 10.75S21.75 16.928 21.75 11 16.928.25 11 .25.25 5.072.25 11Zm1.5 0c0-5.1 4.15-9.25 9.25-9.25S20.25 5.9 20.25 11 16.1 20.25 11 20.25 1.75 16.1 1.75 11Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
