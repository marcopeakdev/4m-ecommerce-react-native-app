import { Box, HStack, Text, VStack } from 'native-base';
import React from 'react';

const Banner = props => {
  const { color, icon, heading, body, show } = props;

  return show ? (
    <HStack
      position="absolute"
      top="0"
      left="0"
      width="100%"
      backgroundColor={color ? color : 'brand.lightgrey'}
      alignItems={heading && body ? 'flex-start' : 'center'}
      space="4"
      px="4"
      py="3"
      zIndex={5}
      safeArea
    >
      {icon && <Box>{icon}</Box>}
      <VStack space="2">
        {heading && (
          <Text
            fontWeight="600"
            textTransform={'uppercase'}
          >
            {heading}
          </Text>
        )}

        {body && <Text>{body}</Text>}
      </VStack>
    </HStack>
  ) : (
    <></>
  );
};

export default Banner;
