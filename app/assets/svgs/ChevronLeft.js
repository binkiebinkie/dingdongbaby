import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props, { stroke, strokeWidth }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
    fill="none"
    xmlns="http://www.w3.org/2000/Svg"
  >
    <Path
      d="M15 19L8 12L15 5"
      stroke={stroke ? stroke : "#847F73"}
      strokeWidth={strokeWidth ? strokeWidth : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgComponent;
