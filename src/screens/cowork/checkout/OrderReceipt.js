import React from 'react';
import PropTypes from 'prop-types';

import { View, ScrollView } from 'native-base';

import CheckMarkIcon from '../../../../assets/icons/CheckMark';

import Typography from 'src/components/Typography';
import ConferenceRoom from 'src/components/Cowork/Checkout/ReservationCards/ConferenceRoom';
import DedicatedDeskCard from 'src/components/Cowork/Checkout/ReservationCards/DedicatedDeskCard';
import OpenWork from 'src/components/Cowork/Checkout/ReservationCards/OpenWork';

import BannerPart from 'src/components/Cowork/Checkout/Reservation/BannerPart';
import CheckInBanner from 'src/components/Cowork/Checkout/Reservation/CheckInBanner';

const ORDER_TYPES = {
  BOOK_MEMBERSHIP: 'BOOK_MEMBERSHIP',
  RESERVE_CONFERENCE_ROOM: 'RESERVE_CONFERENCE_ROOM',
  OPEN_WORK: 'OPEN_WORK'
};

const containerStyles = {
  BOOK_MEMBERSHIP: { pt: '12px' },
  RESERVE_CONFERENCE_ROOM: { pt: '31px' },
  OPEN_WORK: { pt: '31px' }
};

const OrderReceipt = ({ route }) => {
  const orderType = route.params?.orderType

  return (
    <ScrollView h="100%" bgColor="#FFFFFF">
      {orderType === ORDER_TYPES.BOOK_MEMBERSHIP && (
        <CheckInBanner />
      )}
      <View {...containerStyles?.[orderType]}>
        <View
          mt="24px"
          mb="18px"
          flexDir="row"
          justifyContent="center"
        >
          <CheckMarkIcon />
        </View>
        <View pl="5.5%" pr="5%">
          <Typography
            type="semi_bold_14_uppercase"
            letterSpacing="0.84em"
            textAlign="center"
            mb="18px"
            lineHeight="21px"
          >
            Reservation Confirmed
          </Typography>
          {orderType === ORDER_TYPES.BOOK_MEMBERSHIP && (
            <DedicatedDeskCard />
          )}
          {orderType ===
            ORDER_TYPES.RESERVE_CONFERENCE_ROOM && (
              <ConferenceRoom />
            )}
          {orderType === ORDER_TYPES.OPEN_WORK && (
            <OpenWork />
          )}
        </View>
        <BannerPart />
      </View>
    </ScrollView>
  );
};

OrderReceipt.propTypes = {
  route: PropTypes.any
};

export default OrderReceipt;
