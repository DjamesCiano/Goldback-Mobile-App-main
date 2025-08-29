import * as React from "react";
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34.3 26.22" {...props}>
    <Defs>
      <LinearGradient
        id="a"
        x1={34.29}
        x2={0}
        y1={13.11}
        y2={13.11}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0} />
        <Stop offset={0.53} />
        <Stop offset={0.76} stopColor="#fff" />
        <Stop offset={0.84} stopColor="#fff" />
        <Stop offset={0.93} stopColor="#4d4d4d" />
        <Stop offset={0.97} stopColor="#f2f2f2" />
        <Stop offset={1} />
      </LinearGradient>
    </Defs>
    <G
      data-name="Layer 1"
      style={{
        isolation: "isolate",
      }}
    >
      <Path
        d="M0 .47C2.86-.11 5.72-.1 8.57.2v22.87c-2.86-.3-5.72-.31-8.57.27V.47Z"
        fill="red"
      />
      <Path
        d="M8.57.2c8.57.89 17.15 4.4 25.72 2.68v7.62c-8.57 1.71-17.15-1.79-25.72-2.68V.2Z"
        fill="#00be00"
      />
      <Path
        d="M8.57 7.82c8.57.89 17.15 4.4 25.72 2.68v7.62c-8.57 1.71-17.15-1.79-25.72-2.68V7.82Z"
        fill="#f0f0f0"
      />
      <Path d="M8.57 15.44c8.57.89 17.15 4.4 25.72 2.68v7.62c-8.57 1.72-17.15-1.79-25.72-2.68v-7.62Z" />
      <Path
        d="M0 .47v22.86c11.43-2.29 22.86 4.7 34.29 2.42V2.89C22.86 5.18 11.43-1.81 0 .47Z"
        fill="url(#a)"
        fillRule="evenodd"
        opacity={0.3}
      />
    </G>
  </Svg>
);
export default SvgComponent;
