import React from 'react';
import { createIcon } from 'native-base';
import { Circle, Path } from 'react-native-svg';

const PlusIcon = props => {
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
        d="M21.8412 14.6147L15.1148 14.6147H14.6148V15.1147L14.6148 21.8411H14.3559L14.3559 15.1147V14.6147H13.8559L7.12951 14.6147L7.12951 14.3558L13.8559 14.3558H14.3559V13.8558L14.3559 7.12944H14.6148L14.6148 13.8558V14.3558H15.1148L21.8412 14.3558L21.8412 14.6147Z"
        fill="transparent"
        stroke={color ? color : 'brand.dark'}
        strokeWidth={2}
      />
    ]
  });
  return <Icon size={size} />;
};

export default PlusIcon;
