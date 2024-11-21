import * as React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  ClipPath
} from 'react-native-svg';

const TimeoutIcon = () => (
  <Svg
    width={12}
    height={13}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <G clipPath="url(#a)" fill="#241F20">
      <Path d="M6 12.5a6 6 0 1 1 6-6 6.006 6.006 0 0 1-6 6ZM6 1.406a5.094 5.094 0 1 0 0 10.188A5.094 5.094 0 0 0 6 1.406Z" />
      <Path d="M6.45 5.97h-.895v2.743h.895V5.97ZM6.002 5.37a.541.541 0 1 0 0-1.083.541.541 0 0 0 0 1.083Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          transform="translate(0 .5)"
          d="M0 0h12v12H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default TimeoutIcon;
