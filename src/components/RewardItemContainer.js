import {
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  Text,
  useColorModeValue,
  VStack
} from 'native-base';
import React from 'react';

import imageDemo from '../../assets/images/4m-default-food-image.png';

const RewardItemContainer = props => {
  const {
    name,
    points,
    onPress,
    environmentImage,
    disabled
  } = props;

  return (
    <Pressable onPress={onPress}>
      <HStack
        alignItems={'center'}
        mb="4"
        borderWidth="0"
        backgroundColor={useColorModeValue(
          'brand.white',
          'brand.dark'
        )}
        borderRadius={'10'}
        shadow={4}
      >
        <VStack
          space="2"
          paddingLeft="40px"
          flex="1"
          px="4"
          py={2}
        >
          <Heading
            variant="captionTitle"
            fontWeight="bold"
            fontSize="14.22px"
            letterSpacing="2px"
          >
            {name}
          </Heading>
          <Pressable onPress={() => !disabled && onPress()}>
            <Text
              mt="-5px"
              color={disabled ? 'grey' : '#01AF8F'}
              fontSize="14.22px"
              lineHeight="21px"
            >
              Redeem your reward
            </Text>
          </Pressable>
        </VStack>
        <Box
          h="100"
          w="100"
          borderRightWidth="0"
          position="relative"
        >
          <Image
            h="100"
            w="100"
            alt="4m"
            source={
              environmentImage
                ? { uri: environmentImage }
                : imageDemo
            }
            resizeMode={'cover'}
            borderBottomRightRadius="8"
            borderTopRightRadius="8"
          />
        </Box>
      </HStack>
    </Pressable>
  );
};

export default RewardItemContainer;
