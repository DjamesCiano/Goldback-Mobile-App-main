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
      fill="#E3BE4D"
      d="M3.389 7.83c.576.95 1.295 1.857 2.11 2.671.814.815 1.72 1.534 2.67 2.11l2.386-2.559 4.612 2.627c-.67 1.243-2.275 2.832-4.315 2.421-.964-.194-1.915-.518-3.065-1.178a15.497 15.497 0 0 1-3.222-2.484 15.527 15.527 0 0 1-2.487-3.225c-.66-1.15-.984-2.102-1.179-3.065C.49 3.108 2.078 1.503 3.321.833l2.626 4.612L3.39 7.83Z"
    />
  </Svg>
);
export default SvgComponent;
