import React from 'react';
import { View, Text, Image } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export const SLIDER_WIDTH =
  Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.73);

const HorizontalCard = ({ item, index }) => {
  const { imgUrl, title, body, date } = item;
  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      key={index}
      style={styles.item}
      shadow={2}
    >
      <View flexDirection="column" style={styles.content}>
        <Text bold mb="2">
          {title}
        </Text>
        <Text noOfLines={1} mb="1">{body}</Text>
        <Text fontSize="xs" color="gray">{date}</Text>
      </View>
      <Image
        style={styles.image}
        source={{ uri: imgUrl }}
        alt="4m"
        w="100"
        h="100"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    position: 'relative',
    width: 280,
    marginRight: 10
  },
  content: {
    padding: 10,
    width: '65%',
    marginRight: 10,
    fontSize: 4
  },
  image: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    resizeMode: 'cover',
    height: '100%',
    width: '35%',
    borderWidth: 1,
    borderColor: 'lightgray',

  }
});

export default HorizontalCard;
