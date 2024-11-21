import {
  VStack,
  Box,
  Heading,
  Text,
  HStack,
  Button,
  FlatList,
  useColorModeValue,
  useTheme,
  Actionsheet,
  useDisclose,
  FormControl,
  Input,
  Pressable,
  Spinner
} from 'native-base';
import React, {
  useContext,
  useEffect,
  useState
} from 'react';

import { ToastContext } from '../../helpers/ToastContext';
import TabIcon from '../../../assets/icons/TabIcon';
import {
  calcPoints,
  formatCurrency,
  formatToAWSDate,
  splitFullName
} from '../../helpers/formatStrings';
import { LinearGradient } from 'expo-linear-gradient';
import CreditCardIcon from '../../../assets/icons/CreditCardIcon';
import EditIcon from '../../../assets/icons/CreditCardIcon copy';
import { API, graphqlOperation } from 'aws-amplify';
import {
  createOrder,
  createPoint,
  deleteFoodOrder,
  updateAccount
} from '../../graphql/mutations';
import { AppContext } from '../../helpers/AppContext';
import {
  getModiferOptions,
  getOrder,
  postPayment
} from '../../helpers/toastApiCalls';
import { useFocusEffect } from '@react-navigation/native';
import MoneyIcon from '../../../assets/icons/MoneyIcon';
import { deleteFoodOrderById } from '../../helpers/ToastContextHelpers';
import { postPaymentMethods } from '../../helpers/spreedlyAPICalls';

