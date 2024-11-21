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
  FormControl
} from 'native-base';

import React, {
  useState,
  useRef,
  useEffect,
  useContext
} from 'react';
import AuthButton from '../../components/Auth/AuthButton';
import BrandIcon from '../../components/Auth/BrandIcon';

import AuthCenter from '../../components/Auth/AuthCenter';
import AuthHeading from '../../components/Auth/AuthHeading';
import AuthHeadingWarning from '../../components/Auth/AuthHeadingWarning';
import AuthText from '../../components/Auth/AuthText';

import {
  awsForgotPassword,
  awsForgotPasswordEmail
} from '../../helpers/awsAuthCalls';
import { getGuestByPhoneGuesty } from '../../helpers/guestyApiCalls';
import HideWhenKeyboardShown from '../../components/HideWhenKeyboardShown';
import { API, graphqlOperation } from 'aws-amplify';
import { listAccounts } from '../../graphql/queries';

import EmergencyIcon from '../../../assets/icons/EmergencyIcon-v2';
import { verifyEmail } from '../../helpers/formatStrings';
import Banner from '../../components/Banner';
import { AppContext } from '../../helpers/AppContext';
import { useFocusEffect } from '@react-navigation/native';

export default ForgotPasswordScreen = (
  { navigation, route },
  props
) => {
  const { setBottomTabHide } = useContext(AppContext);
  const { isPayment, screenName, isCowork } =
    route.params ?? {};

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  const [invalidNumber, setInvalidNumber] = useState(false);

  const [accountEmail, setAccountEmail] = useState('');

  const [emailFound, setEmailFound] = useState(true);

  const handleEmailChange = event => {
    setAccountEmail(event.nativeEvent.text);
  };

  const handleInvalidNumber = () => {
    setNumberAreaCode('# # #');
    setNumberPrefix('# # #');
    setNumberLast('# # # #');
    setInvalidNumber(!invalidNumber);
  };

  const resetInvalidNumber = () => {
    setInvalidNumber(false);
  };

  const areaCodeRef = useRef();
  const prefixRef = useRef();
  const lastRef = useRef();

  const [numberAreaCode, setNumberAreaCode] = useState('');
  const [numberPrefix, setNumberPrefix] = useState('');
  const [numberLast, setNumberLast] = useState('');

  const handleAreaCodeInputChange = () => {
    let areaCodeLength = numberAreaCode.length + 1;

    if (areaCodeLength > 3) {
      areaCodeLength = 3;
    }

    if (areaCodeLength === 3) {
      prefixRef.current.focus();
    }
  };

  const handlePrefixInputChange = () => {
    let prefixLength = numberPrefix.length + 1;

    if (prefixLength > 3) {
      prefixLength = 3;
    }

    if (prefixLength === 3) {
      lastRef.current.focus();
    }
  };

  const handleLastInputChange = () => {
    let lastLength = numberLast.length + 1;

    if (lastLength > 4) {
      LastLength = 4;
    }

    if (lastLength === 4) {
      lastRef.current.blur();
    }
  };

  return (
    <VStack
      borderWidth={0}
      flex={1}
      px={0}
      mt={0}
      pt={0}
      justifyContent="space-between"
      safeArea
    >
      <Banner
        heading="Email address not found."
        icon={<EmergencyIcon size="sm" />}
        color="brand.error"
        show={!emailFound}
      />

      <Box justifyContent="center" alignItems="center">
        <BrandIcon size={100} />
      </Box>

      <Center flex={1} alignItems="center" px={4}>
        <VStack
          space={6}
          alignItems="center"
          width="100%"
          mb={20}
        >
          <VStack alignItems="center" space="2">
            <AuthHeading>Forgot Password?</AuthHeading>
            <AuthText>
              Please enter the email affiliated with your
              account.
            </AuthText>
          </VStack>

          <VStack width="100%" alignItems="center">
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
                      navigation.navigate('Login', {
                        screen: 'UserLogin',
                        params: {
                          screenName,
                          isPayment: isPayment ?? false,
                          isCowork: isCowork ?? false
                        }
                      });
                    }}
                  >
                    Log In
                  </Link>
                </HStack>
              </FormControl.Label>
              <Input
                placeholder="email@gmail.com"
                keyboardType="email-address"
                onChange={handleEmailChange}
                onFocus={() => {
                  setAccountEmail('');
                }}
                value={accountEmail}
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
        <HStack space={4} px={4}>
          <Button
            isDisabled={!verifyEmail(accountEmail)}
            variant="purple"
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
            onPress={async () => {
              const { data } = await API.graphql(
                graphqlOperation(listAccounts, {
                  filter: {
                    email: {
                      eq: accountEmail.toLowerCase()
                    }
                  }
                })
              );

              if (
                accountEmail.toLowerCase() ===
                data?.listAccounts?.items[0]?.email
              ) {
                // Email entered matches an existing account, proceed to forgot password flow

                awsForgotPasswordEmail(
                  accountEmail.toLowerCase()
                );
                navigation.navigate('FPDigitVerify', {
                  email: accountEmail.toLowerCase(),
                  awsCode: '',
                  isPayment,
                  isCowork
                });
              } else {
                // Email entered does not match an existing account, let guest know
                setEmailFound(false);
              }

              /* getGuestByPhoneGuesty(accountEmail)
                .then(data => {
                  // If data array is empty, then no Guest was found
                  if (data.length === 0) {
                    handleInvalidNumber();
                  } else {
                    awsForgotPasswordEmail(accountEmail);
                    navigation.navigate('FPDigitVerify', {
                      guest: data[0]
                    });
                  }
                })
                .catch(error => {
                  console.log(error);
                }); */
            }}
          >
            NEXT
          </Button>
        </HStack>
      </HideWhenKeyboardShown>
    </VStack>
  );
};
