import React, { useState, useRef, useContext } from 'react';

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

import { useFocusEffect } from '@react-navigation/native';

import AuthButton from '../../components/Auth/AuthButton';
import BrandIcon from '../../components/Auth/BrandIcon';

import AuthHeading from '../../components/Auth/AuthHeading';
import AuthHeadingWarning from '../../components/Auth/AuthHeadingWarning';
import AuthText from '../../components/Auth/AuthText';

import { AppContext } from '../../helpers/AppContext';

import {
  awsConfirmSignUpEmail,
  awsResendConfirmationCode,
  awsResendConfirmationCodeEmail,
  awsSignInEmail
} from '../../helpers/awsAuthCalls';

import { API, graphqlOperation } from 'aws-amplify';
import { createAccount } from '../../graphql/mutations';
import HideWhenKeyboardShown from '../../components/HideWhenKeyboardShown';

const DigitVerifyScreen = (
  { navigation, route },
  props
) => {
  const { newAccount, isPayment, screenName, isCowork } =
    route.params ?? {};

  const { setBottomTabHide, setUserData } =
    useContext(AppContext);

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  const handleCreateUser = async () => {
    const payload = {
      email: newAccount.email,
      name: newAccount.name,
      points: 0
    };

    const { data } = await API.graphql(
      graphqlOperation(createAccount, { input: payload })
    )
      /*       .then(() => {
        updateAuthState('loggedIn');
      }) */
      .catch(error => console.log(error));
  };

  const [invalidNumber, setInvalidNumber] = useState(false);
  const [numberTotal, setNumberTotal] = useState('');

  const handleInvalidNumber = props => {
    setInputFirst('*');
    setInputSecond('*');
    setInputThird('*');
    setInputFourth('*');
    setInputFifth('*');
    setInputSixth('*');
    setInvalidNumber(!invalidNumber);
  };

  const resetInvalidNumber = () => {
    setInvalidNumber(false);
  };

  const firstDigit = useRef();
  const secondDigit = useRef();
  const thirdDigit = useRef();
  const fourthDigit = useRef();
  const fifthDigit = useRef();
  const sixthDigit = useRef();

  const [inputFirst, setInputFirst] = useState('');
  const [inputSecond, setInputSecond] = useState('');
  const [inputThird, setInputThird] = useState('');
  const [inputFourth, setInputFourth] = useState('');
  const [inputFifth, setInputFifth] = useState('');
  const [inputSixth, setInputSixth] = useState('');

  const getAllInputs = () => {
    return `${inputFirst}${inputSecond}${inputThird}${inputFourth}${inputFifth}${inputSixth}`;
  };

  const handleFirstInputChange = () => {
    let inputFirstLength = inputFirst.length + 1;

    if (inputFirstLength > 1) {
      inputFirstLength = 1;
    }

    if (inputFirstLength === 1) {
      secondDigit.current.focus();
    }
  };

  const handleSecondInputChange = () => {
    let inputSecondLength = inputSecond.length + 1;

    if (inputSecondLength > 1) {
      inputSecondLength = 1;
    }

    if (inputSecondLength === 1) {
      thirdDigit.current.focus();
    }
  };

  const handleThirdInputChange = () => {
    let inputThirdLength = inputThird.length + 1;

    if (inputThirdLength > 1) {
      inputThirdLength = 1;
    }

    if (inputThirdLength === 1) {
      fourthDigit.current.focus();
    }
  };

  const handleFourthInputChange = () => {
    let inputFourthLength = inputFourth.length + 1;

    if (inputFourthLength > 1) {
      inputFourth = 1;
    }

    if (inputFourthLength === 1) {
      fifthDigit.current.focus();
    }
  };

  const handleFifthInputChange = () => {
    let inputFifthLength = inputFifth.length + 1;

    if (inputFifthLength > 1) {
      inputFifth = 1;
    }

    if (inputFifthLength === 1) {
      sixthDigit.current.focus();
    }
  };

  const handleSixthInputChange = () => {
    let inputSixthLength = inputSixth.length + 1;

    if (inputSixthLength > 1) {
      inputSixth = 1;
    }

    if (inputSixthLength === 1) {
      sixthDigit.current.blur();
    }
  };

  const handleOnBlur = () => {
    setNumberTotal(
      inputFirst.length +
        inputSecond.length +
        inputThird.length +
        inputFourth.length +
        inputFifth.length +
        inputSixth.length
    );
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
          <VStack alignItems="center">
            <AuthHeading>Verification</AuthHeading>
            <AuthText>
              Please verify your account by inputing the
              code sent to you. If you didn't receive a
              code, please press resend.
            </AuthText>
          </VStack>

          <VStack justifyContent="center">
            <VStack alignItems="center" mt={2} width="100%">
              <FormControl alignItems="center">
                <FormControl.Label
                  _text={{ color: 'brand.white' }}
                  width="100%"
                >
                  <HStack
                    justifyContent={'space-between'}
                    space={4}
                    width="100%"
                  >
                    <Text color="brand.white">
                      Verification Number
                    </Text>
                    <Link
                      variant="orange"
                      onPress={() => {}}
                    >
                      Resend
                    </Link>
                  </HStack>
                </FormControl.Label>
                <HStack
                  width="100%"
                  justifyContent="space-between"
                >
                  <Input
                    placeholder="#"
                    value={inputFirst}
                    onChangeText={setInputFirst}
                    onChange={handleFirstInputChange}
                    maxLength={1}
                    ref={firstDigit}
                    keyboardType="number-pad"
                    onFocus={() => {
                      setInputFirst('');
                      resetInvalidNumber();
                    }}
                    onBlur={handleOnBlur}
                    selectionColor="white"
                    variant="ecomAuth"
                    width="14%"
                    borderColor={
                      inputFirst.length === 1
                        ? 'brand.green'
                        : 'brand.white'
                    }
                  />
                  <Input
                    placeholder="#"
                    value={inputSecond}
                    onChangeText={setInputSecond}
                    onChange={handleSecondInputChange}
                    maxLength={1}
                    ref={secondDigit}
                    keyboardType="number-pad"
                    onFocus={() => {
                      setInputSecond('');
                      resetInvalidNumber();
                    }}
                    onBlur={handleOnBlur}
                    selectionColor="white"
                    variant="ecomAuth"
                    width="14%"
                    borderColor={
                      inputSecond.length === 1
                        ? 'brand.green'
                        : 'brand.white'
                    }
                  />
                  <Input
                    placeholder="#"
                    value={inputThird}
                    onChangeText={setInputThird}
                    onChange={handleThirdInputChange}
                    maxLength={1}
                    ref={thirdDigit}
                    keyboardType="number-pad"
                    onFocus={() => {
                      setInputThird('');
                      resetInvalidNumber();
                    }}
                    onBlur={handleOnBlur}
                    selectionColor="white"
                    variant="ecomAuth"
                    width="14%"
                    borderColor={
                      inputThird.length === 1
                        ? 'brand.green'
                        : 'brand.white'
                    }
                  />
                  <Input
                    placeholder="#"
                    value={inputFourth}
                    onChangeText={setInputFourth}
                    onChange={handleFourthInputChange}
                    maxLength={1}
                    ref={fourthDigit}
                    keyboardType="number-pad"
                    onFocus={() => {
                      setInputFourth('');
                      resetInvalidNumber();
                    }}
                    onBlur={handleOnBlur}
                    selectionColor="white"
                    variant="ecomAuth"
                    width="14%"
                    borderColor={
                      inputFourth.length === 1
                        ? 'brand.green'
                        : 'brand.white'
                    }
                  />
                  <Input
                    placeholder="#"
                    value={inputFifth}
                    onChangeText={setInputFifth}
                    onChange={handleFifthInputChange}
                    maxLength={1}
                    ref={fifthDigit}
                    keyboardType="number-pad"
                    onFocus={() => {
                      setInputFifth('');
                      resetInvalidNumber();
                    }}
                    onBlur={handleOnBlur}
                    selectionColor="white"
                    variant="ecomAuth"
                    width="14%"
                    borderColor={
                      inputFifth.length === 1
                        ? 'brand.green'
                        : 'brand.white'
                    }
                  />
                  <Input
                    placeholder="#"
                    value={inputSixth}
                    onChangeText={setInputSixth}
                    onChange={handleSixthInputChange}
                    maxLength={1}
                    ref={sixthDigit}
                    keyboardType="number-pad"
                    onFocus={() => {
                      setInputSixth('');
                      resetInvalidNumber();
                    }}
                    onBlur={handleOnBlur}
                    selectionColor="white"
                    variant="ecomAuth"
                    width="14%"
                    borderColor={
                      inputSixth.length === 1
                        ? 'brand.green'
                        : 'brand.white'
                    }
                  />
                </HStack>
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
            isDisabled={getAllInputs().length !== 6}
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
            onPress={() => {
              awsConfirmSignUpEmail(
                newAccount.email,
                getAllInputs()
              )
                .then(success => {
                  if (
                    success
                      .toString()
                      .includes('CodeMismatchException')
                  ) {
                    throw 'Mismatch Error';
                  }

                  handleCreateUser();

                  awsSignInEmail(
                    newAccount.email,
                    newAccount.password
                  )
                    .then(data => {
                      try {
                        setUserData(newAccount.email);
                      } catch (error) {
                        console.log(
                          'error setting user data',
                          error
                        );
                      }

                      if (isPayment) {
                        navigation.navigate('ViewTab', {
                          screen: 'PaymentMethods',
                          params: {
                            isPayment,
                            isCowork,
                            screenName
                          }
                        });
                      } else if (isCowork) {
                        navigation.navigate('Cowork', {
                          screen: 'Membership'
                        });
                      } else {
                        navigation.navigate('Home');
                      }
                    })
                    .catch(error => {
                      console.log(error);
                    });
                })
                .catch(error => {
                  console.log(error);
                });
            }}
          >
            CONTINUE
          </Button>
        </HStack>
      </HideWhenKeyboardShown>
    </Box>
  );
};

export default DigitVerifyScreen;
