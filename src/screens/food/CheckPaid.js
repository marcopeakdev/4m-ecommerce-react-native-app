import {
  VStack,
  Box,
  Heading,
  Text,
  HStack,
  Button,
  useColorModeValue
} from 'native-base';
import React, { useContext, useState } from 'react';
import { ToastContext } from '../../helpers/ToastContext';
import TabIcon from '../../../assets/icons/TabIcon';
import {
  formatCurrency,
  formatDate,
  formatDateDayMonthDate,
  formatToAWSDate
} from '../../helpers/formatStrings';
import { LinearGradient } from 'expo-linear-gradient';
import CreditCardIcon from '../../../assets/icons/CreditCardIcon';
import EditIcon from '../../../assets/icons/CreditCardIcon copy';
import { API, graphqlOperation } from 'aws-amplify';
import {
  createOrder,
  createPoint
} from '../../graphql/mutations';
import { AppContext } from '../../helpers/AppContext';
import OrderCompleteIcon from '../../../assets/icons/OrderComplete';
import { useFocusEffect } from '@react-navigation/native';
import DineInIcon from '../../../assets/icons/DineInIcon';
import ArrowRight from '../../../assets/icons/ArrowRight';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
const CheckPaid = ({ navigation, route }, props) => {
  const { setBottomTabHide } = useContext(AppContext);
  useFocusEffect(() => {
    setBottomTabHide(true);
    return () => setBottomTabHide(false);
  });
  const { user } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const { order } = route.params.payload;
  const { guid, closedDate, diningOption, table } = order;
  const check = order.checks[0];
  const closedDateObj = new Date(closedDate.slice(0, -5));

  const closedDateToString =
    formatDateDayMonthDate(closedDateObj);

  console.log('Date String', closedDateToString);

  return (
    <VStack
      borderWidth={0}
      flex={1}
      pt={10}
      px={4}
      safeArea
      space={6}
      alignItems="center"
      justifyContent="space-between"
      bg={useColorModeValue('brand.white', 'brand.dark')}
    >
      <VStack w="100%" px={6}>
        <VStack alignItems="center" space="4">
          <OrderCompleteIcon size="3xl" />
          <Heading
            variant="captionTitle"
            fontSize="14.22px"
            lineHeight="12.21px"
            letterSpacing="10"
            mt={3}
          >
            check paid
          </Heading>
          <Text
            textAlign={'center'}
            fontSize="lg"
            lineHeight="24"
            bold
          >
            Come again soon!
          </Text>
        </VStack>
        <VStack
          borderRadius="15"
          p="4"
          px="1"
          borderWidth="1"
          borderColor="brand.lightgray"
          shadow={8}
          bg={useColorModeValue(
            'brand.white',
            'brand.dark'
          )}
          my={4}
        >
          <VStack px="8" space="2">
            <HStack
              my={4}
              justifyContent="center"
              alignItems="center"
            >
              <DineInIcon size="45px" />
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="16" lineHeight="21px" bold>
                Order #{check.displayNumber}
              </Text>
              <Text fontSize="16" lineHeight="21px" bold>
                {closedDateToString}
              </Text>
            </HStack>
            {/* <HStack justifyContent="space-between">
              <Text fontSize="16">Dining Option</Text>
              <Text fontSize="16">Table #</Text>
            </HStack> */}
            <HStack justifyContent="space-between">
              <Text fontSize="16" lineHeight="21px">
                Paid
              </Text>
              <Text fontSize="16" lineHeight="21px">
                {formatCurrency(check.totalAmount)}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="16" lineHeight="21px">
                Points Earned
              </Text>
              <Text fontSize="16" lineHeight="21px">
                {Math.floor(
                  check.totalAmount -
                    check.payments[0].tipAmount
                ) * 5}
              </Text>
            </HStack>
            <Pressable
              onPress={() => console.log('View Receipt')}
            >
              <HStack
                justifyContent="space-between"
                borderTopWidth="1px"
                borderBottomWidth="1px"
                borderColor="#E6E6E6"
                py={3}
                mt={2}
              >
                <Text
                  fontSize="16"
                  lineHeight="14px"
                  letterSpacing={'2px'}
                >
                  View Receipt
                </Text>
                <ArrowRight />
              </HStack>
            </Pressable>
          </VStack>
        </VStack>
      </VStack>
      <Box width="100%" alignContent="center" pb="6" px={4}>
        <Button
          variant="purple"
          onPress={() =>
            navigation.navigate('FoodOrderingHome')
          }
          _disabled={{
            bg: 'brand.lightGrayOnBlack',
            opacity: 1,
            _text: { opacity: 0.4 }
          }}
        >
          <Text
            marginBottom="-4px"
            fontWeight="700"
            textTransform="uppercase"
            textAlignVertical="center"
            textAlign="center"
            color="brand.dark"
          >
            Start New Order
          </Text>
        </Button>
      </Box>
    </VStack>
  );
  /* return (
      <VStack
        borderWidth={0}
        flex={1}
        pt={10}
        px={4}
        mt={10}
        safeArea
        space={6}
        alignItems="center"
      >
        <VStack
          flex="1"
          bg={useColorModeValue(
            'brand.white',
            'brand.darkgray'
          )}
          alignItems="center"
          borderTopRadius="20"
          p="2"
          px="6"
          pt="6"
          mt="10"
          space="4"
        >
          <OrderCompleteIcon size="5xl" />
          <Heading
            variant="captionTitle"
            fontSize="md"
            letterSpacing="4"
          >
            Order Confirmed
          </Heading>
          <Text
            textAlign={'center'}
            variant="captionBody"
            fontSize="sm"
          >
            Your food is being cooked up right now and will be
            ready shortly!
          </Text>
        </VStack>
      </VStack>
    ); */
};
export default CheckPaid;
