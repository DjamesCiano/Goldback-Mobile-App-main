import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={20}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#FC3C3C"
        d="M3 3.078a.627.627 0 0 0-.625.625v12.5c0 .344.281.625.625.625h12.5a.627.627 0 0 0 .625-.625v-12.5a.627.627 0 0 0-.625-.625H3Zm-2.5.625c0-1.379 1.121-2.5 2.5-2.5h12.5c1.379 0 2.5 1.121 2.5 2.5v12.5c0 1.379-1.121 2.5-2.5 2.5H3a2.502 2.502 0 0 1-2.5-2.5v-12.5Zm5.938 5.313h5.625c.519 0 .937.417.937.937s-.418.938-.938.938H6.439a.935.935 0 0 1-.938-.938c0-.52.418-.938.938-.938Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0H18v20H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
