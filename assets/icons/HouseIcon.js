import React from 'react';
import { createIcon } from 'native-base';
import { Path } from 'react-native-svg';

const HouseIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 33 33',
    path: [
      <Path
        d="M16.7512 0L0 12.3363L0.0750883 33L2.92974 32.9897H33V12.3479L16.7512 0ZM30.1104 30.1125H2.95434L2.89478 13.7839L16.724 3.59906L30.1104 13.7711V30.1112V30.1125Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />
    ]
  });
  return <Icon size={size} />;
};

export default HouseIcon;
