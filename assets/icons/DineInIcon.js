import React from 'react';
import { createIcon } from 'native-base';
import { Path } from 'react-native-svg';

const DineInIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 45 32',
    path: [
      <Path
        d="M3.93926 13.3734V0H0V31.7022H3.93926V23.9678H12.3381V31.8305H16.2773V13.3734H3.93926ZM12.3381 20.0285H3.93926V17.3127H12.3381V20.0285Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M41.0607 0V13.3734H28.7227V31.8287H32.6619V23.966H41.0607V31.7004H45V0H41.0607ZM32.6619 20.0285V17.3127H41.0607V20.0285H32.6619Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M12.9727 6.30347V10.2427H20.4996V31.841H24.4389V10.2427H31.9658V6.30347H12.9727Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />
    ]
  });
  return <Icon size={size} />;
};

export default DineInIcon;
