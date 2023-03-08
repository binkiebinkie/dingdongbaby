import * as React from "react";
import Svg, { Path, Mask, Rect } from "react-native-svg";
const SvgComponent = (props, { stroke }) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask id="path-1-inside-1" fill="white">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.046 12.9654C16.2342 12.0513 17 10.6151 17 9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9C7 10.6151 7.76577 12.0513 8.95405 12.9654L7.70425 17.4647C7.35025 18.7391 8.30864 20 9.63128 20H14.3687C15.6914 20 16.6498 18.7391 16.2958 17.4647L15.046 12.9654Z"
      />
    </Mask>
    <Path
      d="M15.046 12.9654L13.8265 11.3802C13.1808 11.877 12.9009 12.7157 13.1189 13.5007L15.046 12.9654ZM8.95405 12.9654L10.8811 13.5007C11.0991 12.7157 10.8192 11.877 10.1735 11.3802L8.95405 12.9654ZM7.70425 17.4647L5.77721 16.9294H5.77721L7.70425 17.4647ZM16.2958 17.4647L18.2228 16.9294L18.2228 16.9294L16.2958 17.4647ZM15 9C15 9.9679 14.5438 10.8284 13.8265 11.3802L16.2654 14.5506C17.9246 13.2743 19 11.2623 19 9H15ZM12 6C13.6569 6 15 7.34315 15 9H19C19 5.13401 15.866 2 12 2V6ZM9 9C9 7.34315 10.3431 6 12 6V2C8.13401 2 5 5.13401 5 9H9ZM10.1735 11.3802C9.45618 10.8284 9 9.96791 9 9H5C5 11.2623 6.07536 13.2743 7.73458 14.5507L10.1735 11.3802ZM9.63128 18L10.8811 13.5007L7.02701 12.4301L5.77721 16.9294L9.63128 18ZM9.63128 18H9.63128L5.77721 16.9294C5.06922 19.4782 6.98599 22 9.63128 22V18ZM14.3687 18H9.63128V22H14.3687V18ZM14.3687 18L14.3687 18V22C17.014 22 18.9308 19.4782 18.2228 16.9294L14.3687 18ZM13.1189 13.5007L14.3687 18L18.2228 16.9294L16.973 12.4301L13.1189 13.5007Z"
      fill="#847F73"
      mask="url(#path-1-inside-1)"
    />
    <Rect
      x="1"
      y="1"
      width="22"
      height="22"
      rx="7"
      stroke="#847F73"
      strokeWidth="2"
    />
  </Svg>
);
export default SvgComponent;
