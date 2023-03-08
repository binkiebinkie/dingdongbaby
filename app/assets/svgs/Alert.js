import * as React from "react";
import Svg, { Path, Rect, Circle } from "react-native-svg";

const SvgComponent = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M12 1.89187L13.7578 4.71479C14.2102 5.44137 15.0748 5.79952 15.9085 5.60566L19.1475 4.85247L18.3943 8.09149C18.2005 8.92518 18.5586 9.78982 19.2852 10.2422L22.1081 12L19.2852 13.7578C18.5586 14.2102 18.2005 15.0748 18.3943 15.9085L19.1475 19.1475L15.9085 18.3943C15.0748 18.2005 14.2102 18.5586 13.7578 19.2852L12 22.1081L10.2422 19.2852C9.78982 18.5586 8.92518 18.2005 8.09149 18.3943L4.85247 19.1475L5.60566 15.9085C5.79952 15.0748 5.44138 14.2102 4.71478 13.7578L1.89187 12L4.71479 10.2422C5.44137 9.78982 5.79952 8.92518 5.60566 8.09149L4.85247 4.85247L8.09149 5.60566C8.92518 5.79952 9.78982 5.44138 10.2422 4.71478L12 1.89187Z"
      stroke={props.color ? props.color : "#ECA61B"}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <Rect
      x="11"
      y="7"
      width="2"
      height="6"
      rx="1"
      fill={props.color ? props.color : "#ECA61B"}
    />
    <Circle
      cx="12"
      cy="16"
      r="1"
      fill={props.color ? props.color : "#ECA61B"}
    />
  </Svg>
);
export default SvgComponent;
