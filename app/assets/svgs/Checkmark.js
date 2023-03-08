import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props, { stroke }) => (
  <Svg
    width="10"
    height="9"
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1 4.00012L4.16339 7.29415L9 1.50012"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgComponent;
