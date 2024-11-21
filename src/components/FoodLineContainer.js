import React from 'react';

import {
  Box,
  Center,
  Heading,
  Image,
  useColorModeValue,
  VStack
} from 'native-base';
import { Dimensions } from 'react-native';

const CONTAINER_WIDTH = Dimensions.get('window').width - 50;
const ITEM_WIDTH = CONTAINER_WIDTH;

const FoodLineContainer = props => {
  const { name, image, full, resizeMode, borderRadius } =
    props;

  return (
    <VStack
      space="2"
      w={full ? '100%' : ITEM_WIDTH}
      mb="2"
      mx="2"
      borderWidth={0}
    >
      <Center
        h="160"
        w={full ? '100%' : ITEM_WIDTH}
        borderRadius="10"
        borderWidth="0"
        backgroundColor="brand.lightgray"
      >
        <Image
          source={{ uri: image }}
          alt="4m"
          h={'100%'}
          w={'100%'}
          borderRadius={borderRadius}
          resizeMode={resizeMode}
        />
      </Center>
      <Box
        position="absolute"
        w="100%"
        h="70px"
        left="0px"
        bottom="8px"
        bg={{
          linearGradient: {
            colors: useColorModeValue(
              ['brand.dark', 'brand.dark', 'transparent'],
              ['brand.white', 'brand.white', 'transparent']
            ),
            start: [0.7, 1.4],
            end: [0.7, 0.6]
          }
        }}
        paddingLeft="10px"
        borderRadius="10"
        justifyContent="flex-end"
        paddingBottom="10px"
        opacity="0.8"
      >
        <Heading
          variant="captionTitle"
          fontSize="xs"
          _dark={{ color: 'brand.dark' }}
          _light={{ color: 'brand.white' }}
        >
          {name}
        </Heading>
      </Box>
    </VStack>
  );
};

export default FoodLineContainer;
