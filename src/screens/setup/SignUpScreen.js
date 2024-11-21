import React, {
  useState,
  useRef,
  useContext,
  useEffect
} from 'react';

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
  FormControl,
  Checkbox,
  ChevronLeftIcon,
  Pressable
} from 'native-base';

import AuthButton from '../../components/Auth/AuthButton';
import AuthHeading from '../../components/Auth/AuthHeading';
import AuthHeadingWarning from '../../components/Auth/AuthHeadingWarning';
import AuthText from '../../components/Auth/AuthText';

import BrandLogo from '../../components/Auth/BrandLogo';

import {
  getGuestByPhoneGuesty,
  getReservationsByPhoneGuesty,
  getReservationByIDGuesty
} from '../../helpers/guestyApiCalls';
import GuestStateContext from '../../helpers/GuestStateContext';
import HideWhenKeyboardShown from '../../components/HideWhenKeyboardShown';
import { API, graphqlOperation } from 'aws-amplify';
import {
  listAccounts,
  listUsers
} from '../../graphql/queries';
import { createAccount } from '../../graphql/mutations';

import BrandIcon from '../../components/Auth/BrandIcon';
import EmergencyIcon from '../../../assets/icons/EmergencyIcon-v2';
import { verifyEmail } from '../../helpers/formatStrings';
import InfoIcon from '../../../assets/icons/InfoIcon-v2';
import { useFocusEffect } from '@react-navigation/native';
import { AppContext } from '../../helpers/AppContext';

const SignUpScreen = ({ navigation, route }, props) => {
  const { isPayment, screenName, isCowork } =
    route.params ?? {};
  const { setBottomTabHide } = useContext(AppContext);

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  const guestState = useContext(GuestStateContext);

  const [invalidNumber, setInvalidNumber] = useState(false);

  const [name, setName] = useState('');
  const [showNameWarning, setShowNameWarning] =
    useState(false);
  const [accountEmail, setAccountEmail] = useState('');
  const [showEmailWarning, setShowEmailWarning] =
    useState(false);

  const handleNameChange = event => {
    setName(event.nativeEvent.text);
  };

  const nameOnFocus = () => {
    setShowNameWarning(false);
  };

  const nameOnBlur = () => {
    if (name.length < 3 && name.length !== 0)
      setShowNameWarning(true);
  };

  const handleEmailChange = event => {
    setAccountEmail(event.nativeEvent.text);
  };

  const handleInvalidNumber = props => {
    resetState();
    setInvalidNumber(!invalidNumber);
  };

  const emailOnFocus = () => {
    setShowNameWarning(false);
  };

  const emailOnBlur = () => {
    if (verifyEmail(accountEmail))
      setShowEmailWarning(true);
  };

  const resetState = () => {
    setNumberAreaCode('');
    setNumberPrefix('');
    setNumberLast('');
    setNumberTotal(0);
  };

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
            <AuthHeading>Let's get started!</AuthHeading>
            <AuthText>
              Please provide your name and email address to
              create an account
            </AuthText>
          </VStack>

          <VStack
            width="100%"
            alignItems="center"
            space={6}
          >
            <FormControl isInvalid={showNameWarning}>
              <FormControl.Label
                _text={{ color: 'brand.white' }}
              >
                <HStack
                  justifyContent={'space-between'}
                  space={4}
                  width="100%"
                >
                  <Text color="brand.white">
                    Your Name:
                  </Text>
                  <Link
                    variant="green"
                    onPress={() => {
                      const navParams = { ...route.params };
                      clearParams();
                      navigation.navigate('Login', {
                        screen: 'UserLogin',
                        params: navParams
                      });
                    }}
                  >
                    Log In
                  </Link>
                </HStack>
              </FormControl.Label>
              <Input
                placeholder=""
                onChange={handleNameChange}
                onFocus={nameOnFocus}
                onBlur={nameOnBlur}
                value={name}
                variant={'ecomAuth'}
                borderColor={
                  name.length === 0
                    ? 'brand.white'
                    : showNameWarning
                    ? 'brand.webRed'
                    : 'brand.green'
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
                Please enter your full name.
              </FormControl.ErrorMessage>
            </FormControl>
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
                    Your Email Address:
                  </Text>
                </HStack>
              </FormControl.Label>
              <Input
                placeholder=""
                onChange={handleEmailChange}
                autoCapitalize="none"
                onFocus={emailOnFocus}
                onBlur={emailOnBlur}
                value={accountEmail}
                keyboardType={'email-address'}
                variant={'ecomAuth'}
                borderColor={
                  verifyEmail(accountEmail)
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
                Please enter a valid email address.
              </FormControl.ErrorMessage>
            </FormControl>
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
        <VStack space={4} px={4} width="100%">
          <Button
            isDisabled={
              !verifyEmail(accountEmail) ||
              name.length === 0 ||
              name.length < 3
            }
            variant="purple"
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
            onPress={async () => {
              const newAccount = {
                email: accountEmail.toLowerCase(),
                name: name,
                password: ''
              };

              const { data } = await API.graphql(
                graphqlOperation(listAccounts, {
                  filter: {
                    email: {
                      eq: newAccount.email
                    }
                  }
                })
              );

              if (data.listAccounts.items.length === 0) {
                navigation.navigate('SecureAccount', {
                  newAccount,
                  isPayment: isPayment ?? false,
                  isCowork: isCowork ?? false,
                  screenName
                });
              } else {
                navigation.navigate('Login', {
                  screen: 'UserLogin',
                  params: {
                    screenName,
                    isPayment: isPayment ?? false,
                    isCowork: isCowork ?? false
                  }
                });
              }
            }}
            active={true}
          >
            NEXT
          </Button>
        </VStack>
      </HideWhenKeyboardShown>
    </Box>
  );
};

export default SignUpScreen;
