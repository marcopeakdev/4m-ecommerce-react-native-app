import * as React from 'react';
import Svg, {
  Path,
  Defs,
  Circle,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const SvgComponent = props => (
  <Svg
    width={29}
    height={29}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <Circle xmlns="http://www.w3.org/2000/svg" cx="14.5" cy="14.5" r="13.5" fill="#404040" stroke="url(#paint0_linear_3489_55477)" strokeWidth="2" />
    <Path xmlns="http://www.w3.org/2000/svg" d="M8.70711 14.7929C8.31658 14.4024 7.68342 14.4024 7.29289 14.7929C6.90237 15.1834 6.90237 15.8166 7.29289 16.2071L8.70711 14.7929ZM13.5 21L12.7929 21.7071L13.807 22.7212L14.408 21.4191L13.5 21ZM20.408 8.41906C20.6394 7.91761 20.4205 7.32348 19.9191 7.09204C19.4176 6.8606 18.8235 7.07949 18.592 7.58094L20.408 8.41906ZM7.29289 16.2071L12.7929 21.7071L14.2071 20.2929L8.70711 14.7929L7.29289 16.2071ZM14.408 21.4191L20.408 8.41906L18.592 7.58094L12.592 20.5809L14.408 21.4191Z" fill="white" />
    <Defs>
      <LinearGradient xmlns="http://www.w3.org/2000/svg" id="paint0_linear_3489_55477" x1="23.4231" y1="7.80769" x2="-1.04326e-06" y2="25.6538" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#9E81D2" />
        <Stop offset="1" stopColor="#4D8FFB" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgComponent;
