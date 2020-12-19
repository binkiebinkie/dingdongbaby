import * as React from "react";
import Svg, { Path, Rect, Mask } from "react-native-svg";

export default SvgComponent = props => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Mask id="path-1-inside-1" fill="white">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.07351 4.63148C7.25953 2.59508 8.97187 1 11.0568 1H19.0568C21.2659 1 23.0568 2.79086 23.0568 5V15C23.0568 17.2091 21.2659 19 19.0568 19H11.0568C8.84762 19 7.05676 17.2091 7.05676 15V6.70652L4.48134 7.3966C3.41441 7.68248 2.78124 8.77916 3.06713 9.84609L5.65532 19.5053C5.9412 20.5723 7.03788 21.2054 8.10481 20.9196L15.2686 19H18.7295C18.2133 19.8467 17.3833 20.5039 16.3499 20.7809L8.62245 22.8514C6.48858 23.4232 4.29523 22.1569 3.72347 20.023L1.13528 10.3637C0.563508 8.22986 1.82984 6.03652 3.9637 5.46475L7.07351 4.63148ZM17 7C17 6.44772 17.4477 6 18 6C18.5523 6 19 6.44772 19 7V8C19 8.55228 18.5523 9 18 9C17.4477 9 17 8.55228 17 8V7ZM12 6C11.4477 6 11 6.44772 11 7V8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8V7C13 6.44772 12.5523 6 12 6ZM13 11C13.5523 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13C15.5523 13 16 12.5523 16 12C16 11.4477 16.4477 11 17 11C17.5523 11 18 11.4477 18 12C18 13.6569 16.6569 15 15 15C13.3431 15 12 13.6569 12 12C12 11.4477 12.4477 11 13 11Z"
      />
    </Mask>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.07351 4.63148C7.25953 2.59508 8.97187 1 11.0568 1H19.0568C21.2659 1 23.0568 2.79086 23.0568 5V15C23.0568 17.2091 21.2659 19 19.0568 19H11.0568C8.84762 19 7.05676 17.2091 7.05676 15V6.70652L4.48134 7.3966C3.41441 7.68248 2.78124 8.77916 3.06713 9.84609L5.65532 19.5053C5.9412 20.5723 7.03788 21.2054 8.10481 20.9196L15.2686 19H18.7295C18.2133 19.8467 17.3833 20.5039 16.3499 20.7809L8.62245 22.8514C6.48858 23.4232 4.29523 22.1569 3.72347 20.023L1.13528 10.3637C0.563508 8.22986 1.82984 6.03652 3.9637 5.46475L7.07351 4.63148ZM17 7C17 6.44772 17.4477 6 18 6C18.5523 6 19 6.44772 19 7V8C19 8.55228 18.5523 9 18 9C17.4477 9 17 8.55228 17 8V7ZM12 6C11.4477 6 11 6.44772 11 7V8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8V7C13 6.44772 12.5523 6 12 6ZM13 11C13.5523 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13C15.5523 13 16 12.5523 16 12C16 11.4477 16.4477 11 17 11C17.5523 11 18 11.4477 18 12C18 13.6569 16.6569 15 15 15C13.3431 15 12 13.6569 12 12C12 11.4477 12.4477 11 13 11Z"
      fill="#615D53"
    />
    <Path
      d="M7.07351 4.63148L7.59115 6.56333L8.93835 6.20235L9.06522 4.81341L7.07351 4.63148ZM7.05676 6.70652H9.05676V4.10007L6.53912 4.77467L7.05676 6.70652ZM4.48134 7.3966L4.99898 9.32845H4.99898L4.48134 7.3966ZM3.06713 9.84609L1.13528 10.3637H1.13528L3.06713 9.84609ZM5.65532 19.5053L3.72347 20.023V20.023L5.65532 19.5053ZM8.10481 20.9196L8.62244 22.8514H8.62245L8.10481 20.9196ZM15.2686 19V17H15.0053L14.751 17.0682L15.2686 19ZM18.7295 19L20.4371 20.0412L22.2914 17H18.7295V19ZM16.3499 20.7809L16.8675 22.7127L16.8675 22.7127L16.3499 20.7809ZM8.62245 22.8514L9.14008 24.7833H9.14008L8.62245 22.8514ZM3.72347 20.023L5.65532 19.5053L3.72347 20.023ZM1.13528 10.3637L-0.796576 10.8814L1.13528 10.3637ZM3.9637 5.46475L3.44606 3.5329H3.44606L3.9637 5.46475ZM11.0568 -1C7.92831 -1 5.36102 1.39283 5.0818 4.44954L9.06522 4.81341C9.15803 3.79734 10.0154 3 11.0568 3V-1ZM19.0568 -1H11.0568V3H19.0568V-1ZM25.0568 5C25.0568 1.68629 22.3705 -1 19.0568 -1V3C20.1613 3 21.0568 3.89543 21.0568 5H25.0568ZM25.0568 15V5H21.0568V15H25.0568ZM19.0568 21C22.3705 21 25.0568 18.3137 25.0568 15H21.0568C21.0568 16.1046 20.1613 17 19.0568 17V21ZM11.0568 21H19.0568V17H11.0568V21ZM5.05676 15C5.05676 18.3137 7.74305 21 11.0568 21V17C9.95219 17 9.05676 16.1046 9.05676 15H5.05676ZM5.05676 6.70652V15H9.05676V6.70652H5.05676ZM6.53912 4.77467L3.9637 5.46475L4.99898 9.32845L7.5744 8.63837L6.53912 4.77467ZM3.9637 5.46475C1.82984 6.03652 0.563508 8.22986 1.13528 10.3637L4.99898 9.32845H4.99898L3.9637 5.46475ZM1.13528 10.3637L3.72347 20.023L7.58717 18.9877L4.99898 9.32845L1.13528 10.3637ZM3.72347 20.023C4.29523 22.1568 6.48858 23.4232 8.62244 22.8514L7.58717 18.9877L7.58717 18.9877L3.72347 20.023ZM8.62245 22.8514L15.7863 20.9319L14.751 17.0682L7.58717 18.9877L8.62245 22.8514ZM15.2686 21H18.7295V17H15.2686V21ZM17.0219 17.9588C16.7625 18.3843 16.3498 18.7103 15.8322 18.849L16.8675 22.7127C18.4168 22.2976 19.6641 21.309 20.4371 20.0412L17.0219 17.9588ZM15.8322 18.849L8.10481 20.9196L9.14008 24.7833L16.8675 22.7127L15.8322 18.849ZM8.10481 20.9196C7.03787 21.2054 5.9412 20.5723 5.65532 19.5053L1.79161 20.5406C2.64926 23.7414 5.93929 25.6409 9.14008 24.7833L8.10481 20.9196ZM5.65532 19.5053L3.06713 9.84609L-0.796576 10.8814L1.79161 20.5406L5.65532 19.5053ZM3.06713 9.84609C2.78124 8.77916 3.41441 7.68248 4.48134 7.3966L3.44606 3.5329C0.245268 4.39055 -1.65423 7.68057 -0.796576 10.8814L3.06713 9.84609ZM4.48134 7.3966L7.59115 6.56333L6.55587 2.69963L3.44606 3.5329L4.48134 7.3966ZM18 4C16.3431 4 15 5.34315 15 7H19C19 7.55229 18.5523 8 18 8V4ZM21 7C21 5.34315 19.6569 4 18 4V8C17.4477 8 17 7.55229 17 7H21ZM21 8V7H17V8H21ZM18 11C19.6569 11 21 9.65685 21 8H17C17 7.44771 17.4477 7 18 7V11ZM15 8C15 9.65685 16.3431 11 18 11V7C18.5523 7 19 7.44771 19 8H15ZM15 7V8H19V7H15ZM13 7C13 7.55229 12.5523 8 12 8V4C10.3431 4 9 5.34315 9 7H13ZM13 8V7H9V8H13ZM12 7C12.5523 7 13 7.44771 13 8H9C9 9.65685 10.3431 11 12 11V7ZM11 8C11 7.44771 11.4477 7 12 7V11C13.6569 11 15 9.65685 15 8H11ZM11 7V8H15V7H11ZM12 8C11.4477 8 11 7.55229 11 7H15C15 5.34315 13.6569 4 12 4V8ZM16 12C16 10.3431 14.6569 9 13 9V13C12.4477 13 12 12.5523 12 12H16ZM15 11C15.5523 11 16 11.4477 16 12H12C12 13.6569 13.3431 15 15 15V11ZM14 12C14 11.4477 14.4477 11 15 11V15C16.6569 15 18 13.6569 18 12H14ZM17 9C15.3431 9 14 10.3431 14 12H18C18 12.5523 17.5523 13 17 13V9ZM20 12C20 10.3431 18.6569 9 17 9V13C16.4477 13 16 12.5523 16 12H20ZM15 17C17.7614 17 20 14.7614 20 12H16C16 12.5523 15.5523 13 15 13V17ZM10 12C10 14.7614 12.2386 17 15 17V13C14.4477 13 14 12.5523 14 12H10ZM13 9C11.3431 9 10 10.3431 10 12H14C14 12.5523 13.5523 13 13 13V9Z"
      fill="#615D53"
      mask="url(#path-1-inside-1)"
    />
  </Svg>
);
