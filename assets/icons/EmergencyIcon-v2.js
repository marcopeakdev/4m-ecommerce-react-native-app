import React from 'react';
import { createIcon } from 'native-base';
import { Path } from 'react-native-svg';

const EmergencyIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 14 16',
    path: [
      <Path
        d="M14 14.4951H0L7 1.50488L14 14.4951ZM1.74125 13.4182H12.2587L7 3.65937L1.74125 13.4182Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M7.50271 7.05176H6.49756V10.3541H7.50271V7.05176Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M6.99979 12.3824C7.33595 12.3824 7.60846 12.0904 7.60846 11.7303C7.60846 11.3701 7.33595 11.0781 6.99979 11.0781C6.66363 11.0781 6.39111 11.3701 6.39111 11.7303C6.39111 12.0904 6.66363 12.3824 6.99979 12.3824Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />
    ]
  });
  return <Icon size={size} />;
};

export default EmergencyIcon;
