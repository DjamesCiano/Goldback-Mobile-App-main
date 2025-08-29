import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#E3BE4D"
      fillRule="evenodd"
      d="M9.167 1.042a8.125 8.125 0 1 0 5.286 14.295l3.438 3.438a.625.625 0 0 0 .884-.883l-3.438-3.439a8.125 8.125 0 0 0-6.17-13.411ZM2.292 9.167a6.875 6.875 0 1 1 13.75 0 6.875 6.875 0 0 1-13.75 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
