import { LinearGradient } from 'expo-linear-gradient';
import {
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  Text,
  useColorModeValue,
  useTheme,
  VStack
} from 'native-base';

import icon4M from '../../assets/4M_ICON-gradient.png';

import React from 'react';

// SIZE HAS NOT BEEN IMPLEMENTED YET

const AdvertButton = props => {
  const {
    heading,
    text,
    imageUri,
    imageAlt,
    onPress,
    size
  } = props;

  const { colors } = useTheme();

  return (
    <Pressable onPress={() => onPress()}>
      <Box
        borderRadius={10}
        borderColor="black"
        width="100%"
        height={76}
        justifyContent={'center'}
      >
        <LinearGradient
          colors={[
            useColorModeValue(
              colors.brand.dark,
              colors.brand.white
            ),

            'transparent'
          ]}
          locations={[0.7, 0.85]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            borderRadius: 10,
            height: '100%',
            width: '100%'
          }}
        >
          <VStack
            justifyContent="center"
            /*           backgroundColor={useColorModeValue(
            'brand.dark',
            'brand.light'
          )} */
            height="100%"
            p="2"
            borderRadius={10}
          >
            <Heading
              variant="captionTitle"
              fontSize="md"
              textTransform={'uppercase'}
              color={useColorModeValue(
                'brand.white',
                'brand.dark'
              )}
            >
              {heading && heading}
            </Heading>
            <Text
              variant="captionBody"
              color={useColorModeValue(
                'brand.white',
                'brand.dark'
              )}
            >
              {text && text}
            </Text>
          </VStack>

          <Box
            position="absolute"
            width="100%"
            height="100%"
            alignItems={'flex-end'}
            justifyContent="center"
            zIndex="-1"
            borderRightRadius={10}
          >
            {imageUri && (
              <Image
                source={{
                  uri: imageUri
                }}
                alt="4m"
                size={200}
                height={76}
                resizeMode="cover"
                borderRightRadius={6}
              />
            )}
            {!imageUri && (
              <Image
                source={icon4M}
                alt="4m"
                size={70}
                height={76}
                resizeMode="cover"
                borderRightRadius={6}
              />
            )}
          </Box>
        </LinearGradient>
      </Box>
    </Pressable>
  );
};

export default AdvertButton;
