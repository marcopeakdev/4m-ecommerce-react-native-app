import React from 'react';

import { Box, Text, View } from 'native-base';

import InfoIcon from '../../../assets/icons/Info';

const Note = () => {
  return (
    <Box bg="#FD8D3E" flexDir="row" px="30.5px" py="8px">
      <View mr="8px">
        <InfoIcon />
      </View>
      <View>
        <Text
          fontSize="14.22px"
          lineHeight="12px"
          letterSpacing="0.07em"
          textTransform="uppercase"
          color="#202020"
          fontWeight="bold"
        >
          Read and Agree
        </Text>
        <Text
          fontSize="14.22px"
          lineHeight="21px"
          textTransform="uppercase"
          color="#202020"
          mt="4px"
        >
          Please read and agree to the terms & conditions to
          continue.
        </Text>
      </View>
    </Box>
  );
};

export default Note;
