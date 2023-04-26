import PropTypes from "prop-types";
import Svg, { Path, Rect } from "react-native-svg";
import theme from "../../theme";
const SvgComponent = ({ stroke }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M12 19V11M12 19L21 21L12 3L3 21L12 19Z"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
SvgComponent.propTypes = {
  stroke: PropTypes.string,
};
SvgComponent.defaultProps = {
  stroke: theme.colors.G6,
};
export default SvgComponent;
