import Svg, { Path, Rect } from "react-native-svg";
import PropTypes from "prop-types";

const SvgComponent = (props) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M2 11C2 10.4696 2.23413 9.96086 2.65087 9.58579C3.06762 9.21071 3.63285 9 4.22222 9H5.25556C5.62132 9.00005 5.98144 8.91884 6.30396 8.76359C6.62649 8.60834 6.90145 8.38383 7.10444 8.11L8.00667 6.89C8.20966 6.61617 8.48462 6.39166 8.80715 6.23641C9.12968 6.08116 9.48979 5.99995 9.85556 6H14.1444C14.5102 5.99995 14.8703 6.08116 15.1929 6.23641C15.5154 6.39166 15.7903 6.61617 15.9933 6.89L16.8956 8.11C17.0986 8.38383 17.3735 8.60834 17.696 8.76359C18.0186 8.91884 18.3787 9.00005 18.7444 9H19.7778C20.3671 9 20.9324 9.21071 21.3491 9.58579C21.7659 9.96086 22 10.4696 22 11V20C22 20.5304 21.7659 21.0391 21.3491 21.4142C20.9324 21.7893 20.3671 22 19.7778 22H4.22222C3.63285 22 3.06762 21.7893 2.65087 21.4142C2.23413 21.0391 2 20.5304 2 20V11Z"
      stroke={props.stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 15C15 15.7956 14.6839 16.5587 14.1213 17.1213C13.5587 17.6839 12.7956 18 12 18C11.2044 18 10.4413 17.6839 9.87868 17.1213C9.31607 16.5587 9 15.7956 9 15C9 14.2044 9.31607 13.4413 9.87868 12.8787C10.4413 12.3161 11.2044 12 12 12C12.7956 12 13.5587 12.3161 14.1213 12.8787C14.6839 13.4413 15 14.2044 15 15V15Z"
      stroke={props.stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect x="17" y="12" width="2" height="3" rx="1" fill={props.fill} />
    <Rect x="5" y="12" width="2" height="3" rx="1" fill={props.fill} />
    <Path
      d="M12 1.5V2.72222M19.8641 4.13594L19 5.00005M5.00001 5.00005L4.13589 4.13594"
      stroke={props.stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

SvgComponent.defaultProps = {
  stroke: "#847F73",
  fill: "#847F73",
};

SvgComponent.propTypes = {
  stroke: PropTypes.string,
  fill: PropTypes.string,
};

export default SvgComponent;
