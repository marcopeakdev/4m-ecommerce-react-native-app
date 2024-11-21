import React from 'react';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { View, Text, ScrollView } from 'native-base';

import Header from 'src/components/Cowork/Checkout/Header';
import MembershipBilling from 'src/components/Cowork/Checkout/MembershipBilling';
import SelectPaymentCard from 'src/components/Cowork/Checkout/SelectPaymentCard';
import BookMembershipButton from 'src/components/Cowork/Checkout/BookMembershipButton';
import BringingGuestCard from 'src/components/Cowork/Checkout/BringingGuestCard';
import Typography from 'src/components/Typography';

import CoworkIcon from '../../../../assets/icons/CoworkIcon';

import {
  CHECKOUT_TYPES,
  TITLE,
  SUB_TITLE
} from './constants';

const Checkout = ({ route }) => {
  const checkoutType = route.params?.checkoutType;
  const navigation = useNavigation();

  const bookMembership = () => {
    navigation.navigate('OrderReceipt', {
      orderType: checkoutType
    });
  };

  return (
    <View>
      <Header title="Checkout" isCancelButton={true} />
      <ScrollView>
        <View px="20px" pt="18px">
          <Typography
            color="#ABABAB"
            mb="11px"
            type="semi_bold_19_16_uppercase"
          >
            {TITLE[checkoutType]}
          </Typography>
          <Typography type="semi_bold_33_28_uppercase">
            {SUB_TITLE[checkoutType]}
          </Typography>
          <View
            flexDir="row"
            mt="11px"
            pb="15px"
            borderBottomWidth="1px"
            borderBottomColor="#E6E6E6"
          >
            <CoworkIcon size="20px" />
            <Typography type="light_16_21" ml="11px">
              Your own dedicated desk to work and jam on
              projects. Come and go as you please!
            </Typography>
          </View>
          <MembershipBilling />
          <SelectPaymentCard />
          {checkoutType ===
            CHECKOUT_TYPES.RESERVE_CONFERENCE_ROOM && (
              <BringingGuestCard />
            )}
          <View
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            py="12px"
          >
            <Text
              fontSize="16px"
              lineHeight="14px"
              textTransform="uppercase"
              letterSpacing="0.1em"
              color="#202020"
            >
              Subtotal
            </Text>
            <Text
              fontSize="14.22px"
              letterSpacing="0.07em"
              color="#202020"
            >
              $50.00
            </Text>
          </View>
        </View>
        <View px="18px" mt="67px">
          <BookMembershipButton onPress={bookMembership} />
        </View>
      </ScrollView>
    </View>
  );
};

Checkout.propTypes = {
  route: PropTypes.any
};

export default Checkout;
