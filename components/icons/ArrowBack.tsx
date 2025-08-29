import * as React from "react";
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={31}
    fill="none"
    {...props}
  >
    <Circle cx={15} cy={15.5} r={15} fill="url(#a)" />
    <Path
      fill="#000"
      stroke="#000"
      strokeWidth={1.25}
      d="m12.992 10.5.566.554-4.046 4.05h11.821v.792H9.513l4.045 4.054-.566.55L8 15.5l4.992-5Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={-7.697}
        x2={4.721}
        y1={1.152}
        y2={21.709}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFE7B9" />
        <Stop offset={1} stopColor="#CAA969" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgComponent;
