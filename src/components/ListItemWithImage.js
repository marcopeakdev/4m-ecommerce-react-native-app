import {
  Box,
  ChevronRightIcon,
  Heading,
  HStack,
  Pressable,
  Text,
  VStack
} from 'native-base';
import React from 'react';

const ListItemWithImage = props => {
  const {
    title,
    subTitle,
    date,
    image,
    imageCaption,
    onPressNav
  } = props.item;

  return (
    <Pressable onPress={onPressNav}>
      <HStack
        justifyContent={'center'}
        alignItems={'center'}
        borderTopWidth={1}
        py={3}
        borderColor={'brand.lightgrey'}
        w="100%"
        space={2}
      >
        <VStack flex={1}>
          <Heading
            mb={-2}
            variant="subHeader2"
            fontSize="md"
            textTransform={'uppercase'}
          >
            {title}
          </Heading>
          <Text isTruncated>{subTitle}</Text>
          <Text>{date}</Text>
        </VStack>
        <VStack
          marginX={2}
          justifyContent="center"
          alignItems={'center'}
          space={2}
        >
          {image}
          {imageCaption && (
            <Text
              variant="captionBody"
              _dark={{ color: 'brand.lightgrey' }}
              _light={{ color: 'brand.darkgray' }}
            >
              {imageCaption}
            </Text>
          )}
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default ListItemWithImage;
