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
  Flex,
  KeyboardAvoidingView,
  FormControl
} from 'native-base';

import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import AuthButton from '../../../components/Auth/AuthButton/';
import BrandIcon from '../../../components/Auth/BrandIcon';

import AuthCenter from '../../../components/Auth/AuthCenter';
import AuthHeading from '../../../components/Auth/AuthHeading';
import AuthHeadingWarning from '../../../components/Auth/AuthHeadingWarning';
import AuthText from '../../../components/Auth/AuthText';

import { awsForgotPasswordSubmitEmail } from '../../../helpers/awsAuthCalls';

import HideWhenKeyboardShown from '../../../components/HideWhenKeyboardShown';

import EmergencyIcon from '../../../../assets/icons/EmergencyIcon-v2';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../../helpers/AppContext';
import { Auth } from 'aws-amplify';

export default FPSecureAccountScreen = (
  { navigation, route },
  props
) => {
  const { setBottomTabHide, setUserData } =
    useContext(AppContext);

  const { isPayment, screenName, isCowork } =
    route.params ?? {};

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  const [invalidPassword, setInvalidPassword] =
    useState(false);
  const [mismatchedPassword, setMismatchedPassword] =
    useState(false);
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [validPassword, setValidPassword] = useState(true);

  const handleFirstPasswordChange = event => {
    // Handle password secure test here
    setFirstPassword(event.nativeEvent.text);
  };

  const handleFirstPasswordBlur = () => {
    if (secondPassword.length > 0) {
      if (!(firstPassword === secondPassword)) {
        setMismatchedPassword(true);
      } else {
        setValidPassword(true);
      }
    }
  };

  const handleSecondPasswordBlur = () => {
    if (!(firstPassword === secondPassword)) {
      setMismatchedPassword(true);
    } else {
      setValidPassword(true);
    }
  };

  const handleSecondPasswordChange = event => {
    setSecondPassword(event.nativeEvent.text);
    if (firstPassword === event.nativeEvent.text) {
      setValidPassword(true);
    }
  };

  const resetInvalidPassword = () => {
    setInvalidPassword(false);
  };

  const resetMismatchedPassword = () => {
    setMismatchedPassword(false);
  };

  return (
    <Box
      BoxborderWidth={0}
      flex={1}
      mt={0}
      pt={0}
      justifyContent="space-between"
      safeArea
    >
      <Box justifyContent="center" alignItems="center">
        <BrandIcon size={100} />
      </Box>

      <Center
        flex={1}
        alignItems="center"
        width="100%"
        px={4}
      >
        <VStack
          space={6}
          alignItems="center"
          width="100%"
          mb={20}
        >
          <VStack alignItems="center">
            <AuthHeading>Reset Your Password</AuthHeading>
            <AuthText>
              Please create a new password to keep your
              account secure (make it unique for extra
              security)
            </AuthText>
          </VStack>

          <VStack justifyContent="center" width="100%">
            <VStack
              width="100%"
              alignItems="center"
              space="10"
            >
              <FormControl isInvalid={mismatchedPassword}>
                <FormControl.Label
                  _text={{ color: 'brand.white' }}
                >
                  Create Password
                </FormControl.Label>
                <Input
                  placeholder="Password"
                  value={firstPassword}
                  onChange={handleFirstPasswordChange}
                  onBlur={handleFirstPasswordBlur}
                  type={'password'}
                  onFocus={() => {
                    setFirstPassword('');
                    setValidPassword(false);
                    resetInvalidPassword();
                    resetMismatchedPassword();
                  }}
                  variant={'ecomAuth'}
                  borderColor={
                    firstPassword.length > 0
                      ? 'brand.green'
                      : 'brand.white'
                  }
                />
              </FormControl>

              <FormControl isInvalid={mismatchedPassword}>
                <FormControl.Label
                  _text={{ color: 'brand.white' }}
                >
                  Re-enter Password
                </FormControl.Label>

                <Input
                  placeholder="Password"
                  value={secondPassword}
                  onChange={handleSecondPasswordChange}
                  onBlur={handleSecondPasswordBlur}
                  onFocus={() => {
                    setSecondPassword('');
                    setValidPassword(false);
                    resetInvalidPassword();
                    resetMismatchedPassword();
                  }}
                  type={'password'}
                  variant={'ecomAuth'}
                  borderColor={
                    firstPassword.length > 0
                      ? 'brand.green'
                      : 'brand.white'
                  }
                />
                <FormControl.ErrorMessage
                  _text={{ color: 'brand.dark' }}
                  backgroundColor="#FF8888"
                  p="3"
                  leftIcon={<EmergencyIcon size="xs" />}
                  _stack={{
                    space: 2,
                    alignItems: 'flex-start'
                  }}
                >
                  Please make sure your passwords match.
                </FormControl.ErrorMessage>
              </FormControl>
            </VStack>
          </VStack>
        </VStack>
      </Center>

      <HideWhenKeyboardShown
        props={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          space: 4,
          my: 4
        }}
      >
        <HStack space={4} px={4}>
          <Button
            variant="purple"
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
            onPress={async () => {
              if (!invalidPassword && !mismatchedPassword) {
                awsForgotPasswordSubmitEmail(
                  route.params.email,
                  route.params.awsCode,
                  firstPassword
                );

                try {
                  setUserData(route.params.email);
                } catch (error) {
                  console.log(
                    'Error setting user data',
                    error
                  );
                }

                if (isPayment) {
                  navigation.navigate('ViewTab');
                } else if (isCowork) {
                  navigation.navigate('Membership');
                } else {
                  navigation.navigate('Home');
                }
              }
            }}
            active={validPassword}
          >
            NEXT
          </Button>
        </HStack>
      </HideWhenKeyboardShown>
    </Box>
  );
};
