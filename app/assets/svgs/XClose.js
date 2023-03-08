import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = props => (
  <Svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1 1L13 13M1 13L13 1L1 13Z"
      stroke={props.color ? props.color : "#615D53"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgComponent;
