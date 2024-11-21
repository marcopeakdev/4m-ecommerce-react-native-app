import React from 'react';
import { Image, VStack } from 'native-base';
import AuthHeading from './AuthHeading';
import logo from '../../../assets/4M_ICON-white.png';

const BrandLogo = props => {
  return (
    <VStack space={0} width="100%">
      <Image
        source={logo}
        alt="4m"
        height={200}
        resizeMode="contain"
        {...props}
      />
    </VStack>
  );
};

export default BrandLogo;
