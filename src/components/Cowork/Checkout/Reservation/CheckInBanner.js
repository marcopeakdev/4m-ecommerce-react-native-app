import React from 'react';

import { View } from 'native-base';

import Typography from 'src/components/Typography';

import InfoIcon from '../../../../../assets/icons/InfoIcon';

const CheckInBanner = () => {
  return (
    <View
      bgColor="#ABABAB"
      pt="45px"
      px="30.5px"
      pb="8px"
      flexDir="row"
    >
      <InfoIcon />
      <View ml="8px" mt="2px">
        <Typography
          mb="4px"
          type="semi_bold_14_12_uppercase"
          letterSpacing="0.07em"
        >
          Check-in
        </Typography>
        <Typography type="normal_14_uppercase">
          Please check-in with concierge to recieve your
          access keys and other important details
        </Typography>
      </View>
    </View>
  );
};

export default CheckInBanner;
