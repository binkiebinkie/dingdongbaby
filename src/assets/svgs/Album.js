import Svg, { Path, Rect } from "react-native-svg";

const SvgComponent = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Rect x="17" y="6" width="2" height="3" rx="1" fill="#847F73" />
    <Rect x="11" y="6" width="2" height="3" rx="1" fill="#847F73" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 11C13.5523 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13C15.5523 13 16 12.5523 16 12C16 11.4477 16.4477 11 17 11C17.5523 11 18 11.4477 18 12C18 13.6569 16.6569 15 15 15C13.3431 15 12 13.6569 12 12C12 11.4477 12.4477 11 13 11Z"
      fill="#847F73"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.0568 3H19.0568C20.1613 3 21.0568 3.89543 21.0568 5V15C21.0568 16.1046 20.1613 17 19.0568 17H11.0568C9.95219 17 9.05676 16.1046 9.05676 15V5C9.05676 3.89543 9.95219 3 11.0568 3ZM7.07351 4.63148C7.25953 2.59508 8.97187 1 11.0568 1H19.0568C21.2659 1 23.0568 2.79086 23.0568 5V15C23.0568 17.2091 21.2659 19 19.0568 19H11.0568C8.84762 19 7.05676 17.2091 7.05676 15V6.70652L4.48134 7.3966C3.41441 7.68248 2.78124 8.77916 3.06713 9.84609L5.65532 19.5053C5.9412 20.5723 7.03788 21.2054 8.10481 20.9196L15.2686 19H18.7295C18.2133 19.8467 17.3833 20.5039 16.3499 20.7809L8.62245 22.8514C6.48858 23.4232 4.29523 22.1569 3.72347 20.023L1.13528 10.3637C0.563508 8.22986 1.82984 6.03652 3.9637 5.46475L7.07351 4.63148Z"
      fill="#847F73"
    />
  </Svg>
);

export default SvgComponent;