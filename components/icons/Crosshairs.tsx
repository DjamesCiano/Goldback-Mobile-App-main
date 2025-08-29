import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={30}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#EFD569"
        d="M15.5 0c.78 0 1.406.627 1.406 1.406v2.432a11.256 11.256 0 0 1 9.756 9.756h2.432c.779 0 1.406.627 1.406 1.406 0 .78-.627 1.406-1.406 1.406h-2.432a11.256 11.256 0 0 1-9.756 9.756v2.432c0 .779-.627 1.406-1.406 1.406-.78 0-1.406-.627-1.406-1.406v-2.432a11.256 11.256 0 0 1-9.756-9.756H1.906C1.127 16.406.5 15.78.5 15c0-.78.627-1.406 1.406-1.406h2.432a11.256 11.256 0 0 1 9.756-9.756V1.406C14.094.627 14.72 0 15.5 0ZM7.062 15a8.437 8.437 0 1 0 16.875 0 8.437 8.437 0 0 0-16.875 0Zm11.25 0a2.812 2.812 0 1 0-5.624 0 2.812 2.812 0 0 0 5.624 0Zm-8.437 0a5.625 5.625 0 1 1 11.25 0 5.625 5.625 0 0 1-11.25 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h30v30H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
