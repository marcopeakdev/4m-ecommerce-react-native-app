import React from 'react';

import { View, Image } from 'native-base';

import Typography from 'src/components/Typography';

import DestinationLocation from '../../../../../../assets/images/4M_DestinationLocation.png';

const Address = () => {
  return (
    <View flexDir="row" justifyContent="center">
      <Image source={DestinationLocation} alt="Pin Image" />
      <Typography
        ml="6px"
        color="#595959"
        type="light_14_21"
      >
        1919 S Industrial Hwy,
        {'\n'}
        Ann Arbor, MI 48104
      </Typography>
    </View>
  );
};

export default Address;
