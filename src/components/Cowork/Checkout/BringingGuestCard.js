import React, { useState } from 'react';
import { View, Text, Pressable } from 'native-base';

import SelectIcon from '../../../../assets/icons/SelectArrow';

import AddGuest from './AddGuest';

const BringingGuestCard = () => {
  const [inviteGuest, setInviteGuest] = useState(false);

  const addGuest = () => {
    setInviteGuest(true);
  };

  return (
    <>
      <AddGuest
        open={inviteGuest}
        setOpen={setInviteGuest}
      />
      <View
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
        py="12px"
        borderBottomWidth="1px"
        borderBottomColor="#E6E6E6"
      >
        <Text
          color="#202020"
          fontSize="14.22px"
          lineHeight="21px"
          letterSpacing="0.07em"
          fontWeight="400"
          textTransform="uppercase"
        >
          Bringing Guests?
        </Text>
        <Pressable onPress={addGuest}>
          <View
            flexDir="row"
            alignItems="center"
            justifyContent="center"
            h="32px"
            w="119px"
            borderColor="#202020"
            borderWidth="1px"
            rounded="24px"
          >
            <Text
              color="#202020"
              fontSize="14.22px"
              lineHeight="21px"
              mr="4px"
            >
              Add Guests
            </Text>
            <SelectIcon />
          </View>
        </Pressable>
      </View>
    </>
  );
};

export default BringingGuestCard;
