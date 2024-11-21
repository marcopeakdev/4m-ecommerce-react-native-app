import React from 'react';
import { createIcon } from 'native-base';
import { Circle, Path } from 'react-native-svg';

const DropdownIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 14 7',
    path: [
      <Path
        d="M1.04357e-08 0.875119C6.69606e-09 0.56152 0.137211 0.24792 0.410229 0.00904577C1.69027 0.00302412 5.59415 0.0122764 7.01727 0.00300243C8.44039 -0.0062715 12.5886 0.00888472 13.6077 0.00904577C14.1439 0.496595 14.1283 1.45577 13.5739 1.92494L7.97354 6.65588C7.4233 7.12016 6.55104 7.11403 6.0106 6.64119L0.410229 1.74119C0.137211 1.50232 1.41753e-08 1.18872 1.04357e-08 0.875119Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />
    ]
  });
  return <Icon size={size} />;
};

export default DropdownIcon;
