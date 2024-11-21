import {
  Center,
  VStack,
  Heading,
  HStack,
  Text,
  Code,
  Link,
  Box,
  Input,
  Button,
  Image,
  Flex
} from 'native-base';

import React, { useState } from 'react';
import AuthButton from '../components/Auth/AuthButton';
import BrandIcon from '../components/Auth/BrandIcon';

import AuthCenter from '../components/Auth/AuthCenter';
import AuthHeading from '../components/Auth/AuthHeading';
import AuthHeadingWarning from '../components/Auth/AuthHeadingWarning';
import AuthText from '../components/Auth/AuthText';

export default AccountExistsScreen = (
  { navigation, route },
  props
) => {
  return (
    <AuthCenter>
      <Box justifyContent="center" height={109} mb={10}>
        <BrandIcon />
      </Box>

      <Box
        flex={2}
        justifyContent="center"
        w={{ base: '100%' }}
      >
        <VStack>
          <AuthHeading textAlign="center">
            Account Exists
          </AuthHeading>
          <AuthText>
            An account with that phone number already
            exists.
          </AuthText>
        </VStack>
      </Box>

      <Box flex={1}></Box>

      <Box
        alignItems="center"
        justifyContent="flex-end"
        space={4}
        flex={1}
      >
        <VStack space={4} alignItems="center">
          <HStack>
            <AuthButton
              onPress={() => {
                navigation.navigate('Login', {});
              }}
            >
              LOG IN
            </AuthButton>
          </HStack>
          <Link
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            Use a different phone number.
          </Link>
        </VStack>
      </Box>
    </AuthCenter>
  );
};
