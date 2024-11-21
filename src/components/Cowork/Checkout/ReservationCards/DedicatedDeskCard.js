import React from 'react';

import { Box, View, Image } from 'native-base';

import Typography from 'src/components/Typography';

import KeyValueRow from './utils/KeyValueRow';
import Address from './utils/Address';
import ViewReservation from './utils/ViewReservation';

import VerifiedBadge from '../../../../../assets/icons/VerifiedBadge';
import Avatar from '../../../../../assets/images/avatar.png';

const data = [
  { label: 'Start Date', value: 'Feb 23, 2022' },
  { label: 'Renwal', value: '1:30pm-3:00pm' },
  { label: 'Paid', value: '$33.00' }
];

const DedicatedDeskCard = () => {
  return (
    <Box
      rounded="15px"
      bgColor="#FFFFFF"
      shadow={2}
      p="28px"
      w="100%"
    >
      <View flexDir="row" alignItems="center" mb="24px">
        <View flexDir="row" w="46px" h="46px">
          <Image source={Avatar} alt="avatar" />
          <View position="absolute" bottom="0" left="0">
            <VerifiedBadge />
          </View>
        </View>
        <View ml="19px">
          <Typography
            type="bold_22_20_uppercase"
            letterSpacing="0.05em"
            textAlign="center"
          >
            Dedicated Desk 2
          </Typography>
          <Typography
            color="#595959"
            mt="2px"
            type="semi_bold_16_14_uppercase"
          >
            Dedicated Desk
          </Typography>
        </View>
      </View>
      {data?.map((keyValue, index) => (
        <KeyValueRow {...keyValue} key={index} />
      ))}
      <Address />
      <ViewReservation />
    </Box>
  );
};

export default DedicatedDeskCard;
