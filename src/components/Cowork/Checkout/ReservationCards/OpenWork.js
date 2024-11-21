import React from 'react';

import { Box, View, Image } from 'native-base';

import Typography from 'src/components/Typography';

import KeyValueRow from './utils/KeyValueRow';
import Address from './utils/Address';
import ViewReservation from './utils/ViewReservation';

import VerifiedBadge from '../../../../../assets/icons/VerifiedBadge2';
import Avatar from '../../../../../assets/images/avatar.png';

const data = [
  { label: 'Date', value: 'Feb 23, 2022' },
  { label: 'Pass Expires', value: '1:30pm-3:00pm' },
  { label: 'Paid', value: '$33.00' }
];

const OpenWork = () => {
  return (
    <Box
      rounded="15px"
      bgColor="#FFFFFF"
      shadow={2}
      p="28px"
    >
      <View w="89px" h="89px" m="auto">
        <Image source={Avatar} w="100%" h="100%" />
        <View position="absolute" bottom="0">
          <VerifiedBadge width="32px" height="32px" />
        </View>
      </View>

      <Typography
        type="bold_22_20_uppercase"
        letterSpacing="0.05em"
        textAlign="center"
        mt="8px"
      >
        Open Work
      </Typography>
      <Typography
        color="#595959"
        mt="2px"
        type="semi_bold_16_14_uppercase"
        mb="18px"
        textAlign="center"
      >
        Day pass
      </Typography>
      {data?.map((keyValue, index) => (
        <KeyValueRow {...keyValue} key={index} />
      ))}
      <Address />
      <ViewReservation />
    </Box>
  );
};

export default OpenWork;
