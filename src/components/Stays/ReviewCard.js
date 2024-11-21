import React from 'react';
import { Text, View } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';

export const CARD_SLIDER_WIDTH = Dimensions.get('window').width;
export const CARD_ITEM_WIDTH = Math.round(CARD_SLIDER_WIDTH * 0.9);

const ReviewCard = ({ item, index }) => {
  return (
    <View key={index} mb={3}>
      <View flexDirection="row" alignItems="flex-end">
        <Text fontSize="19.2px" lineHeight="16.49px" fontWeight="bold">{item?.mark}</Text>
        <Text mx={2} fontSize="14.22px" lineHeight="12px" letterSpacing="1px" fontWeight="600">{item?.name}</Text>
      </View>
      <Text fontSize="16px" lineHeight="21px" fontWeight="200" mt="6px">{item?.rawReview}</Text>
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    markStyle: {
      fontSize: 19.2,
      lineHeight: 16.49,
      fontWeight: 'bold',
    },
    nameText: {
      fontSize: 14.22,
      lineHeight: 12,
      fontWeight: '700',
      letterSpacing: 2,
    },
    reviewText: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: '200',
    }
  });

export default ReviewCard;
