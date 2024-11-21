import React from 'react';
import { createIcon } from 'native-base';
import { Circle, Path } from 'react-native-svg';

const CreditCardIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 27 28',
    path: [
      <Path
        d="M0 3.82812V24.1719H27V3.82812H0ZM24.8147 6.09438V8.51922H2.18531V6.09438H24.8147ZM2.18531 21.9056V11.6561H24.8147V21.9056H2.18531Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />
    ]
  });
  return <Icon size={size} />;
};

export default CreditCardIcon;
