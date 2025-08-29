import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={35}
    fill="none"
    {...props}
  >
    <Path
      fill="#EFD569"
      d="M4.375 2.188A4.379 4.379 0 0 0 0 6.561v21.875a4.379 4.379 0 0 0 4.375 4.375h26.25A4.379 4.379 0 0 0 35 28.439V6.563a4.379 4.379 0 0 0-4.375-4.375H4.375Zm7.588 9.775a1.634 1.634 0 0 1 2.317 0l3.213 3.213 3.213-3.213a1.634 1.634 0 0 1 2.317 0 1.64 1.64 0 0 1 0 2.317l-3.212 3.213 3.212 3.213a1.634 1.634 0 0 1 0 2.317 1.64 1.64 0 0 1-2.317 0l-3.213-3.212-3.213 3.212a1.64 1.64 0 0 1-2.317-2.317l3.213-3.213-3.213-3.213a1.634 1.634 0 0 1 0-2.317Z"
    />
  </Svg>
);
export default SvgComponent;
