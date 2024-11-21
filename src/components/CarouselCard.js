import React from 'react';
import { Text, Image, View, Box } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';

export const CARD_SLIDER_WIDTH =
  Dimensions.get('window').width;
export const CARD_ITEM_WIDTH = Math.round(
  CARD_SLIDER_WIDTH * 0.9
);

const CarouselCard = ({ item, index }) => {
  const { imgUrl, title, day, date, time, textColor } =
    item;
  return (
    <View key={index} style={styles.item}>
      <Box shadow={8}>
        <Image
          source={{ uri: imgUrl }}
          alt={title}
          w="295"
          h="195"
          mb="3"
          borderRadius="15"
        />
      </Box>
      <View flexDirection="column">
        <Text
          fontSize="14.22px"
          textTransform="uppercase"
          letterSpacing="0.07em"
          bold
          color={textColor || 'black'}
          py="2"
        >
          {title}
        </Text>
        {day && (
          <Text
            fontSize="14.22px"
            fontWeight="400"
            color={textColor || 'black'}
          >
            {day} &bull; {date} &bull; {time}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    item: {
      marginBottom: 5,
      backgroundColor:
        props.color == 'white' ? 'white' : '#202020',
      borderRadius: 8
    }
  });

export default CarouselCard;
