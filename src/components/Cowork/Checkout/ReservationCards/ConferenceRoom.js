import React from 'react';

import { Box } from 'native-base';

import Typography from 'src/components/Typography';

import KeyValueRow from './utils/KeyValueRow';
import Address from './utils/Address';
import ViewReservation from './utils/ViewReservation';

const data = [
  { label: 'Date', value: 'Feb 23, 2022' },
  { label: 'Reservation', value: '1:30pm-3:00pm' },
  { label: 'Paid', value: '$33.00' },
  { label: 'Add ons', value: '1' },
  { label: 'Guests', value: '1' }
];

const ConferenceRoom = () => {
  return (
    <Box
      rounded="15px"
      bgColor="#FFFFFF"
      shadow={2}
      p="28px"
    >
      <Typography
        type="bold_22_20_uppercase"
        letterSpacing="0.05em"
        textAlign="center"
        mb="23px"
      >
        Conference Room 10
      </Typography>
      {data?.map((keyValue, index) => (
        <KeyValueRow {...keyValue} key={index} />
      ))}
      <Address />
      <ViewReservation />
    </Box>
  );
};

export default ConferenceRoom;
