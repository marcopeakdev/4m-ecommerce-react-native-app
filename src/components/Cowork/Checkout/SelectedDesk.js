import React from 'react';

import { View, Text, Image } from 'native-base';

import EditOfficeIcon from '../../../../assets/icons/EditOfficeIcon';

import SelectedOffice from '../../../../assets/images/select-office.png';
import DestinationLocation from '../../../../assets/images/4M_DestinationLocation.png';

const SelectedDesk = () => {
  return (
    <View
      flexDir="row"
      justifyContent="space-between"
      py="18px"
      borderBottomWidth="1px"
      borderBottomColor="#E6E6E6"
    >
      <View w="68%">
        <Text
          fontSize="14.22px"
          lineHeight="12px"
          color="#202020"
          mb="12px"
          letterSpacing="0.025em"
        >
          Small Office 2
        </Text>
        <View flexDir="row" alignItems="flex-start">
          <View>
            <Image
              alt="location Icon"
              source={DestinationLocation}
              resizeMode="contain"
            />
          </View>
          <Text
            ml="6px"
            color="#757575"
            fontSize="14.22px"
            lineHeight="21px"
            mt="-4px"
          >
            1919 S Industrial Hwy, Ann Arbor, MI 48104
          </Text>
        </View>
      </View>
      <View position="relative" w="85px" h="85px">
        <Image
          source={SelectedOffice}
          alt="Selected Office"
          resizeMode="cover"
        />
        <View position="absolute" bottom="-4" right="-4">
          <EditOfficeIcon />
        </View>
      </View>
    </View>
  );
};

export default SelectedDesk;
