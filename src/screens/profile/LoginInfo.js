import React, { useState, useContext, useRef } from 'react';

import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  ScrollView,
  Text,
  useColorModeValue,
  useToast,
  VStack
} from 'native-base';

import { API, Auth, graphqlOperation } from 'aws-amplify';
import { useFocusEffect } from '@react-navigation/native';

import { AppContext } from '../../helpers/AppContext';
import { verifyEmail } from '../../helpers/formatStrings';
import { updateAccount } from '../../graphql/mutations';

const LoginInfo = () => {
  const { setBottomTabHide } = useContext(AppContext);

  const toast = useToast();
  const emailUpdatedToast = {
    title: 'Email Updated',
    placement: 'bottom',
    render: () => {
      return (
        <Box
          bg="brand.green"
          px="4"
          py="4"
          rounded="sm"
          mb="5"
        >
          <Text bold color="brand.white">
            Email Updated!
          </Text>
        </Box>
      );
    }
  };

  const passwordUpdatedToast = {
    title: 'Password Updated',
    placement: 'bottom',
    render: () => {
      return (
        <Box
          bg="brand.green"
          px="4"
          py="4"
          rounded="sm"
          mb="5"
        >
          <Text bold color="brand.white">
            Password Updated!
          </Text>
        </Box>
      );
    }
  };

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  const { user } = useContext(AppContext);
  const { email, id } = user;

  const [invalidPassword, setInvalidPassword] =
    useState(false);
  const [mismatchedPassword, setMismatchedPassword] =
    useState(false);
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [existingPassword, setExistingPassword] =
    useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [accountEmail, setAccountEmail] = useState('');
  const [expectingVerification, setExpectingVerification] =
    useState(false);

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

  const resetVerificationInputs = props => {
    setInputFirst('#');
    setInputSecond('#');
    setInputThird('#');
    setInputFourth('#');
    setInputFifth('#');
    setInputSixth('#');
  };

  const handleOnBlur = () => {};

  const handleEmailChange = event => {
    setAccountEmail(event.nativeEvent.text);
  };

  const handleExistingPasswordChange = event => {
    setExistingPassword(event.nativeEvent.text);
  };

  const handleFirstPasswordChange = event => {
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

  const handleSecondPasswordChange = event => {
    setSecondPassword(event.nativeEvent.text);
    if (firstPassword === event.nativeEvent.text) {
      setValidPassword(true);
    }
  };

  const handleSecondPasswordBlur = () => {
    if (!(firstPassword === secondPassword)) {
      setMismatchedPassword(true);
    } else {
      setValidPassword(true);
    }
  };

  const resetInvalidPassword = () => {
    setInvalidPassword(false);
  };

  const resetMismatchedPassword = () => {
    setMismatchedPassword(false);
  };

  const handleChangePassword = () => {
    if (!invalidPassword && !mismatchedPassword) {
      Auth.currentAuthenticatedUser()
        .then(user => {
          return Auth.changePassword(
            user,
            existingPassword,
            secondPassword
          );
        })
        .then(data => {
          toast.show(passwordUpdatedToast);
          setExistingPassword('');
          setFirstPassword('');
          setSecondPassword('');
        })
        .catch(error => {
          console.log('error', error);
        });
    } else {
      console.log('Invalid Password:', !invalidPassword);
      console.log(
        'Mismatched Password',
        !mismatchedPassword
      );
    }
  };

  const startChangeEmailRequest = async () => {
    try {
      const cognitoUser =
        await Auth.currentAuthenticatedUser();
      const updateResult = await Auth.updateUserAttributes(
        cognitoUser,
        { email: accountEmail }
      );

      setExpectingVerification(true);
    } catch (error) {
      console.log('Error with startChangeRequest', error);
    }
  };

  const completeChangeEmailRequest = async () => {
    try {
      const verificationResult =
        await Auth.verifyCurrentUserAttributeSubmit(
          'email',
          getAllInputs()
        );

      const { data } = await API.graphql(
        graphqlOperation(updateAccount, {
          input: {
            id: id,
            email: accountEmail
          }
        })
      );

      setExpectingVerification(false);
      toast.show(emailUpdatedToast);
    } catch (error) {
      resetVerificationInputs();
      console.log(
        'Error with completeChangeRequest',
        error
      );
    }
  };

  return (
    <Box
      borderWidth={0}
      flex={1}
      pt={10}
      mt={10}
      px={4}
      justifyContent="space-between"
      safeArea
    >
      <ScrollView>
        <VStack space={4} width="100%" mb="4">
          <Heading
            variant="captionTitle"
            fontSize="md"
            borderColor={useColorModeValue(
              'brand.dark',
              'brand.lightgrey'
            )}
          >
            Update Email
          </Heading>

          <VStack justifyContent="center" width="100%">
            <VStack
              width="100%"
              alignItems="center"
              space="4"
            >
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  placeholder={
                    email ? email : 'Email Address'
                  }
                  onChange={handleEmailChange}
                  onFocus={() => {
                    setAccountEmail('');
                  }}
                  value={accountEmail}
                  variant={'ecomInput'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  isDisabled={expectingVerification}
                />
              </FormControl>

              {expectingVerification && (
                <VStack
                  alignItems="center"
                  mt={2}
                  width="100%"
                  px={2}
                >
                  <FormControl
                    alignItems="center"
                    isInvalid={expectingVerification}
                  >
                    <FormControl.Label
                      _text={{ color: 'brand.white' }}
                      width="100%"
                    >
                      <HStack
                        justifyContent={'space-between'}
                        space={4}
                        width="100%"
                      >
                        <Text>Verification Number</Text>
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
                        }}
                        onBlur={handleOnBlur}
                        selectionColor="white"
                        variant="ecomInput"
                        width="14%"
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
                        }}
                        onBlur={handleOnBlur}
                        selectionColor="white"
                        variant="ecomInput"
                        width="14%"
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
                        }}
                        onBlur={handleOnBlur}
                        selectionColor="white"
                        variant="ecomInput"
                        width="14%"
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
                        }}
                        onBlur={handleOnBlur}
                        selectionColor="white"
                        variant="ecomInput"
                        width="14%"
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
                        }}
                        onBlur={handleOnBlur}
                        selectionColor="white"
                        variant="ecomInput"
                        width="14%"
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
                        }}
                        onBlur={handleOnBlur}
                        selectionColor="white"
                        variant="ecomInput"
                        width="14%"
                      />
                    </HStack>
                    <FormControl.ErrorMessage>
                      Please enter the 6-Digit Verification
                      code emailed to you.
                    </FormControl.ErrorMessage>
                  </FormControl>
                </VStack>
              )}

              {!expectingVerification && (
                <Button
                  variant="purple"
                  width="45%"
                  _text={{ color: 'brand.dark' }}
                  isDisabled={!verifyEmail(accountEmail)}
                  onPress={startChangeEmailRequest}
                  _disabled={{
                    bg: 'brand.lightGrayOnBlack',
                    opacity: 1,
                    _text: { opacity: 0.4 }
                  }}
                >
                  SAVE
                </Button>
              )}
              {expectingVerification && (
                <Button
                  variant="purple"
                  width="45%"
                  _text={{ color: 'brand.dark' }}
                  isDisabled={getAllInputs().length !== 6}
                  onPress={() =>
                    completeChangeEmailRequest()
                  }
                  _disabled={{
                    bg: 'brand.lightGrayOnBlack',
                    opacity: 1,
                    _text: { opacity: 0.4 }
                  }}
                >
                  CONFIRM
                </Button>
              )}
            </VStack>
          </VStack>

          <Heading
            variant="captionTitle"
            fontSize="md"
            borderColor={useColorModeValue(
              'brand.dark',
              'brand.lightgrey'
            )}
            mt={10}
          >
            Change Password
          </Heading>

          <VStack justifyContent="center" width="100%">
            <FormControl>
              <FormControl.Label>
                Current Password
              </FormControl.Label>
              <Input
                placeholder="Current Password"
                value={existingPassword}
                onChange={handleExistingPasswordChange}
                type={'password'}
                onFocus={() => {
                  setExistingPassword('');
                }}
                variant={'ecomInput'}
                autoCapitalize="none"
              />
            </FormControl>
          </VStack>
          <VStack
            alignItems="center"
            width="100%"
            space={4}
          >
            <FormControl>
              <FormControl.Label>
                New Password
              </FormControl.Label>
              <Input
                placeholder="New Password"
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
                variant={'ecomInput'}
                autoCapitalize="none"
              />
            </FormControl>

            <FormControl isInvalid={mismatchedPassword}>
              <Input
                placeholder="Re - enter Password"
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
                variant={'ecomInput'}
                autoCapitalize="none"
              />
              <FormControl.ErrorMessage>
                Please be sure passwords match.
              </FormControl.ErrorMessage>
            </FormControl>
            <Button
              variant="purple"
              width="45%"
              _text={{ color: 'brand.dark' }}
              isDisabled={
                !validPassword ||
                mismatchedPassword ||
                existingPassword.length < 1
              }
              onPress={handleChangePassword}
              _disabled={{
                bg: 'brand.lightGrayOnBlack',
                opacity: 1,
                _text: { opacity: 0.4 }
              }}
            >
              SAVE
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default LoginInfo;
