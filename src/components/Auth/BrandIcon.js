import React from 'react';
import { Image } from 'native-base';
import icon from '../../../assets/4M_ICON-gradient.png';

const BrandIcon = props => {
  return (
    <Image
      source={icon}
      size="lg"
      alt="4m"
      style={{
        width: props.size ? props.size : 200,
        height: props.size ? props.size : 200
      }}
      {...props}
    />
  );
};

export default BrandIcon;
