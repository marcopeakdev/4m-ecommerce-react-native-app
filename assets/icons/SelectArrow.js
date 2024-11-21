import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={9}
    height={4}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 .5C0 .32.086.142.256.005c.8-.003 3.242.002 4.131-.003.89-.006 3.484.003 4.12.003a.714.714 0 0 1-.02 1.095L4.985 3.803c-.344.266-.89.262-1.227-.008L.256.995A.635.635 0 0 1 0 .5Z"
      fill="#202020"
    />
  </Svg>
);

export default SvgComponent;
