import React from 'react';
import { VStack, Text, View, Pressable } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import MemberImage from './memberImage';

export const CARD_SLIDER_WIDTH =
  Dimensions.get('window').width;
export const CARD_ITEM_WIDTH = Math.round(
  CARD_SLIDER_WIDTH * 0.82
);

const MembershipCardWrapper = ({ item, index }) => {
  return <MembershipCard {...{ item, index }} />;
};

const MembershipCard = ({ item, index }) => {
  // console.log(item, index)

  const navigation = useNavigation();
  const { Name, PriceFormatted } = item;

  const onSelect = () => {
    navigation.navigate('Terms', {
      checkoutType: 'BOOK_MEMBERSHIP'
    });
  };

  return (
    <View key={index}>
      <VStack style={styles.main} shadow={2}>
        <View
          h="280"
          alignItems="center"
          mt="2"
          justifyContent="space-between"
        >
          <View>
            <MemberImage />
          </View>
          <Text
            fontWeight="bold"
            letterSpacing="0.05em"
            fontSize="20.25"
            pt="2"
          >
            {Name}
          </Text>
          <View
            bgColor="#01AF8F"
            p="3px 10px"
            w="95px"
            h="22px"
            alignItems="center"
            justifyContent="center"
            borderRadius="5"
          >
            <Text fontSize="14.22px">{PriceFormatted}</Text>
          </View>
          <Text
            color="#202020"
            fontSize="16px"
            lineHeight="21"
            textAlign="center"
            paddingLeft="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
          >
            Your own dedication desk to work and jem on
            projects. Come and go as you please!
          </Text>
          <Pressable onPress={onSelect}>
            <Text
              color="#01AF8F"
              letterSpacing="0.25em"
              bold
              fontSize="14.22px"
              p="2"
              lineHeight="21"
              textTransform="uppercase"
              textAlign="center"
            >
              Select membership
            </Text>
          </Pressable>
        </View>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 320,
    height: 360,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'lightgray'
  }
});

MembershipCard.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};

MembershipCardWrapper.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};

export default MembershipCardWrapper;
