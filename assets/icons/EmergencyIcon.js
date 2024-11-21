import React from 'react';
import { Icon } from 'native-base';
import { Path, G, Rect, Circle } from 'react-native-svg';

const EmergencyIcon = () => {
  return (
    <Icon viewBox="0 0 256 256">
      <G
        fillRule="nonezero"
        fill="none"
        scale={1}
        origin="50,50"
      >
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="#ffffff"
          d="M256,238.85H0L128,17.15ZM31.84,220.47H224.16L128,53.92Z"
        />
        <Rect
          fill="#ffffff"
          x="118.81"
          y="111.82"
          width="18.38"
          height="56.36"
        />
        <Circle
          fill="#ffffff"
          cx="128"
          cy="191.66"
          r="11.13"
        />
      </G>
    </Icon>
  );
};

export default EmergencyIcon;
