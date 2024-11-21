import * as React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  ClipPath
} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={13}
    height={12}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)" fill="#241F20">
      <Path d="M6.5 12a6 6 0 1 1 6-6 6.006 6.006 0 0 1-6 6ZM6.5.906a5.094 5.094 0 1 0 0 10.188A5.094 5.094 0 0 0 6.5.906Z" />
      <Path d="M6.95 5.47h-.895v2.743h.895V5.47ZM6.502 4.87a.541.541 0 1 0 0-1.083.541.541 0 0 0 0 1.083Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          transform="translate(.5)"
          d="M0 0h12v12H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
