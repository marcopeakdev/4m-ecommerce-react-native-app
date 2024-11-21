import React, { useContext, useState } from 'react';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  FormControl,
  Heading,
  HStack,
  Pressable,
  ScrollView,
  Select,
  Text,
  useColorModeValue,
  useDisclose,
  useTheme,
  useToast,
  VStack
} from 'native-base';

import { createStackNavigator } from '@react-navigation/stack';

import GroupIcon from '../../assets/icons/GroupIcon';
import CheckIcon from '../../assets/icons/CheckIcon';
import { ToastContext } from '../helpers/ToastContext';
import { screenOptions } from '../constants';

import FoodMenuHome from '../screens/food/FoodMenuHome';
import FoodLineTemplate from '../screens/food/FoodLineTemplate';
import MenuItemTemplate from '../screens/food/MenuItemTemplate';
import ViewCheckScreen from '../screens/food/ViewCheckScreen';
import ViewTabScreen from '../screens/food/ViewTabScreen';
import TabConfirmationScreen from '../screens/food/TabConfirmationScreen';
import FoodOrderingHome from '../screens/food/FoodOrderingHome';
import GroupOrdering from '../screens/food/GroupOrdering';

import { formatDateToTime } from '../helpers/formatStrings';
import CheckPaid from '../screens/food/CheckPaid';
import ContinueAsGuestScreen from '../screens/food/ContinueAsGuestScreen';
import ViewPaymentTypeScreen from '../screens/food/ViewPaymentTypeScreen';
import {
  DINE_IN,
  DINE_IN_NAME,
  TAKE_OUT_NAME
} from '../constants/food';
import DropdownIcon from '../../assets/icons/Dropdown-v2';
import DineInIcon from '../../assets/icons/DineInIcon';
import { API, graphqlOperation, toast } from 'aws-amplify';
import { updateFoodOrder } from '../graphql/mutations';

