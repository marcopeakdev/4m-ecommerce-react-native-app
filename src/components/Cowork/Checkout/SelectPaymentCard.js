import React from 'react';

import { View, Text, Pressable } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import ArrowRight from '../../../../assets/icons/ArrowRight';
// import EditIcon from '../../../../assets/icons/EditIcon';
import CardIcon from '../../../../assets/icons/CardIcon';

const SelectPaymentCard = () => {
  const navigation = useNavigation();

  const onSelectOrUpdatePayments = () => {
    navigation.navigate('PaymentMethods');
  };
  return (
    <View
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      pt="11px"
      pb="12px"
      borderBottomWidth="1px"
      borderBottomColor="#E6E6E6"
    >
      <View flexDir="row" alignItems="center">
        <CardIcon />
        <Text
          ml="18px"
          color="#202020"
          fontSize="14.22px"
          lineHeight="12px"
          letterSpacing="0.025em"
        >
          Payment type
        </Text>
      </View>
      <Pressable onPress={onSelectOrUpdatePayments}>
        <ArrowRight />
      </Pressable>
    </View>
  );
};

export default SelectPaymentCard;
