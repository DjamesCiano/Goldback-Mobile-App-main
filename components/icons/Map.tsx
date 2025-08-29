import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      fill="currentColor"
      d="M32.65.246c.375.26.6.687.6 1.143v19.396c0 .577-.358 1.09-.895 1.293l-9.698 3.694c-.3.116-.629.122-.929.018l-10.616-3.533-9.236 3.521a1.388 1.388 0 0 1-1.281-.156A1.386 1.386 0 0 1 0 24.48V5.083c0-.577.352-1.09.895-1.293L10.593.096c.3-.115.629-.121.929-.017L22.138 3.61l9.236-3.52a1.388 1.388 0 0 1 1.281.155h-.005ZM2.77 6.036v16.429l6.928-2.638V3.397L2.77 6.037Zm18.011 16.521V6.082l-8.312-2.77v16.474l8.312 2.771Zm2.771-.086 6.927-2.639V3.404l-6.927 2.632V22.47Z"
    />
  </Svg>
);
export default SvgComponent;
