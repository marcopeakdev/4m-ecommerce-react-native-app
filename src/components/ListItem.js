import {
  Box,
  ChevronRightIcon,
  Heading,
  HStack,
  Pressable
} from 'native-base';
import React from 'react';

const ListItem = props => {
  const { title, onPressNav } = props.item;

  return (
    <Pressable onPress={onPressNav}>
      <HStack
        justifyContent={'space-between'}
        alignItems={'center'}
        borderBottomWidth={1}
        py={6}
        borderColor={'brand.lightgrey'}
        w="100%"
      >
        <Heading mb={-2} variant="header4" fontSize="md">
          {title}
        </Heading>
        <ChevronRightIcon size="5" color="brand.grey" />
      </HStack>
    </Pressable>
  );
};

export default ListItem;
