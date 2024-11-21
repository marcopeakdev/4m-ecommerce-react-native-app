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

import React, { useState, useRef } from 'react';

import AuthButton from '../../components/Auth/AuthButton';
import BrandIcon from '../../components/Auth/BrandIcon';

import AuthHeading from '../../components/Auth/AuthHeading';

import AuthText from '../../components/Auth/AuthText';
import HideWhenKeyboardShown from '../../components/HideWhenKeyboardShown';

export default FPDigitVerifyScreen = (
  { navigation, route },
  props
) => {
  const [invalidNumber, setInvalidNumber] = useState(false);
  const [numberTotal, setNumberTotal] = useState('');

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
      px={4}
      mt={0}
      pt={0}
      justifyContent="space-between"
      safeArea
    >
      <Box
        justifyContent="center"
        alignItems="center"
        mb={100}
      >
        <BrandIcon />
      </Box>

      <Box flex={1} alignItems="center">
        <VStack space={5} alignItems="center">
          <VStack alignItems="center">
            <AuthHeading>Reset Your Password</AuthHeading>
            <AuthText fontsize="sm">
              Please enter the code sent to you and create a
              new password.
            </AuthText>
          </VStack>

          <VStack alignItems="center">
            <VStack width="300" alignItems="center" mt={2}>
              <HStack
                width="100%"
                justifyContent="space-between"
              >
                <Input
                  placeholder="*"
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
                  variant="authSingle"
                />
                <Input
                  placeholder="*"
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
                  variant="authSingle"
                />
                <Input
                  placeholder="*"
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
                  variant="authSingle"
                />
                <Input
                  placeholder="*"
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
                  variant="authSingle"
                />
                <Input
                  placeholder="*"
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
                  variant="authSingle"
                />
                <Input
                  placeholder="*"
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
                  variant="authSingle"
                />
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </Box>

      <HideWhenKeyboardShown
        props={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          space: 4,
          my: 4
        }}
      >
        <HStack space={4}>
          <AuthButton
            onPress={() => {
              navigation.navigate('FPSecureAccount', {
                guest: route.params.guest,
                awsCode: getAllInputs()
              });
            }}
            active={numberTotal >= 6 ? true : false}
          >
            CONTINUE
          </AuthButton>
        </HStack>
      </HideWhenKeyboardShown>
    </Box>
  );
};
