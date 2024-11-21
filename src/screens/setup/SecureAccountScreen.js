import React, { useState, useContext } from 'react';

import {
  Box,
  FormControl,
  HStack,
  Input,
  Text,
  VStack
} from 'native-base';

import { useFocusEffect } from '@react-navigation/native';

import AuthButton from '../../components/Auth/AuthButton';
import BrandIcon from '../../components/Auth/BrandIcon';
import AuthHeading from '../../components/Auth/AuthHeading';
import HideWhenKeyboardShown from '../../components/HideWhenKeyboardShown';

import { awsSignUpEmail } from '../../helpers/awsAuthCalls';

import {
  verifyNumberRequirement,
  verifyRangeRequirement,
  verifySpecialCharacterRequirement,
  verifyUppercaseCharacterRequirement
} from '../../helpers/formatStrings';

import { AppContext } from '../../helpers/AppContext';

import EmergencyIcon from '../../../assets/icons/EmergencyIcon-v2';
import OrderCompleteIcon from '../../../assets/icons/OrderComplete';

const SecureAccountScreen = (
  { navigation, route },
  props
) => {
  const { newAccount, isPayment, screenName, isCowork } =
    route.params ?? {};

  const { setBottomTabHide } = useContext(AppContext);

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
  const [validPassword, setValidPassword] = useState(false);

  const handleFirstPasswordChange = event => {
    setFirstPassword(event.nativeEvent.text);
  };

  const handleFirstPasswordBlur = () => {};

  const handleSecondPasswordBlur = () => {};

  const handleSecondPasswordChange = event => {
    setSecondPassword(event.nativeEvent.text);

    if (firstPassword === event.nativeEvent.text) {
      setMismatchedPassword(false);
      if (verifyRangeRequirement(firstPassword)) {
        if (verifyNumberRequirement(firstPassword)) {
          if (
            verifySpecialCharacterRequirement(firstPassword)
          ) {
            setValidPassword(true);
          } else {
            setValidPassword(false);
          }
        } else {
          setValidPassword(false);
        }
      } else {
        setValidPassword(false);
      }
    } else {
      setMismatchedPassword(true);
      setValidPassword(false);
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
      borderWidth={0}
      flex={1}
      mt={0}
      pt={0}
      justifyContent="space-between"
      safeArea
    >
      <VStack flex={1} justifyContent="center" px={4}>
        <Box
          justifyContent="center"
          alignItems="center"
          mb={8}
        >
          <BrandIcon size={100} />
        </Box>
        <VStack
          space={6}
          alignItems="center"
          width="100%"
          mb={20}
        >
          <VStack
            alignItems="center"
            space={6}
            width="100%"
          >
            <AuthHeading>
              Time to secure your account
            </AuthHeading>
          </VStack>

          <VStack
            alignItems="center"
            width="100%"
            space={6}
          >
            <VStack
              width="100%"
              alignItems="center"
              mt={2}
              space="10"
            >
              <FormControl>
                <FormControl.Label
                  _text={{ color: 'brand.white' }}
                >
                  Create Password:
                </FormControl.Label>
                <Input
                  placeholder=""
                  minlength={8}
                  maxlength={20}
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
                    firstPassword.length > 8
                      ? 'brand.green'
                      : 'brand.white'
                  }
                />

                <VStack width="100%" mt="3" space={2}>
                  <HStack alignItems="center" space="2">
                    <OrderCompleteIcon
                      size="xs"
                      color={
                        verifyRangeRequirement(
                          firstPassword
                        )
                          ? 'brand.green'
                          : 'brand.orange'
                      }
                    />
                    <Text color="brand.white">
                      8 - 20 characters
                    </Text>
                  </HStack>
                  <HStack alignItems="center" space="2">
                    <OrderCompleteIcon
                      size="xs"
                      color={
                        verifyNumberRequirement(
                          firstPassword
                        )
                          ? 'brand.green'
                          : 'brand.orange'
                      }
                    />
                    <Text color="brand.white">
                      At least 1 number
                    </Text>
                  </HStack>
                  <HStack alignItems="center" space="2">
                    <OrderCompleteIcon
                      size="xs"
                      color={
                        verifySpecialCharacterRequirement(
                          firstPassword
                        )
                          ? 'brand.green'
                          : 'brand.orange'
                      }
                    />
                    <Text color="brand.white">
                      At least 1 special character
                    </Text>
                  </HStack>
                  <HStack alignItems="center" space="2">
                    <OrderCompleteIcon
                      size="xs"
                      color={
                        verifyUppercaseCharacterRequirement(
                          firstPassword
                        )
                          ? 'brand.green'
                          : 'brand.orange'
                      }
                    />
                    <Text color="brand.white">
                      At least 1 uppercase character
                    </Text>
                  </HStack>
                </VStack>

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
                  Incorrect. Please try again.
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isInvalid={mismatchedPassword}>
                <FormControl.Label
                  _text={{ color: 'brand.white' }}
                >
                  Re-enter Password:
                </FormControl.Label>
                <Input
                  placeholder=""
                  minlength={8}
                  maxlength={20}
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
                  selectionColor="white"
                  variant={'ecomAuth'}
                  borderColor={
                    secondPassword.length > 8
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
                  Passwords must match.
                </FormControl.ErrorMessage>
              </FormControl>
            </VStack>
          </VStack>
        </VStack>
      </VStack>

      <HideWhenKeyboardShown
        props={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          space: 4,
          my: 4
        }}
      >
        <HStack space={4} px={4}>
          <AuthButton
            onPress={() => {
              if (validPassword && !mismatchedPassword) {
                awsSignUpEmail(
                  newAccount.email,
                  firstPassword
                )
                  .then(awsUser => {
                    navigation.navigate(
                      '6-DigitVerification',
                      {
                        newAccount: {
                          email: newAccount.email,
                          password: firstPassword,
                          name: newAccount.name
                        },
                        isPayment,
                        isCowork,
                        screenName
                      }
                    );
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            }}
            active={validPassword}
          >
            CONTINUE
          </AuthButton>
        </HStack>
      </HideWhenKeyboardShown>
    </Box>
  );
};

export default SecureAccountScreen;
