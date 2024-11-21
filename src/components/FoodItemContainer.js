// import { Text } from 'react-native'

// const FoodItemContainer = () => {
//   return (
//     <Text>FoodItemContainer</Text>
//   )
// }

// export default FoodItemContainer

import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Pressable,
  Text,
  useColorModeValue,
  VStack
} from 'native-base';
import React, { useState, useEffect } from 'react';

import { formatCurrency } from '../helpers/formatStrings';
import RewardPlus from '../../assets/icons/RewardPlus';
import RewardCheck from '../../assets/icons/RewardCheck';
import imageDemo from '../../assets/images/4m-default-food-image.png';

const FoodItemContainer = props => {
  const {
    name,
    price,
    onPress,
    in_stock,
    groupImage,
    contentful,
    imageRight,
    onCheck,
    isReward,
    checked
  } = props;

  /*   if (name === 'Salsa Flight') {
    console.log('Contentful for Salsa Flight', contentful);
  } */

  const [isChecked, setChecked] = useState(
    checked ?? false
  );

  const funImage =
    contentful &&
    contentful?.fields?.photo?.fields?.file?.url
      ? {
          uri:
            'https:' +
            contentful?.fields?.photo?.fields?.file?.url
        }
      : imageDemo;

  const handleSelect = () => {
    if (onCheck) {
      onCheck(!isChecked);
    }
    setChecked(!isChecked);
  };

  return (
    <Pressable onPress={onPress}>
      <Box position="relative" opacity={in_stock ? 1 : 0.4}>
        <HStack
          alignItems={'center'}
          mb="4"
          borderWidth="0"
          backgroundColor={useColorModeValue(
            'brand.white',
            'brand.dark'
          )}
          borderRadius={'10'}
          shadow={in_stock ? 4 : 0}
          width={!isReward && groupImage ? '90%' : '100%'}
          zIndex={1}
        >
          {!imageRight && (
            <Box h="75" w="75" borderRightWidth="0">
              <Image
                h="75"
                w="75"
                alt="4m"
                source={funImage}
                resizeMode={'cover'}
                borderBottomLeftRadius="8"
                borderTopLeftRadius="8"
              />
            </Box>
          )}
          <VStack space="2" flex="1" px="4">
            <Heading
              variant="captionTitle"
              fontWeight="700"
              fontSize="xs"
            >
              {name}
            </Heading>
            {!isReward && (
              <Text fontWeight="300">
                {price && formatCurrency(price)}
              </Text>
            )}
            {isReward && (
              <Text
                fontWeight="400"
                fontSize="14.22px"
                lineHeight="21px"
                color="#757575"
              >
                Redeem and add to order
              </Text>
            )}
          </VStack>
          {imageRight && (
            <Box
              h="75"
              w="75"
              borderRightWidth="0"
              position="relative"
            >
              <Image
                h="75"
                w="75"
                alt="4m"
                source={funImage}
                resizeMode={'cover'}
                borderBottomRightRadius="8"
                borderTopRightRadius="8"
              />
              <Pressable
                onPress={handleSelect}
                position="absolute"
                left="-15px"
                top="25px"
              >
                {isChecked && (
                  <RewardCheck
                    active={true}
                    size="20px"
                    color={'black'}
                  />
                )}
                {!isChecked && (
                  <RewardPlus size="20px" color={'black'} />
                )}
              </Pressable>
            </Box>
          )}
        </HStack>
        {!isReward && groupImage && (
          <Box
            h="75"
            w="75"
            borderRightWidth="0"
            position="absolute"
            shadow={in_stock ? 4 : 0}
            opacity={in_stock ? 1 : 0.4}
            right="0px"
            top="0px"
          >
            <Image
              h="75"
              w="75"
              alt="4m"
              source={{ uri: groupImage }}
              resizeMode={'cover'}
              borderBottomRightRadius="8"
              borderTopRightRadius="8"
              zIndex="0"
            />
          </Box>
        )}
      </Box>
    </Pressable>
  );
};

export default FoodItemContainer;
