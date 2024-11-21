import * as React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  ClipPath
} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={23}
    height={23}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)" fill="#fff">
      <Path d="m17.281 7.364-1.491-1.49-4.277 4.276-4.276-4.277-1.492 1.49 4.278 4.278-4.278 4.277 1.492 1.491 4.276-4.277 4.277 4.277 1.491-1.491-4.277-4.277 4.277-4.277Z" />
      <Path d="M11.5 2.109a9.391 9.391 0 1 1-6.64 2.75 9.33 9.33 0 0 1 6.64-2.75ZM11.5 0a11.5 11.5 0 1 0 0 23 11.5 11.5 0 0 0 0-23Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h23v23H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;
