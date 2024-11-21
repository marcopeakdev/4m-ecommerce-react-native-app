import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DropdownIcon = props => (
  <Svg
    width={10}
    height={4}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.508.5c0-.18.086-.358.256-.495.8-.003 3.241.002 4.131-.003.89-.006 3.483.003 4.12.003a.714.714 0 0 1-.02 1.095L5.492 3.803c-.344.266-.89.262-1.227-.008L.764.995A.635.635 0 0 1 .508.5Z"
      fill="#202020"
    />
  </Svg>
);

export default DropdownIcon;
