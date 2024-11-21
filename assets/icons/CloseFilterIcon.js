import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={17}
    height={16}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m12.522 5.123-1.037-1.037L8.51 7.06 5.535 4.086 4.497 5.123l2.976 2.975-2.976 2.975 1.038 1.038L8.51 9.135l2.975 2.976 1.037-1.038-2.976-2.975 2.976-2.975Z"
      fill="#202020"
    />
    <Path
      d="M8.5 1.467A6.533 6.533 0 1 1 3.88 3.38 6.49 6.49 0 0 1 8.5 1.467ZM8.5 0a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"
      fill="#202020"
    />
  </Svg>
);

export default SvgComponent;
