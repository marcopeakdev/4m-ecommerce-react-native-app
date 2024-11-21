import React from 'react';
import { createIcon } from 'native-base';
import { Path } from 'react-native-svg';

const DrinksIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 38 38',
    path: [
      <Path
        d="M25.3948 4.25125L31.8489 2.81734L31.224 0L23.051 1.81687L21.2979 8.49953H6.1499L9.48232 38.0015H27.9895L31.3219 8.49953H24.2801L25.3933 4.25273L25.3948 4.25125ZM20.5394 11.3837L18.5786 18.859H10.2245L9.3799 11.3837H20.5394ZM12.0607 35.1129L10.5511 21.7461H17.8215L16.3238 27.4535L19.1159 28.1853L20.8051 21.7446H26.9208L25.4112 35.1114H12.0622L12.0607 35.1129ZM28.0934 11.3852L27.2488 18.8605H21.5637L23.5245 11.3852H28.0934Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />
    ]
  });
  return <Icon size={size} />;
};

export default DrinksIcon;
