import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import {
  Box,
  Text,
  Image,
  Pressable,
  View
} from 'native-base';

import mask from '../../../../assets/images/mask.png';

const Header = ({ title, isCancelButton = false }) => {
  const navigation = useNavigation();
  return (
    <Box w="100%" h="120px" bg="white" shadow={3}>
      <View
        w="100%"
        mt="35px"
        px="18px"
        h="100%"
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <View flexDir="row" alignItems="center">
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              h="5"
              w="5"
              alt={'name'}
              source={mask}
              resizeMode="contain"
            />
          </Pressable>
          <Text
            fontSize="24"
            pt="2"
            fontWeight="extrabold"
            mr="6"
            ml="5"
          >
            {title}
          </Text>
        </View>
        {isCancelButton && (
          <Pressable>
            <Text
              color="#E48600"
              textTransform="uppercase"
              fontSize="14.22px"
              lineHeight="12px"
              mt="10px"
              onPress={() => navigation.goBack()}
            >
              Cancel
            </Text>
          </Pressable>
        )}
      </View>
    </Box>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  isCancelButton: PropTypes.bool
};

export default Header;