const ViewCheckScreen = ({ navigation, route }, props) => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const { user, setUser, setBottomTabHide } =
    useContext(AppContext);

  const [isProcessing, setIsProcessing] = useState(false);
  const [modifierOptions, setModifierOptions] = useState(
    []
  );

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  useEffect(async () => {
    try {
      const modifierOptionsRes = await getModiferOptions();
      const modifiersArray = Object.entries(
        modifierOptionsRes
      );

      setModifierOptions(modifiersArray);
    } catch (error) {
      console.log(error);
      console.log('error getting modifier options');
    }
  }, []);

  const {
    latestAWSPayload,
    setLatestAWSPayload,
    submittedOrder
  } = useContext(ToastContext);

  let allTax = 0;
  let allSubtotal = 0;

  if (submittedOrder) {
    allTax = submittedOrder?.checks[0]?.taxAmount ?? 0;
    allSubtotal = submittedOrder?.checks[0]?.amount ?? 0;
  }

  let totalAmount = allTax + allSubtotal;

  const { colors } = useTheme();

  const gratuityOptions = ['custom', 18, 20, 25];

  const [gratuity, setGratuity] = useState(null);

  const [customGratuityValue, setCustomGratuityValue] =
    useState(0);

  const [gratuityAmt, setGratuityAmt] = useState(0);

  const handleGratuityButtonPress = option => {
    setGratuity(option);
    if (option !== gratuityOptions[0]) {
      setGratuityAmt(allSubtotal * (option / 100));
    } else {
      setGratuityAmt(customGratuityValue);
      onOpen();
    }
  };

  const handlePay = async () => {
    console.log('Pay Button Clicked');
    setIsProcessing(true);

    const names = splitFullName(latestAWSPayload.userName);

    const data = {
      ccData: {
        firstName: names[0],
        lastName: names[1],
        email: latestAWSPayload.userEmail,
        // token: latestAWSPayload.paymentMethod?.token,
        number:
          latestAWSPayload.paymentMethod?.last_four_digits,
        userId:
          user?.id ??
          latestAWSPayload.paymentMethod?.metadata.userId,
        tipAmount: gratuityAmt
      }
    };

    const pointsEarned = calcPoints(allSubtotal);

    try {
      const postingPayment = await postPayment(
        submittedOrder.guid,
        submittedOrder.checks[0].guid,
        data
      );

      console.log('Post Payment Response', postingPayment);

      const { data: deleteRes } = await API.graphql(
        deleteFoodOrderById(latestAWSPayload.id)
      );

      console.log('Delete Response', deleteRes);

      setLatestAWSPayload({});

      // Create Order Record in Order DynamoDB Table
      const { data: createOrderRecordData } =
        await API.graphql(
          graphqlOperation(createOrder, {
            input: {
              orderId: submittedOrder.guid,
              userId:
                user?.id ??
                latestAWSPayload.paymentMethod?.metadata
                  .userId,
              points: pointsEarned,
              source: 'Food'
            }
          })
        );

      console.log(
        'createOrderRecordData Response',
        createOrderRecordData
      );

      // Create Point Record in Point DynamoDB Table
      const { data: createPointRecordData } =
        await API.graphql(
          graphqlOperation(createPoint, {
            input: {
              userId:
                user?.id ??
                latestAWSPayload.paymentMethod?.metadata
                  .userId,
              points: pointsEarned
            }
          })
        );

      console.log(
        'createPointRecordData Response',
        createPointRecordData
      );
      // Update Account Record  in Account Dynamo Table
      if (user.name) {
        console.log('Not Guest');

        const { data: updateAccountRecordData } =
          await API.graphql(
            graphqlOperation(updateAccount, {
              input: {
                id: user.id,
                points: user.points + pointsEarned
              }
            })
          );

        if (updateAccountRecordData) {
          setUser({
            ...user,
            points:
              updateAccountRecordData.updateAccount.points
          });
        }

        console.log(
          'updateAccountRecordData Response',
          updateAccountRecordData
        );
      } else {
        console.log('Guest');
      }
      navigation.navigate('CheckPaid', {
        payload: { order: postingPayment }
      });
    } catch (error) {
      console.log('Error with posting payment');
      console.log(error);
      setIsProcessing(false);
    }
  };

  const handleAddCustomValue = value => {
    setCustomGratuityValue(value * 1);
    setGratuityAmt(value * 1);
    onClose();
  };

  const ListItemComponent = props => {
    const { displayName, quantity, modifiers } =
      props.item.item;

    return (
      <HStack justifyContent={'space-between'} mb="2">
        <VStack flex="1">
          <Heading
            variant="subHeader2"
            fontSize="md"
            textTransform={'uppercase'}
          >
            {displayName}
          </Heading>
          {modifiers.length > 0 &&
            modifierOptions.length > 0 && (
              <VStack pl="4" pr="8">
                {modifiers.map(modifier => {
                  const targetModifier =
                    modifierOptions.find(
                      option =>
                        option[1].guid ===
                        modifier.item.guid
                    ) ?? {};

                  return (
                    <Text>{targetModifier[1]?.name}</Text>
                  );
                })}
              </VStack>
            )}
        </VStack>
        <Box>
          <Heading variant="subHeader2" fontSize="md">
            {quantity}x
          </Heading>
        </Box>
      </HStack>
    );
  };

  const ListFooterComponent = () => {
    const textColor = useColorModeValue(
      '#595959',
      'brand.lightgrey'
    );

    const whiteDark = useColorModeValue(
      'brand.white',
      'brand.dark'
    );

    const darkWhite = useColorModeValue(
      'brand.dark',
      'brand.white'
    );

    return (
      <VStack mb="20">
        <VStack
          py="2"
          space="2"
          borderTopWidth="2"
          borderBottomWidth="2"
          borderColor="brand.lightgrey"
        >
          <HStack justifyContent={'space-between'} pt="3">
            <Heading
              variant="subheader"
              fontSize="lg"
              textTransform={'uppercase'}
            >
              Subtotal
            </Heading>
            <Heading variant="subheader" fontSize="lg">
              {formatCurrency(allSubtotal)}
            </Heading>
          </HStack>
          <Box>
            <HStack justifyContent={'space-between'} pt="3">
              <Heading
                variant="subheader"
                fontSize="lg"
                textTransform={'uppercase'}
              >
                Pooled Gratuity
              </Heading>
              <Heading variant="subheader" fontSize="lg">
                {formatCurrency(gratuityAmt)}
              </Heading>
            </HStack>
            <Box borderRadius={50}>
              <LinearGradient
                colors={[
                  colors.brand.orange,
                  colors.brand.purple
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ borderRadius: 25 }}
              >
                <Button.Group isAttached>
                  {gratuityOptions.map((option, index) => {
                    return (
                      <Button
                        key={`${option}${index}`}
                        flex={index !== 0 ? '1' : '2'}
                        borderWidth="2"
                        borderColor={'brand.lightgrey'}
                        backgroundColor={
                          gratuity !== option
                            ? whiteDark
                            : darkWhite
                        }
                        px={index !== 0 ? '2' : '0'}
                        onPress={() => {
                          handleGratuityButtonPress(option);
                        }}
                      >
                        {index !== 0 ? (
                          <VStack space="2">
                            <Text
                              fontSize="12"
                              fontWeight="600"
                              lineHeight="10"
                              textTransform={'uppercase'}
                              textAlignVertical="center"
                              textAlign={'center'}
                              color={
                                gratuity !== option
                                  ? darkWhite
                                  : whiteDark
                              }
                            >{`${option}%`}</Text>

                            <Text
                              fontSize="12"
                              lineHeight="10"
                              textTransform={'uppercase'}
                              textAlignVertical="center"
                              textAlign={'center'}
                              color={
                                gratuity !== option
                                  ? darkWhite
                                  : whiteDark
                              }
                            >
                              {formatCurrency(
                                (allSubtotal * option) / 100
                              )}
                            </Text>
                          </VStack>
                        ) : (
                          <VStack space="2">
                            <Text
                              fontSize="12"
                              fontWeight="600"
                              lineHeight="10"
                              textTransform={'uppercase'}
                              textAlignVertical="center"
                              textAlign={'center'}
                              color={
                                gratuity !== option
                                  ? darkWhite
                                  : whiteDark
                              }
                            >
                              {option}
                            </Text>
                            {customGratuityValue > 0 && (
                              <Text
                                fontSize="12"
                                lineHeight="10"
                                textTransform={'uppercase'}
                                textAlignVertical="center"
                                textAlign={'center'}
                                color={
                                  gratuity !== option
                                    ? darkWhite
                                    : whiteDark
                                }
                              >
                                {formatCurrency(
                                  customGratuityValue
                                )}
                              </Text>
                            )}
                          </VStack>
                        )}
                      </Button>
                    );
                  })}
                </Button.Group>
              </LinearGradient>
            </Box>
          </Box>

          <HStack justifyContent={'space-between'} pt="3">
            <Heading
              variant="subheader"
              fontSize="lg"
              textTransform={'uppercase'}
            >
              Tax
            </Heading>
            <Heading variant="subheader" fontSize="lg">
              {formatCurrency(allTax)}
            </Heading>
          </HStack>
        </VStack>

        <Pressable
          onPress={() =>
            navigation.navigate('ViewPaymentType')
          }
          isDisabled={
            !latestAWSPayload.paymentMethod?.metadata
              ?.userId
          }
          style={
            !latestAWSPayload.paymentMethod?.metadata
              ?.userId
              ? { opacity: 0.5 }
              : {}
          }
        >
          <HStack
            justifyContent={'space-between'}
            borderBottomWidth="2"
            borderColor="brand.lightgrey"
            py="2"
          >
            <HStack space="3" alignItems={'center'} pt="1">
              <CreditCardIcon size="md" />
              {latestAWSPayload?.paymentMethod && (
                <Heading
                  variant="captionTitle"
                  fontSize="md"
                  textTransform={'uppercase'}
                >
                  {
                    latestAWSPayload?.paymentMethod
                      ?.card_type
                  }{' '}
                  ENDING IN{' '}
                  {
                    latestAWSPayload?.paymentMethod
                      ?.last_four_digits
                  }
                </Heading>
              )}
              {!latestAWSPayload?.paymentMethod && (
                <Heading
                  variant="captionTitle"
                  fontSize="md"
                  textTransform={'uppercase'}
                >
                  Payment Type
                </Heading>
              )}
            </HStack>
            {latestAWSPayload.paymentMethod?.metadata
              ?.userId > 0 && <EditIcon size="md" />}
          </HStack>
        </Pressable>
        <Text
          textAlign={'center'}
          mt="4"
          color={textColor}
          lineHeight="21px"
          fontSize="16px"
          fontWeight="300"
        >
          All unclosed checks are automatically closed out
          and charged around midnight of the same day.
        </Text>
      </VStack>
    );
  };

  const CustomActionSheet = ({ value, handleAdd }) => {
    const [customAmount, setCustomAmount] = useState('');

    return (
      <Actionsheet
        isOpen={isOpen}
        onClose={onClose}
        size="full"
      >
        <Actionsheet.Content>
          <VStack space={4} mb={4} px={2} width="100%">
            <VStack px={4} space={4} alignItems="center">
              <MoneyIcon size="48px" />
              <Text
                textAlign="center"
                fontSize={24}
                lineHeight={24}
                bold
              >
                Custom Gratuity
              </Text>

              <Text
                mt={4}
                textAlign="center"
                fontSize="14.22px"
                lineHeight="21px"
              >
                Please enter in the amount you would like to
                leave as pooled gratuity for our concierge.
              </Text>
            </VStack>
            <VStack space={8} my={6}>
              <FormControl>
                <FormControl.Label
                  fontSize="14.22px"
                  lineHeight="16px"
                >
                  Custom Amount:
                </FormControl.Label>
                <Input
                  variant="ecomInput"
                  padding="4"
                  placeholder={'enter amount'}
                  value={`$${customAmount.toString()}`}
                  onChange={e =>
                    setCustomAmount(
                      e.nativeEvent.text.replace('$', '')
                    )
                  }
                  keyboardType="decimal-pad"
                  placeholderTextColor="brand.lightGrayOnBlack"
                />
              </FormControl>
            </VStack>
            <Button
              variant="purple"
              position="relative"
              paddingTop="4"
              paddingBottom="4"
              isDisabled={customAmount.length === 0}
              onPress={() => handleAdd(customAmount)}
              _disabled={{
                bg: 'brand.lightGrayOnBlack',
                opacity: 1,
                _text: { opacity: 0.4 }
              }}
            >
              <Text fontWeight="bold">ADD</Text>
            </Button>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    );
  };

  return (
    <VStack
      borderWidth={0}
      flex={1}
      pt={10}
      mt={10}
      safeArea
      space={6}
    >
      <VStack px={4}>
        <FlatList
          data={submittedOrder?.checks[0]?.selections}
          renderItem={item => (
            <ListItemComponent item={item} />
          )}
          ListFooterComponent={<ListFooterComponent />}
          keyExtractor={(item, index) =>
            `${item.name}${index}`
          }
        />
      </VStack>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        width="100%"
        alignContent="center"
        pb="6"
        px={4}
      >
        <Button
          variant="purple"
          position="relative"
          paddingTop="3"
          paddingBottom="3"
          onPress={handlePay}
          isDisabled={!gratuity || isProcessing}
          _disabled={{
            bg: 'brand.lightGrayOnBlack',
            opacity: 1,
            _text: { opacity: 0.4 }
          }}
        >
          <HStack
            justifyContent={'space-around'}
            space="24"
          >
            <HStack alignItems={'center'} space="2">
              {!isProcessing ? (
                <TabIcon color="brand.dark" />
              ) : (
                <Spinner color="brand.dark" size="sm" />
              )}
              <Text
                marginBottom="-4px"
                fontWeight="700"
                textTransform="uppercase"
                textAlignVertical="center"
                textAlign="center"
                color="brand.dark"
              >
                {!isProcessing ? 'Pay' : 'Processing'}
              </Text>
            </HStack>
            {!isProcessing ? (
              <Box justifyContent={'center'}>
                <Text
                  marginBottom="-4px"
                  fontWeight="700"
                  textTransform="uppercase"
                  textAlignVertical="center"
                  textAlign="center"
                  color="brand.dark"
                >
                  {formatCurrency(
                    totalAmount + gratuityAmt
                  )}
                </Text>
              </Box>
            ) : (
              <></>
            )}
          </HStack>
        </Button>
      </Box>

      <CustomActionSheet
        value={customGratuityValue}
        handleAdd={handleAddCustomValue}
      />
    </VStack>
  );
};

export default ViewCheckScreen;
