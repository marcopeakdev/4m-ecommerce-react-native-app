import React from 'react';
import { createIcon } from 'native-base';
import { Circle, Path } from 'react-native-svg';

const MinusIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 29 29',
    path: [
      <Circle
        cx="14.5"
        cy="14.5"
        r="13"
        fill="none"
        stroke={color ? color : 'brand.dark'}
        strokeWidth={2}
      />,

      <Path
        d="M7 15.001H22"
        fill="transparent"
        stroke={color ? color : 'brand.dark'}
        strokeWidth={2}
      />
    ]
  });
  return <Icon size={size} />;
};

export default MinusIcon;
