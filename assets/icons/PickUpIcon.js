import React from 'react';
import { createIcon } from 'native-base';
import { Path } from 'react-native-svg';

const PickUpIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 49 48',
    path: [
      <Path
        d="M27.1957 32.0005L21.5711 38H26.8754L32.5 32.0005V27.9995H24.9947C26.1748 26.3274 26.8754 24.2496 26.8754 22H23.1246C23.1246 25.3064 20.6033 27.9976 17.5035 27.9995H17.5V32.0005H27.1975H27.1957Z"
        fill={color ? color : 'brand.dark'}
      />,
      <Path
        d="M37.7001 11.5052V1H12.3973V11.5052H1.5V48H48.5V11.5052H37.7001ZM16.5174 5.11617H33.5819V11.4979H16.5174V5.11617ZM44.38 43.8838H5.62003V15.6214H44.38V43.8838Z"
        fill={color ? color : 'brand.dark'}
      />
    ]
  });
  return <Icon size={size} />;
};

export default PickUpIcon;
