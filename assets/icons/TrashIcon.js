import React from 'react';
import { createIcon } from 'native-base';
import { Circle, Path } from 'react-native-svg';

const TrashIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 14 12',
    path: [
      <Path
        d="M6.42523 5.22168H5.28418V9.63121H6.42523V5.22168Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M8.71625 5.22168H7.5752V9.63121H8.71625V5.22168Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M13.5 2.95312H0.5V4.00688H2.42969V11.7713H11.5993V4.00688H13.5V2.95312ZM10.4582 10.718H3.57176V4.13437H10.4582V10.718Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M4.82644 2.83523L4.01953 2.09039L6.03656 0.228516H7.99469L10.0112 2.09039L9.20429 2.83523L7.52191 1.2818H6.50883L4.82644 2.83523Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />
    ]
  });
  return <Icon size={size} />;
};

export default TrashIcon;
