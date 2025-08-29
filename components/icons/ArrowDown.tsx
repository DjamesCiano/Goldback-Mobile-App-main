import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.353 6.353 8 10.707 3.646 6.353l.707-.707L8 9.293l3.646-3.647.707.707Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
