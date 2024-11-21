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

import mask from '../../../assets/images/mask.png';

const Header = ({ title, isLogInBtn = false }) => {
  const navigation = useNavigation();
  return (
    <Box w="100%" h="120px" bg="white" shadow={3}>
      <View
        flexDir="row"
        w="100%"
        mt="5"
        h="100%"
        alignItems="center"
        justifyContent="space-between"
        ml="23"
      >
        <View
          flexDir="row"
          w="100%"
          mt="5"
          h="100%"
          alignItems="center"
        >
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
        {isLogInBtn && (
          <Text
            bold
            color="#01AF8F"
            mt="2"
            textTransform="uppercase"
          >
            Log In
          </Text>
        )}
      </View>
    </Box>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  isLogInBtn: PropTypes.bool
};

export default Header;
