import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={11}
    height={19}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.735 19c-.444 0-.888-.186-1.226-.557-.679-.743-.679-1.944 0-2.687l5.734-6.28L.726 3.22C.06 2.463.08 1.26.769.533c.69-.728 1.789-.707 2.453.045l6.7 7.6c.658.747.65 1.931-.02 2.665l-6.94 7.6c-.338.37-.783.557-1.227.557Z"
      fill="#202020"
    />
  </Svg>
);

export default SvgComponent;
