import React from 'react';

import { View } from 'native-base';

import Typography from 'src/components/Typography';

import ArrowRight from '../../../../../../assets/icons/ArrowRight';

const ViewReservation = () => {
  return (
    <View
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderColor="#E6E6E6"
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      h="43px"
      mt="12px"
    >
      <Typography type="semi_bold_16_14_uppercase">
        View Reservation
      </Typography>
      <ArrowRight />
    </View>
  );
};

export default ViewReservation;
