import React from 'react';
import { createIcon } from 'native-base';
import { Path } from 'react-native-svg';

const MoreIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 40 40',
    path: [
      <Path
        d="M6.66667 21.6667C7.58714 21.6667 8.33333 20.9205 8.33333 20C8.33333 19.0796 7.58714 18.3334 6.66667 18.3334C5.74619 18.3334 5 19.0796 5 20C5 20.9205 5.74619 21.6667 6.66667 21.6667Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={3}
      />,
      <Path
        d="M20.0002 21.6667C20.9206 21.6667 21.6668 20.9205 21.6668 20C21.6668 19.0796 20.9206 18.3334 20.0002 18.3334C19.0797 18.3334 18.3335 19.0796 18.3335 20C18.3335 20.9205 19.0797 21.6667 20.0002 21.6667Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={3}
      />,
      <Path
        d="M33.3332 21.6667C34.2536 21.6667 34.9998 20.9205 34.9998 20C34.9998 19.0796 34.2536 18.3334 33.3332 18.3334C32.4127 18.3334 31.6665 19.0796 31.6665 20C31.6665 20.9205 32.4127 21.6667 33.3332 21.6667Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={3}
      />
    ]
  });
  return <Icon size={size} />;
};

export default MoreIcon;
