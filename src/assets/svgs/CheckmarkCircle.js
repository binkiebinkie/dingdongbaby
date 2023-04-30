import Svg, { Path, Circle } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx="5" cy="5" r="5" fill={props.fill} />
    <Path
      d="M3 5.5L4.5 7L7 3.5"
      stroke={props.stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgComponent;
