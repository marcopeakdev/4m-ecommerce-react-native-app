import React, { useState, useRef, useContext } from 'react';

import {
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  FormControl,
  HStack,
  Input,
  Link,
  Text,
  VStack,
  Pressable
} from 'native-base';

import AuthHeading from '../../components/Auth/AuthHeading';
import AuthText from '../../components/Auth/AuthText';

import BrandIcon from '../../components/Auth/BrandIcon';

import { AppContext } from '../../helpers/AppContext';

import { awsSignInEmail } from '../../helpers/awsAuthCalls';

import HideWhenKeyboardShown from '../../components/HideWhenKeyboardShown';

import { verifyEmail } from '../../helpers/formatStrings';
import EmergencyIcon from '../../../assets/icons/EmergencyIcon-v2';
import { useFocusEffect } from '@react-navigation/native';
import { ToastContext } from '../../helpers/ToastContext';

export default LoginScreen = (
  { navigation, route },
  props
) => {
  const { isPayment, screenName, isCowork } =
    route.params ?? {};

  const { setBottomTabHide } = useContext(AppContext);

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  const appContext = useContext(AppContext);
  const toastContext = useContext(ToastContext);

  const { latestAWSPayload, setLatestAWSPayload } =
    toastContext;

  const [incorrectLogin, setIncorrectLogin] =
    useState(false);

  const [loginError, setLoginError] = useState(null);

  const [accountEmail, setAccountEmail] = useState('');

  route.params?.email &&
    setAccountEmail(route.params.email);

  const handleEmailChange = event => {
    setAccountEmail(event.nativeEvent.text);
  };

  const resetIncorrectLogin = () => {
    setIncorrectLogin(false);
  };

  const passwordRef = useRef();

  const [password, setPassword] = useState('');

  const clearParams = () => {
    navigation.setParams({
      isCowork: false,
      isPayment: false
    });
  };

  const navigateToTab = () => {
    clearParams();
    navigation.navigate('ViewTab');
  };

  const navigateToMembership = () => {
    clearParams();
    navigation.navigate('Membership');
  };

  const navigateHome = () => {
    navigation.navigate('Home');
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
      <HStack>
        <Box width="33%" pt="8" pl="6">
          <Pressable
            onPress={
              isPayment
                ? navigateToTab
                : isCowork
                ? navigateToMembership
                : navigateHome
            }
          >
            <ChevronLeftIcon size="lg" color="white" />
          </Pressable>
        </Box>
        <Box
          justifyContent="center"
          alignItems="center"
          width="33%"
        >
          <BrandIcon size={100} />
        </Box>
        <Box width="33%"></Box>
      </HStack>

      <Center flex={1} alignItems="center" px={4}>
        <Box width="100%">
          <VStack
            space={6}
            alignItems="center"
            width="100%"
          >
            <VStack alignItems="center" space="2">
              {loginError && (
                <Text color="white">
                  {JSON.stringify(loginError)}
                </Text>
              )}
              <AuthHeading>Log In</AuthHeading>
              <AuthText>
                Please enter your login information
              </AuthText>
            </VStack>

            <VStack width="100%" space={6}>
              <VStack
                width="100%"
                alignItems="center"
                mt={2}
                space="10"
              >
                <FormControl
                  isInvalid={
                    accountEmail.length !== 0 &&
                    !verifyEmail(accountEmail)
                  }
                >
                  <FormControl.Label
                    _text={{ color: 'brand.white' }}
                  >
                    <HStack
                      justifyContent={'space-between'}
                      space={4}
                      width="100%"
                    >
                      <Text color="brand.white">
                        Email Address:
                      </Text>
                      <Link
                        variant="green"
                        onPress={() => {
                          const navParams = {
                            ...route.params
                          };

                          clearParams();
                          navigation.navigate(
                            'Create An Account',
                            {
                              screen: 'SignUp',
                              params: navParams
                            }
                          );
                        }}
                      >
                        Sign Up
                      </Link>
                    </HStack>
                  </FormControl.Label>
                  <Input
                    placeholder=""
                    onChange={handleEmailChange}
                    autoCapitalize="none"
                    onFocus={() => {
                      setAccountEmail('');
                    }}
                    value={accountEmail}
                    keyboardType={'email-address'}
                    variant={'ecomAuth'}
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
                    Please enter a valid email address.
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isInvalid={incorrectLogin}>
                  <FormControl.Label
                    _text={{ color: 'brand.white' }}
                  >
                    <HStack
                      justifyContent={'space-between'}
                      space={4}
                      width="100%"
                    >
                      <Text color="brand.white">
                        Password:
                      </Text>
                      <Link
                        variant="orange"
                        onPress={() => {
                          navigation.navigate(
                            'ForgotPassword',
                            { isCowork, isPayment }
                          );
                        }}
                      >
                        Forgot Password
                      </Link>
                    </HStack>
                  </FormControl.Label>
                  <Input
                    placeholder=""
                    type={'password'}
                    value={password}
                    onChangeText={setPassword}
                    ref={passwordRef}
                    onFocus={() => {
                      setPassword('');
                      resetIncorrectLogin();
                    }}
                    variant={'ecomAuth'}
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
                    Incorrect information. Please input
                    correct information to continue.
                  </FormControl.ErrorMessage>
                </FormControl>
              </VStack>
            </VStack>
          </VStack>
        </Box>
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
            isDisabled={
              !verifyEmail(accountEmail) ||
              password.length === 0
            }
            variant="purple"
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
            onPress={() => {
              awsSignInEmail(accountEmail, password)
                .then(data => {
                  if (data.attributes) {
                    appContext.setUserData(accountEmail);

                    if (isPayment) {
                      navigation.navigate('ViewTab');
                    } else if (isCowork) {
                      navigation.navigate('Membership');
                    } else {
                      navigation.navigate('Home');
                    }
                  } else {
                    setIncorrectLogin(true);
                    setLoginError(data);
                  }
                })
                /*                 .then(() => {
                  appContext.setUserData(accountEmail);
                }) */

                .catch(error => {
                  console.log('Sign in error', error);
                });
            }}
          >
            LOG IN
          </Button>
        </HStack>
      </HideWhenKeyboardShown>
    </Box>
  );
};
