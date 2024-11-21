import React from 'react';
import {
  Flex,
  Pressable,
  Text,
  Image,
  View
} from 'native-base';
import {
  Dimensions,
  StyleSheet,
  Linking
} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

import googlePlayBadge from '../../assets/images/google-play-badge.png';
import iosDownloadBadge from '../../assets/images/ios-download-badge.png';

const RidesCarousel = ({ navigation, item, index }) => {
  const {
    photo: {
      fields: {
        file: {
          fields: {
            file: { url: imgUrl }
          }
        },
        alt: imgAltText
      }
    },
    title,
    description,
    googleLink,
    iosLink
  } = item.fields;

  const browserLink = url => {
    Linking.openURL(url).catch(err =>
      console.log("Couldn't load page", err)
    );
  };

  return (
    <View
      key={index}
      style={styles.item}
      mt="7"
      mb="3"
      borderRadius="4"
    >
      <Image
        source={{ uri: 'https:' + imgUrl }}
        alt={imgAltText}
        w="500"
        h="208"
        borderTopRadius="8"
        resizeMode="cover"
      />
      <View flexDirection="column" p="20px" pb="0">
        <Text
          fontSize="lg"
          pt="4"
          mb="20px"
          bold
          _dark={{ color: 'white' }}
          _light={{ color: 'black' }}
        >
          {title}
        </Text>
        <Text
          _dark={{ color: 'white' }}
          _light={{ color: 'black' }}
          fontSize="16px"
        >
          {description}
        </Text>
        <Flex
          flexDirection="row"
          my="20px"
          justifyContent="space-between"
        >
          <Pressable
            onPress={() => {
              browserLink(googleLink);
            }}
          >
            <Image
              source={googlePlayBadge}
              alt={title}
              w="130px"
              h="40px"
            />
          </Pressable>
          <Pressable
            onPress={() => {
              browserLink(iosLink);
            }}
          >
            <Image
              source={iosDownloadBadge}
              alt="4m"
              w="130px"
              h="40px"
            />
          </Pressable>
        </Flex>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 7,
    elevation: 3,
    position: 'relative'
  }
});

export default RidesCarousel;
