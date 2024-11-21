import React from 'react';
import { createIcon } from 'native-base';
import { Path } from 'react-native-svg';

const FoodIcon = props => {
  const { size, color, vertAdj } = props;

  const Icon = createIcon({
    viewBox: `0 ${vertAdj ? vertAdj : 0} 41 40`,
    path: [
      <Path
        d="M36.7033 28.4938C36.3712 21.2402 31.4261 15.1973 24.8052 13.3641C25.177 12.6591 25.3887 11.8546 25.3887 11.0002C25.3887 8.24253 23.1934 6 20.4939 6C17.7944 6 15.5991 8.24253 15.5991 11.0002C15.5991 11.8732 15.82 12.6934 16.2054 13.4092C9.66379 15.2954 4.79641 21.2993 4.46734 28.4954H1V32H40V28.4954H36.7033V28.4938ZM20.4939 9.50308C21.3013 9.50308 21.9579 10.1738 21.9579 10.9986C21.9579 11.8234 21.3013 12.4942 20.4939 12.4942C19.6865 12.4942 19.0299 11.8234 19.0299 10.9986C19.0299 10.1738 19.6865 9.50308 20.4939 9.50308ZM20.5853 16.2945C27.3341 16.2945 32.8718 21.6993 33.2679 28.4938H7.9027C8.29879 21.6993 13.835 16.2945 20.5853 16.2945Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={1}
      />,
      <Path
        d="M34 35H7V38H34V35Z"
        fill={color ? color : 'brand.dark'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />
    ]
  });
  return <Icon size={size} />;
};

export default FoodIcon;
