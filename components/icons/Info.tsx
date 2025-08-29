import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill="#EFD569"
      d="M13.5 28a13.5 13.5 0 1 0 0-27 13.5 13.5 0 0 0 0 27Zm-2.11-9.281h1.266v-3.375h-1.265a1.263 1.263 0 0 1-1.266-1.266c0-.701.564-1.265 1.266-1.265h2.53c.702 0 1.267.564 1.267 1.265v4.64h.421c.702 0 1.266.565 1.266 1.266 0 .702-.564 1.266-1.266 1.266h-4.218a1.263 1.263 0 0 1-1.266-1.266c0-.701.564-1.265 1.266-1.265ZM13.5 7.75a1.687 1.687 0 1 1 0 3.374 1.687 1.687 0 0 1 0-3.374Z"
    />
  </Svg>
);
export default SvgComponent;