export default FoodStack = (
  { navigation, route },
  props
) => {
  const FoodOrderingStack = createStackNavigator();
  const { colors } = useTheme();
  const {
    clearTab,
    setCloseTabAlert,
    tables,
    selectedTable,
    selectedDiningOption,
    orderTime,
    latestAWSPayload,
    setLatestAWSPayload,
    getTableByGuid,
    getDiningOptionsByGuid
  } = useContext(ToastContext);

  const { isOpen, onOpen, onClose } = useDisclose();
  const tablesArray = Object.entries(tables);
  const [newTable, setNewTable] = useState('');

  const toast = useToast();
  const tableUpdateErrorToast = {
    title: 'Error Updating Table!',
    placement: 'bottom',
    render: () => {
      return (
        <Box
          bg="brand.webRed"
          px="4"
          py="4"
          rounded="sm"
          mb="5"
        >
          <Text bold color="brand.white">
            Something went wrong when updating your
            table/seat.
          </Text>
        </Box>
      );
    }
  };

  const handleChangeTable = async () => {
    const tableGuid = tablesArray.filter(
      tableItem => tableItem[1].name === newTable
    )[0][1].guid;

    try {
      const { data } = await API.graphql(
        graphqlOperation(updateFoodOrder, {
          input: {
            id: latestAWSPayload.id,
            tableName: newTable,
            tableGuid
          }
        })
      );

      setLatestAWSPayload({
        ...data.updateFoodOrder,
        paymentMethod: latestAWSPayload.paymentMethod
      });
      onClose();
    } catch (error) {
      console.log(error);
      console.log('Error updating FoodOrder');
      onClose();
      toast.show(tableUpdateErrorToast);
    }
  };

  // const GroupOrderingHeader = props => {
  //   const { goBack } = props;

  //   return (
  //     <HStack
  //       width="100%"
  //       mt={4}
  //       justifyContent="space-between"
  //     >
  //       <HStack alignItems="flex-start">
  //         <Pressable
  //           justifyContent="center"
  //           borderWidth={0}
  //           marginLeft={0}
  //           onPress={() => {
  //             goBack();
  //           }}
  //         >
  //           <ChevronLeftIcon size="lg" />
  //         </Pressable>
  //         <Heading
  //           variant="header2"
  //           fontSize="lg"
  //           lineHeight="34px"
  //         >
  //           Group
  //         </Heading>
  //       </HStack>
  //       <HStack justifyContent="center">
  //         <TouchableOpacity
  //           accessibilityRole="button"
  //           accessibilityLabel="Invite"
  //           onPress={onOpen}
  //         >
  //           <Text>Invite</Text>
  //         </TouchableOpacity>
  //       </HStack>
  //     </HStack>
  //   );
  // };

  const FoodOrderingHeader = props => {
    const { goBack, goViewCheck } = props;

    const {
      tableGuid,
      diningOptionGuid,
      diningOptionName,
      orderTime
    } = latestAWSPayload ?? {};

    const table = tableGuid
      ? getTableByGuid(tableGuid)[0][1]
      : '';

    const diningOption = getDiningOptionsByGuid(
      diningOptionGuid
    )[0];

    const isActiveOrder =
      latestAWSPayload.hasOwnProperty('id');

    let tableName = '';
    let tableNumber = '';

    if (isActiveOrder && diningOptionName === DINE_IN) {
      switch (table.name.charAt(0)) {
        case '1':
          tableName = 'Bar Seat';
          break;
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '9':
          tableName = 'Table';
          break;
        case '7':
          tableName = 'Front Patio';
          break;
        case '8':
          tableName = 'Back Patio';
          break;
        default:
          tableName = 'Table';
      }
      tableNumber = table.name;
    }

    return (
      <HStack
        width="100%"
        justifyContent="space-between"
        mt={4}
      >
        <HStack
          justifyContent="flex-start"
          pt={
            latestAWSPayload &&
            Object.keys(latestAWSPayload).length > 1
              ? 0
              : 6
          }
        >
          <Pressable
            alignItems="center"
            justifyContent="center"
            borderWidth={0}
            marginLeft={0}
            onPress={() => {
              if (isActiveOrder) {
                navigation.navigate('Home');
              } else {
                goBack();
              }
            }}
          >
            <ChevronLeftIcon size="lg" />
          </Pressable>
          {latestAWSPayload &&
          Object.keys(latestAWSPayload).length > 1 ? (
            <VStack justifyContent={'center'}>
              {/* If Dine-In */}
              {diningOption &&
              diningOption.behavior === DINE_IN ? (
                <Pressable onPress={onOpen}>
                  <HStack alignContent="center" space="1">
                    <Heading
                      variant="header4"
                      fontSize="sm"
                    >
                      {DINE_IN_NAME}
                    </Heading>
                    <Box pt="1">
                      <DropdownIcon size="xxs" />
                    </Box>
                  </HStack>
                  <Text variant="captionText">
                    {tableName} {tableNumber}
                  </Text>
                </Pressable>
              ) : (
                <>
                  <HStack alignContent="center" space="1">
                    <Heading
                      variant="header4"
                      fontSize="sm"
                    >
                      {TAKE_OUT_NAME}
                    </Heading>
                  </HStack>
                  <Text variant="captionText">
                    @ {formatDateToTime(orderTime)}
                  </Text>
                </>
              )}
            </VStack>
          ) : (
            <VStack justifyContent="center">
              <Heading
                variant="header3"
                fontSize="xl"
                lineHeight="22"
              >
                Menu
              </Heading>
            </VStack>
          )}
        </HStack>
        {latestAWSPayload &&
        Object.keys(latestAWSPayload).length > 1 ? (
          <HStack space={2}>
            <Pressable
              justifyContent={'center'}
              alignItems={'center'}
              onPress={() => {
                navigation.navigate('GroupOrdering');
              }}
            >
              <VStack
                justifyContent={'center'}
                alignItems={'center'}
                space="1"
              >
                <Center>
                  <GroupIcon
                    size="md"
                    color={useColorModeValue(
                      'brand.dark',
                      'brand.white'
                    )}
                  />
                </Center>
                <Text
                  color={useColorModeValue(
                    'brand.dark',
                    'brand.white'
                  )}
                >
                  Group
                </Text>
              </VStack>
            </Pressable>
            <Pressable
              justifyContent={'center'}
              alignItems={'center'}
              onPress={goViewCheck}
              disabled={!latestAWSPayload.orderGuid}
            >
              <VStack
                justifyContent={'center'}
                alignItems={'center'}
                space="1"
              >
                <Center>
                  <CheckIcon
                    size="md"
                    color={
                      latestAWSPayload.orderGuid
                        ? useColorModeValue(
                            'brand.dark',
                            'brand.white'
                          )
                        : 'brand.lightgray'
                    }
                  />
                </Center>
                <Text
                  color={
                    latestAWSPayload.orderGuid
                      ? useColorModeValue(
                          'brand.dark',
                          'brand.white'
                        )
                      : 'brand.lightgray'
                  }
                >
                  Check
                </Text>
              </VStack>
            </Pressable>
          </HStack>
        ) : (
          <VStack></VStack>
        )}
        <Actionsheet
          isOpen={isOpen}
          onClose={onClose}
          size="full"
        >
          <Actionsheet.Content>
            <VStack space="4" mb="4" width="100%">
              <VStack px="4" space="4" alignItems="center">
                <DineInIcon size="md" />
                <Text
                  textAlign="center"
                  fontSize={24}
                  lineHeight={24}
                  bold
                >
                  {DINE_IN_NAME}
                </Text>
              </VStack>
              <VStack space="6" px="4">
                <FormControl>
                  <FormControl.Label>
                    Select Table/Patio/Bar Seat Number:
                  </FormControl.Label>
                  <Select
                    variant="ecomSelect"
                    selectedValue={newTable}
                    placeholder=""
                    onValueChange={itemValue =>
                      setNewTable(itemValue)
                    }
                  >
                    {tablesArray
                      .filter(
                        table => table[1].name !== undefined
                      )
                      .sort((a, b) => a[1].name - b[1].name)
                      .map((table, index) => {
                        return (
                          <Select.Item
                            label={table[1].name}
                            key={table[1].guid}
                            value={table[1].name}
                            borderRadius={0}
                            borderBottomWidth={1}
                            borderBottomColor={useColorModeValue(
                              'brand.mediumGrayOnWhite',
                              'brand.mediumGrayOnWhite'
                            )}
                          />
                        );
                      })}
                  </Select>
                </FormControl>

                <Button
                  variant="purple"
                  _text={{ color: 'brand.dark' }}
                  isDisabled={newTable === ''}
                  _disabled={{
                    bg: 'brand.lightGrayOnBlack',
                    opacity: 1,
                    _text: { opacity: 0.4 }
                  }}
                  onPress={handleChangeTable}
                >
                  Change Table
                </Button>
              </VStack>
            </VStack>
          </Actionsheet.Content>
        </Actionsheet>
      </HStack>
    );
  };

  return (
    <FoodOrderingStack.Navigator
      initialRouteName="FoodOrderingHome"
      screenOptions={{
        ...screenOptions,
        cardStyle: {
          backgroundColor: useColorModeValue(
            colors.brand.white,
            colors.brand.dark
          )
        }
      }}
    >
      <FoodOrderingStack.Screen
        name="FoodOrderingHome"
        component={FoodOrderingHome}
        options={({ navigation }) => ({})}
      />
      <FoodOrderingStack.Screen
        name="FoodMenuHome"
        component={FoodMenuHome}
        options={({ navigation }) => ({
          headerTitle: props =>
            true ? (
              <FoodOrderingHeader
                props={props}
                goBack={navigation.goBack}
                goViewCheck={() =>
                  navigation.navigate('ViewCheck')
                }
              />
            ) : (
              <></>
            )
        })}
      />
      <FoodOrderingStack.Screen
        name="GroupOrdering"
        component={GroupOrdering}
        options={({ navigation }) => ({})}
      />
      <FoodOrderingStack.Screen
        name="FoodLineTemplate"
        component={FoodLineTemplate}
      />
      <FoodOrderingStack.Screen
        name="MenuItemTemplate"
        component={MenuItemTemplate}
        options={({ navigation }) => ({
          tabBarStyle: { display: 'none' }
        })}
      />
      <FoodOrderingStack.Screen
        name="ContinueAsGuest"
        component={ContinueAsGuestScreen}
        options={({ navigation }) => ({
          tabBarStyle: { display: 'none' }
        })}
      />
      <FoodOrderingStack.Screen
        name="ViewCheck"
        component={ViewCheckScreen}
        options={({ navigation }) => ({
          headerTitle: props => (
            <HStack
              width="100%"
              justifyContent="space-between"
              mt={4}
            >
              <HStack justifyContent="flex-start">
                <Pressable
                  alignItems="center"
                  justifyContent="center"
                  borderWidth={0}
                  marginLeft={0}
                  onPress={() => {
                    navigation.navigate('FoodMenuHome');
                  }}
                >
                  <ChevronLeftIcon size="lg" />
                </Pressable>
                <VStack justifyContent="center">
                  <Heading
                    variant="header3"
                    fontSize="xl"
                    lineHeight="22"
                  >
                    Check
                  </Heading>
                </VStack>
              </HStack>
              <VStack></VStack>
            </HStack>
          )
        })}
      />
      <FoodOrderingStack.Screen
        name="ViewTab"
        component={ViewTabScreen}
        options={({ navigation }) => ({
          headerLeft: props => (
            <HStack alignItems="center" space="4">
              <Pressable
                alignItems="center"
                justifyContent="center"
                borderWidth={0}
                marginLeft={4}
                onPress={navigation.goBack}
              >
                <ChevronLeftIcon size="lg" />
              </Pressable>
              <Heading
                fontSize={28}
                lineHeight={28}
                mt="2"
                borderWidth={0}
                textAlignVertical="center"
              >
                Tab
              </Heading>
            </HStack>
          ),

          headerRight: props => (
            <Pressable
              alignItems="center"
              justifyContent="center"
              borderWidth={0}
              marginRight={4}
              onPress={() => {
                setCloseTabAlert(true);
              }}
            >
              <Heading
                fontSize="xs"
                variant="captionTitle"
                color="brand.orange"
              >
                Clear Tab
              </Heading>
            </Pressable>
          )
        })}
      />
      <FoodOrderingStack.Screen
        name="ViewPaymentType"
        component={ViewPaymentTypeScreen}
        options={({ navigation }) => ({
          headerLeft: props => (
            <HStack alignItems="center" space="4">
              <Pressable
                alignItems="center"
                justifyContent="center"
                borderWidth={0}
                marginLeft={4}
                onPress={navigation.goBack}
              >
                <ChevronLeftIcon size="lg" />
              </Pressable>
              <Heading
                fontSize={28}
                lineHeight={28}
                mt="2"
                borderWidth={0}
                textAlignVertical="center"
              >
                Tab
              </Heading>
            </HStack>
          ),

          headerRight: props => (
            <Pressable
              alignItems="center"
              justifyContent="center"
              borderWidth={0}
              marginRight={4}
              onPress={() => {
                navigation.navigate('Account', {
                  screen: 'PaymentMethods',
                  params: { isPayment: true }
                });
              }}
            >
              <Heading
                fontSize="xs"
                variant="captionTitle"
                color="brand.orange"
              >
                MANAGE
              </Heading>
            </Pressable>
          )
        })}
      />
      <FoodOrderingStack.Screen
        name="TabConfirmation"
        component={TabConfirmationScreen}
        options={({ navigation }) => ({
          cardStyle: {
            backgroundColor: useColorModeValue(
              colors.brand.lightgray,
              colors.brand.dark
            )
          }
        })}
      />
      <FoodOrderingStack.Screen
        name="CheckPaid"
        component={CheckPaid}
        options={({ navigation }) => ({
          cardStyle: {
            backgroundColor: useColorModeValue(
              colors.brand.lightgray,
              colors.brand.dark
            )
          }
        })}
      />
    </FoodOrderingStack.Navigator>
  );
};
