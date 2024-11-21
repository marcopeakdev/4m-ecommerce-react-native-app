import React, { useState } from 'react';

import { View, Text, Pressable } from 'native-base';

import CheckBoxIcon from '../../../../assets/icons/CheckboxIcon';

const MembershipBilling = () => {
  const [isAutoRenew, setIsAutoRenew] = useState(false);

  const handleAutoRenew = () => {
    setIsAutoRenew(prev => !prev);
  };

  return (
    <View
      py="12px"
      borderBottomWidth="1px"
      borderBottomColor="#E6E6E6"
    >
      <Text
        fontSize="14.22px"
        lineHeight="12px"
        letterSpacing="0.104em"
        fontWeight="400"
      >
        Membership Billing
      </Text>
      <Text
        mt="4px"
        fontSize="16px"
        lineHeight="21px"
        fontWeight="300"
      >
        This membership is billed on a monthly basis. If you
        wish to cancel this membership you may do so at
        anytime.
      </Text>
      <View
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        mt="14px"
      >
        <View flexDir="row" alignItems="center">
          <Pressable onPress={handleAutoRenew}>
            <CheckBoxIcon active={isAutoRenew} />
          </Pressable>
          <Text
            ml="20px"
            fontSize="16px"
            lineHeight="21px"
            fontWeight="300"
          >
            Auto Renew
          </Text>
        </View>
        <Text
          fontSize="14.22px"
          lineHeight="12px"
          fontWeight="400"
        >
          March 23, 2022
        </Text>
      </View>
    </View>
  );
};

export default MembershipBilling;
