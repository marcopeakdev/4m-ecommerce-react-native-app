import React from 'react';
import { Image, View } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';

export const IMAGE_SLIDER_WIDTH =
  Dimensions.get('window').width - 30;
export const IMAGE_ITEM_WIDTH = Math.round(
  IMAGE_SLIDER_WIDTH * 0.9
);

const CarouselImage = ({ item, index }) => {
  const { imgUrl, alt } = item;
  return (
    <View key={index} style={styles.image}>
      <Image
        source={ uri: imgUrl }}
        alt="4m"
        mb="3"
        borderRadius="5"
      />
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    image: {
      marginBottom: 5,
      borderRadius: 8
    }
  });

export default CarouselImage;
