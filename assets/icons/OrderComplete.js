import React from 'react';
import { createIcon } from 'native-base';
import { Circle, Path } from 'react-native-svg';
import BrandGradientIcon from '../../src/components/SplashGradientIcon';

const OrderCompleteIcon = props => {
  const { size, color } = props;

  const Icon = createIcon({
    viewBox: '0 0 167 167',
    path: [
      <Path
        d="M167 83.5C167 129.616 129.616 167 83.5 167C37.3842 167 0 129.616 0 83.5C0 37.3842 37.3842 0 83.5 0C129.616 0 167 37.3842 167 83.5ZM12.2779 83.5C12.2779 122.835 44.1651 154.722 83.5 154.722C122.835 154.722 154.722 122.835 154.722 83.5C154.722 44.1651 122.835 12.2779 83.5 12.2779C44.1651 12.2779 12.2779 44.1651 12.2779 83.5Z"
        fill={color ? color : 'brand.green'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />,
      <Path
        d="M54.4211 85.1934C52.0794 82.8487 48.2805 82.8463 45.9358 85.188C43.5912 87.5296 43.5888 91.3286 45.9305 93.6733L54.4211 85.1934ZM82.7683 122.067L78.523 126.307L84.6108 132.403L88.2173 124.579L82.7683 122.067ZM123.773 47.4443C125.16 44.435 123.845 40.8708 120.835 39.4836C117.826 38.0965 114.262 39.4115 112.875 42.4209L123.773 47.4443ZM45.9305 93.6733L78.523 126.307L87.0136 117.827L54.4211 85.1934L45.9305 93.6733ZM88.2173 124.579L123.773 47.4443L112.875 42.4209L77.3193 119.555L88.2173 124.579Z"
        fill={color ? color : 'brand.green'}
        stroke={color ? color : 'brand.dark'}
        strokeWidth={0}
      />
    ]
  });
  return <Icon size={size} />;
};

export default OrderCompleteIcon;
