import React from 'react';
import {
  VStack,
  Text,
  Image,
  Pressable
} from 'native-base';

const Tile = props => {
  const { image, text } = props;

  return (
    <Pressable {...props}>
      <VStack bg="#ffffff">
        <Image
          source={image}
          alt="4m"
          h="175"
          borderRadius="5"
        />
        <Text
          fontSize="14.22px"
          fontWeight="bold"
          _dark={{ color: 'white' }}
          _light={{ color: 'brand.dark' }}
          {...props}
        >
          {text}
        </Text>
      </VStack>
    </Pressable>
  );
};

export default Tile;
