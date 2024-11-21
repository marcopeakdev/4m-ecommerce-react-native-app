import React from 'react';
import {
  Text,
  View,
  ScrollView,
  useColorModeValue
} from 'native-base';
import { Dimensions } from 'react-native';
import PeopleIcon from '../../../assets/icons/PeopleIcon';
import BedsIcon from '../../../assets/icons/BedsIcon';
import BathIcon from '../../../assets/icons/BathIcon';
import ACUnitIcon from '../../../assets/icons/ACUnitIcon';
import BiWifiIcon from '../../../assets/icons/BiWifiIcon';

export const CARD_SLIDER_WIDTH =
  Dimensions.get('window').width;
export const CARD_ITEM_WIDTH = Math.round(
  CARD_SLIDER_WIDTH * 0.9
);

const InfoWithIcon = ({ data, index }) => {
  const colorMode = useColorModeValue(
    'brand.dark',
    'brand.white'
  );

  return (
    <View key={index} mb={2}>
      <ScrollView pb={4} horizontal>
        {data?.accommodates && (
          <View
            mx={5}
            justifyContent="center"
            alignItems="center"
          >
            <PeopleIcon size="47px" color={colorMode} />
            <Text
              mt={1}
              fontSize="14.22px"
              lineHeight="21px"
              fontWeight="400"
            >
              {data?.accommodates} Guests
            </Text>
          </View>
        )}
        {data?.beds && (
          <View
            mx={5}
            justifyContent="center"
            alignItems="center"
          >
            <BedsIcon size="47px" color={colorMode} />
            <Text
              mt={1}
              fontSize="14.22px"
              lineHeight="21px"
              fontWeight="400"
            >
              {data?.beds} beds
            </Text>
          </View>
        )}
        {data?.bathrooms && (
          <View
            mx={5}
            justifyContent="center"
            alignItems="center"
          >
            <BathIcon size="47px" color={colorMode} />
            <Text
              mt={1}
              fontSize="14.22px"
              lineHeight="21px"
              fontWeight="400"
            >
              {data?.bathrooms} baths
            </Text>
          </View>
        )}
        <View
          mx={5}
          justifyContent="center"
          alignItems="center"
        >
          <BiWifiIcon size="47px" color={colorMode} />
          <Text
            mt={1}
            fontSize="14.22px"
            lineHeight="21px"
            fontWeight="400"
          >
            Wifi
          </Text>
        </View>
        <View
          mx={5}
          justifyContent="center"
          alignItems="center"
        >
          <ACUnitIcon size="47px" color={colorMode} />
          <Text
            mt={1}
            fontSize="14.22px"
            lineHeight="21px"
            fontWeight="400"
          >
            AC
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default InfoWithIcon;
