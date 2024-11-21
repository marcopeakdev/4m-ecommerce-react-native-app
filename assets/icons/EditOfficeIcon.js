import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={27}
    height={28}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={13.5} cy={14} r={13.5} fill="#9E81D2" />
    <Path
      d="m17.273 8.483 1.744 1.743-1.744-1.743Zm1.121-1.536-4.716 4.717c-.244.243-.41.553-.478.89l-.435 2.181 2.18-.436c.338-.068.648-.233.891-.477l4.717-4.716a1.525 1.525 0 1 0-2.159-2.159v0Z"
      stroke="#202020"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.353 16.382v2.47a1.647 1.647 0 0 1-1.647 1.648H8.647A1.647 1.647 0 0 1 7 18.853v-9.06a1.647 1.647 0 0 1 1.647-1.647h2.47"
      stroke="#202020"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
