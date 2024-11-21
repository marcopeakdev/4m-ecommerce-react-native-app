import React, {
  useState,
  useContext,
  useMemo
} from 'react';
import {
  Box,
  FormControl,
  HStack,
  Input,
  ScrollView,
  useColorModeValue,
  VStack,
  View,
  useTheme,
  Button,
  Text,
  Heading
} from 'native-base';
import { AppContext } from '../../helpers/AppContext';
import { ToastContext } from '../../helpers/ToastContext';
import {
  splitFullName,
  splitExpDate,
  verifyCCNumber,
  verifyExpDate,
  verifyCVV,
  verifyZip
} from '../../helpers/formatStrings';
import { useFocusEffect } from '@react-navigation/native';
// import { postCreateCreditCard } from '../../helpers/spreedlyAPICalls';
import CheckerCC from 'card-validator';
import md5 from 'md5';
import { postCreateCreditCard } from '../../helpers/spreedlyAPICalls';

const ContinueAsGuestScreen = (
  { navigation, route },
  props
) => {
  const { colors } = useTheme();
  const { setBottomTabHide } = useContext(AppContext);

  const { latestAWSPayload, setLatestAWSPayload } =
    useContext(ToastContext);

  const email = latestAWSPayload.userEmail ?? '';
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [zip, setZip] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  const [cardNumberError, setCardNumberError] =
    useState(false);
  const [expOrCvvError, setExpOrCvvError] = useState(false);

  useFocusEffect(() => {
    setBottomTabHide(true);
    return () => setBottomTabHide(false);
  });

  const cardType = useMemo(() => {
    if (cardNumber) {
      const numberValidation = CheckerCC.number(cardNumber);
      return numberValidation.card?.type;
    }
    return '';
  }, [cardNumber]);

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

  const handleExpDate = e => {
    let newDate = e.nativeEvent.text;

    if (expDate.length === 1 && newDate.length === 2) {
      // The first character of the year was entered, add '/' after second character

      newDate = `${newDate.substring(0, 2)}/`;
    }

    setExpDate(newDate);
  };

  const handleNext = () => {
    const names = splitFullName(nameOnCard);
    const dates = splitExpDate(expDate);

    const guestHash = md5(
      `${nameOnCard}${expDate}${cardNumber}`
    );

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
        email: email,
        retained: true,
        metadata: {
          userId: guestHash,
          email: email,
          first_name: names[0],
          last_name: names[1],
          month: dates[0],
          year: dates[1],
          verification_value: cvv,
          zip
        }
      }
    };
    const paymentMethodData = {
      card_type: cardType,
      last_four_digits: cardNumber.slice(-4),
      metadata: {
        userId: guestHash,
        email: email
      },
      number: cardNumber,
      payment_method_type: 'credit_card'
    };

    postCreateCreditCard(paymentData)
      .then(data => {
        console.log('Post Credit Card Response', data);

        try {
          setLatestAWSPayload({
            ...latestAWSPayload,
            paymentMethod: paymentMethodData
          });
        } catch (error) {
          console.log(error);
          console.log('error updating latestAWSPayload');
        }

        navigation.navigate('ViewTab', {
          data: paymentData,
          isGuest: true,
          guest: { name: nameOnCard, email }
        });
      })
      .catch(error => {
        console.log('Error with Post Credit Card Payment');
        console.log(error);
      });
  };

  return (
    <VStack
      space={4}
      bgColor="#202020"
      justifyContent="space-between"
    >
      <Box w="100%" h="120px" bg="#202020" rounded="md">
        <View
          flexDir="row"
          w="100%"
          mt="5"
          h="100%"
          alignItems="center"
          justifyContent="space-around"
        >
          <VStack
            justifyContent="center"
            alignItems="center"
          >
            <Heading color="white">
              Continue as Guest
            </Heading>
            <Text mt={2} color="white">
              Please enter your payment information
            </Text>
          </VStack>
        </View>
      </Box>
      <VStack
        position={'relative'}
        justifyContent="space-between"
        height="86%"
      >
        <ScrollView mb="30" padding="15px">
          <VStack space="4" pb="4">
            <Box width="100%">
              <FormControl>
                <FormControl.Label color="white">
                  <Text color="white">
                    Name on Credit Card
                  </Text>
                </FormControl.Label>
                <Input
                  defaultText="Name here"
                  placeholder="Name here"
                  value={nameOnCard}
                  name={'nameOnCard'}
                  onChangeText={newText =>
                    setNameOnCard(newText)
                  }
                  borderWidth="2"
                  borderColor={
                    0 > 0 ? 'brand.green' : 'brand.grey'
                  }
                  width="100%"
                  _focus={{
                    borderColor: colors.brand.green
                  }}
                  padding="18px"
                />
                <FormControl.ErrorMessage
                  _text={{ color: 'brand.white' }}
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
                  <Text color="white">
                    Credit Card Number
                  </Text>
                </FormControl.Label>
                <Input
                  defaultText="**** **** **** ****"
                  placeholder="#### #### #### ####"
                  keyboardType="number-pad"
                  value={cardNumber}
                  name={'cardNumber'}
                  onChangeText={newText =>
                    setCardNumber(newText)
                  }
                  onBlur={cardNumberOnBlur}
                  secureTextEntry
                  maxLength={19}
                  borderWidth="2"
                  borderColor={
                    verifyCCNumber(cardNumber)
                      ? 'brand.green'
                      : cardNumber.length === 0
                      ? 'brand.grey'
                      : 'red.500'
                  }
                  width="100%"
                  _focus={{
                    borderColor: colors.brand.green
                  }}
                  padding="18px"
                />
                <FormControl.ErrorMessage
                  _text={{ color: 'brand.white' }}
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
                  <HStack
                    justifyContent="space-between"
                    space="6"
                  >
                    <VStack
                      alignItems={'flex-start'}
                      flex="2"
                    >
                      <FormControl.Label mx="0">
                        <Text color="white">Zip Code</Text>
                      </FormControl.Label>
                      <Input
                        defaultText="-----"
                        placeholder="-----"
                        keyboardType="number-pad"
                        value={zip}
                        name={'zip'}
                        onChangeText={newText => {
                          setZip(newText);
                        }}
                        onBlur={() => {
                          zipOnBlur();
                        }}
                        maxLength={7}
                        borderWidth="2"
                        width="100%"
                        borderColor={
                          verifyExpDate(expDate)
                            ? 'brand.green'
                            : expDate.length === 0
                            ? 'brand.grey'
                            : 'red.500'
                        }
                        textAlign={'center'}
                        _focus={{
                          borderColor: 'brand.green'
                        }}
                        padding="18px"
                      />
                    </VStack>
                    <VStack
                      alignItems={'flex-start'}
                      flex="3"
                    >
                      <FormControl.Label mx="0">
                        <Text color="white">
                          Expiration Date
                        </Text>
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
                            ? 'brand.grey'
                            : 'red.500'
                        }
                        textAlign={'center'}
                        _focus={{
                          borderColor: 'brand.green'
                        }}
                        padding="18px"
                      />
                    </VStack>
                    <VStack
                      alignItems={'flex-start'}
                      flex="2"
                    >
                      <FormControl.Label mx="0">
                        <Text color="white">CVV</Text>
                      </FormControl.Label>
                      <Input
                        defaultText="***"
                        placeholder="###"
                        keyboardType="number-pad"
                        value={cvv}
                        name="cvv"
                        onChangeText={newText =>
                          setCvv(newText)
                        }
                        onBlur={() => cvvOnBlur()}
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
                            ? 'brand.grey'
                            : 'red.500'
                        }
                        textAlign="center"
                        _focus={{
                          borderColor: colors.brand.green
                        }}
                        padding="18px"
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
        </ScrollView>
        <Box
          position="relative"
          bottom="24px"
          left="0"
          width="100%"
          alignContent="center"
          mb="8"
          px="4"
          pb="6"
          space={2}
        >
          <Button
            variant="ghost"
            position="relative"
            onPress={() =>
              navigation.navigate('Login', {
                screen: 'UserLogin'
              })
            }
            my={1}
          >
            <Text
              marginBottom="-4px"
              fontWeight="700"
              textTransform="uppercase"
              textAlignVertical="center"
              textAlign="center"
              color="brand.green"
              py={2}
            >
              LOG IN
            </Text>
          </Button>
          <Button
            variant="outline"
            position="relative"
            onPress={() =>
              navigation.navigate('Setup', {
                screen: 'SignUp'
              })
            }
            my={1}
            style={{ borderColor: 'white' }}
          >
            <Text
              marginBottom="-4px"
              fontWeight="700"
              textTransform="uppercase"
              textAlignVertical="center"
              textAlign="center"
              color="brand.white"
              py={2}
            >
              SIGN UP
            </Text>
          </Button>
          <Button
            variant={'purple'}
            bg={!isInfoAllValid() ? 'grey' : 'purple'}
            position="relative"
            onPress={handleNext}
            isDisabled={!isInfoAllValid()}
            my={1}
          >
            <Text
              marginBottom="-4px"
              fontWeight="700"
              textTransform="uppercase"
              textAlignVertical="center"
              textAlign="center"
              color={
                !isInfoAllValid()
                  ? 'brand.white'
                  : 'brand.dark'
              }
            >
              NEXT
            </Text>
          </Button>
        </Box>
      </VStack>
    </VStack>
  );
};

export default ContinueAsGuestScreen;
