import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={9}
    height={16}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.166.5c.342 0 .683.147.943.44.521.586.521 1.534 0 2.12L3.702 8.02l4.24 4.94c.511.596.496 1.546-.033 2.12-.53.575-1.375.559-1.885-.035l-5.15-6C.37 8.453.377 7.518.892 6.94l5.333-6c.26-.293.601-.44.942-.44Z"
      fill="#202020"
    />
  </Svg>
);

export default SvgComponent;
