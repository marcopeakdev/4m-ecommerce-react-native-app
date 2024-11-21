import React, {
  useState,
  useRef,
  useContext,
  useEffect
} from 'react';

import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Text,
  useColorModeValue,
  useTheme,
  useToast,
  VStack
} from 'native-base';

import {
  splitFullName,
  splitExpDate,
  verifyCCNumber,
  verifyExpDate,
  verifyCVV,
  verifyZip
} from '../helpers/formatStrings';
import { postCreateCreditCard } from '../helpers/spreedlyAPICalls';
import { AppContext } from '../helpers/AppContext';

const NewCardForm = props => {
  const {
    setCardAdded,
    cardAdded,
    setFirstPrimary,
    cardDetail,
    setCardDetail,
    param,
    navToPaymentType
  } = props;
  const { colors } = useTheme();

  const { user } = useContext(AppContext);

  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [zip, setZip] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [cardNumberError, setCardNumberError] =
    useState(false);
  const [expOrCvvError, setExpOrCvvError] = useState(false);

  const toast = useToast();
  const cardAddToast = {
    title: 'Card Added!',
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
            Card Added!
          </Text>
        </Box>
      );
    }
  };

  const clearState = () => {
    setNameOnCard('');
    setCardNumber('');
    setExpDate('');
    setCvv('');
    setZip('');
    setCardNumberError(false);
    setExpOrCvvError(false);
    setCardDetail({
      holderName: '',
      cardNumber: '',
      expiry: ''
    });
  };

  const handleAddCard = () => {
    const names = splitFullName(nameOnCard);
    const dates = splitExpDate(expDate);

    const paymentData = {
      payment_method: {
        credit_card: {
          first_name: names[0],
          last_name: names[1],
          month: dates[0],
          year: dates[1],
          verification_value: cvv,
          number: cardNumber,
          zip: zip,
          billingAddress: {
            postalCode: zip,
            country: 'USA'
          }
        },
        email: user.email,
        retained: true,
        metadata: {
          userId: user.id,
          email: user.email,
          first_name: names[0],
          last_name: names[1],
          month: dates[0],
          year: dates[1],
          verification_value: cvv,
          zip
        }
      }
    };

    postCreateCreditCard(paymentData)
      .then(data => {
        console.log('Create Credit Card Response', data);
        clearState();
        if (cardAdded === 0) {
          // set as primary
          setFirstPrimary(data);
        }
        setCardAdded(cardAdded + 1);
        toast.show(cardAddToast);

        if (param?.isPayment) {
          navToPaymentType();
        }
      })
      .catch(error => {
        console.log('Error with Post Credit Card Payment');
        console.log(error);
      });
  };

  const handleExpDate = e => {
    let newDate = e.nativeEvent.text;

    if (expDate.length === 1 && newDate.length === 2) {
      // The first character of the year was entered, add '/' after second character

      newDate = `${newDate.substring(0, 2)}/`;
    }

    setCardDetail({ ...cardDetail, expiry: newDate });
    setExpDate(newDate);
  };

  const isInfoAllValid = () => {
    return (
      isNameValid() &&
      verifyCCNumber(cardNumber) &&
      verifyExpDate(expDate) &&
      verifyCVV(cvv) &&
      verifyZip(zip)
    );
  };

  const isNameValid = () => {
    return nameOnCard.length > 2;
  };

  const isExpDateValid = () => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    const dates = splitExpDate(expDate);

    if (
      parseInt(dates[1]) > year ||
      (parseInt(dates[1]) === year &&
        parseInt(dates[0]) >= month)
    ) {
      // In the future!
      return true;
    } else {
      // Not in the future!
      return false;
    }
  };

  const expOrCvvOnBlur = () => {
    if (
      expDate.length !== 0 &&
      cvv.length !== 0 &&
      zip.length !== 0 &&
      isExpDateValid() &&
      verifyExpDate(expDate) &&
      verifyCVV(cvv) &&
      verifyZip(zip)
    ) {
      setExpOrCvvError(false);
    } else {
      setExpOrCvvError(true);
    }
  };

  const expOnBlur = () => {
    if (
      expDate.length !== 0 &&
      isExpDateValid() &&
      verifyExpDate(expDate)
    ) {
      setExpOrCvvError(false);
    } else {
      setExpOrCvvError(true);
    }
  };

  const cvvOnBlur = () => {
    if (cvv.length !== 0 && verifyCVV(cvv)) {
      setExpOrCvvError(false);
    } else {
      setExpOrCvvError(true);
    }
  };

  const zipOnBlur = () => {
    if (zip.length !== 0 && verifyZip(zip)) {
      setExpOrCvvError(false);
    } else {
      setExpOrCvvError(true);
    }
  };

  const cardNumberOnBlur = () => {
    if (
      cardNumber.length !== 0 &&
      !verifyCCNumber(cardNumber)
    ) {
      setCardNumberError(true);
    } else {
      setCardNumberError(false);
    }
  };

  return (
    <ScrollView mt="4" _contentContainerStyle={{ flex: 1 }}>
      <VStack
        flex="1"
        space="4"
        justifyContent="space-around"
        px={4}
      >
        <VStack space="4" flex="1">
          <Box width="100%">
            <FormControl>
              <FormControl.Label>
                Name on Credit Card
              </FormControl.Label>
              <Input
                defaultText="Name"
                placeholder="Name"
                value={nameOnCard}
                name={'nameOnCard'}
                onChangeText={newText => {
                  setNameOnCard(newText);
                  setCardDetail({
                    ...cardDetail,
                    holderName: newText
                  });
                }}
                borderWidth="2"
                borderColor={
                  0 > 0
                    ? 'brand.green'
                    : useColorModeValue(
                        'brand.dark',
                        'brand.white'
                      )
                }
                width="100%"
                _focus={{
                  borderColor: colors.brand.green
                }}
              />
              <FormControl.ErrorMessage
                _text={{ color: 'brand.dark' }}
                backgroundColor="#FF8888"
                p="3"
              >
                Please enter the name on the credit card.
              </FormControl.ErrorMessage>
            </FormControl>
          </Box>
          <Box width="100%">
            <FormControl isInvalid={cardNumberError}>
              <FormControl.Label>
                Credit Card Number
              </FormControl.Label>
              <Input
                defaultText="**** **** **** ****"
                placeholder="**** **** **** ****"
                keyboardType="number-pad"
                value={cardNumber}
                name={'cardNumber'}
                onChangeText={newText => {
                  setCardNumber(newText);
                  setCardDetail({
                    ...cardDetail,
                    cardNumber: newText
                  });
                }}
                onBlur={cardNumberOnBlur}
                secureTextEntry
                maxLength={19}
                borderWidth="2"
                borderColor={
                  verifyCCNumber(cardNumber)
                    ? 'brand.green'
                    : cardNumber.length === 0
                    ? useColorModeValue(
                        'brand.dark',
                        'brand.white'
                      )
                    : 'red.500'
                }
                width="100%"
                _focus={{
                  borderColor: colors.brand.green
                }}
              />
              <FormControl.ErrorMessage
                _text={{ color: 'brand.dark' }}
                backgroundColor="#FF8888"
                p="3"
              >
                Are you sure that is a valid credit card
                number?
              </FormControl.ErrorMessage>
            </FormControl>
          </Box>
          <HStack
            justifyContent={'space-around'}
            width="100%"
          >
            <FormControl isInvalid={expOrCvvError}>
              <VStack width="100%">
                <HStack justifyContent="space-between">
                  <VStack alignItems={'flex-start'}>
                    <FormControl.Label mx="0">
                      Zip Code
                    </FormControl.Label>
                    <Input
                      defaultText="-----"
                      placeholder="-----"
                      keyboardType="number-pad"
                      value={zip}
                      name={'zip'}
                      onChangeText={newText => {
                        setZip(newText);
                        setCardDetail({
                          ...cardDetail,
                          zip: newText
                        });
                      }}
                      onBlur={zipOnBlur}
                      maxLength={7}
                      borderWidth="2"
                      width="100%"
                      borderColor={
                        verifyExpDate(expDate)
                          ? 'brand.green'
                          : expDate.length === 0
                          ? useColorModeValue(
                              'brand.dark',
                              'brand.white'
                            )
                          : 'red.500'
                      }
                      textAlign={'center'}
                      _focus={{
                        borderColor: 'brand.green'
                      }}
                    />
                  </VStack>
                  <VStack alignItems={'flex-start'}>
                    <FormControl.Label mx="0">
                      Expiration Date
                    </FormControl.Label>
                    <Input
                      defaultText="mm/yyyy"
                      placeholder="mm/yyyy"
                      keyboardType="number-pad"
                      value={expDate}
                      name={'expDate'}
                      onChange={e => handleExpDate(e)}
                      onBlur={expOnBlur}
                      maxLength={7}
                      borderWidth="2"
                      width="100%"
                      borderColor={
                        verifyExpDate(expDate)
                          ? 'brand.green'
                          : expDate.length === 0
                          ? useColorModeValue(
                              'brand.dark',
                              'brand.white'
                            )
                          : 'red.500'
                      }
                      textAlign={'center'}
                      _focus={{
                        borderColor: 'brand.green'
                      }}
                    />
                  </VStack>
                  <VStack alignItems={'flex-start'}>
                    <FormControl.Label mx="0">
                      CVV
                    </FormControl.Label>
                    <Input
                      defaultText="***"
                      placeholder="***"
                      keyboardType="number-pad"
                      value={cvv}
                      name="cvv"
                      onChangeText={newText => {
                        setCvv(newText);
                        setCardDetail({
                          ...cardDetail,
                          cvc: newText
                        });
                      }}
                      onBlur={cvvOnBlur}
                      secureTextEntry
                      maxLength={4}
                      _text={{
                        color: useColorModeValue(
                          'brand.lightGray',
                          'brand.white'
                        )
                      }}
                      width="100%"
                      borderWidth="2"
                      borderColor={
                        verifyCVV(cvv)
                          ? 'brand.green'
                          : cardNumber.length === 0
                          ? useColorModeValue(
                              'brand.dark',
                              'brand.white'
                            )
                          : 'red.500'
                      }
                      textAlign="center"
                      _focus={{
                        borderColor: colors.brand.green
                      }}
                    />
                  </VStack>
                </HStack>
                <FormControl.ErrorMessage
                  _text={{ color: 'brand.white' }}
                  backgroundColor="#FF8888"
                  p="3"
                >
                  {!verifyExpDate(expDate) &&
                    `Expiration date must be in mm/yyyy format.`}
                  {!verifyCVV(cvv) &&
                    `Please enter the verification code for your card.`}
                  {!verifyZip(zip) &&
                    `Please enter the billing zip code for your card.`}
                </FormControl.ErrorMessage>
              </VStack>
            </FormControl>
          </HStack>
        </VStack>
      </VStack>
      <VStack mt="0" mb="10" space="4" px="4">
        <Button
          variant="purple"
          isDisabled={!isInfoAllValid()}
          onPress={handleAddCard}
          _disabled={{
            bg: 'brand.lightGrayOnBlack',
            opacity: 1,
            _text: { opacity: 0.4 }
          }}
          mb="0"
          zIndex="-1"
        >
          Add
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default NewCardForm;
