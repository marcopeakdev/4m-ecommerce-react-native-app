import {
  VStack,
  Box,
  Heading,
  Text,
  HStack,
  Button,
  Pressable,
  useColorModeValue,
  FlatList,
  useToast,
  Spinner
} from 'native-base';
import React, {
  useContext,
  useEffect,
  useState
} from 'react';

import { ToastContext } from '../../helpers/ToastContext';
import GiftIcon from '../../../assets/icons/GiftIcon';
import TabViewMenuItem from '../../components/TabViewMenuItem';
import {
  calcPoints,
  formatCurrency
} from '../../helpers/formatStrings';
import CreditCardIcon from '../../../assets/icons/CreditCardIcon';
import EditIcon from '../../../assets/icons/CreditCardIcon copy';
import TabCloseAlertModal from '../../components/TabCloseAlertModal';

import { AppContext } from '../../helpers/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import {
  getPriceOfTab,
  listFoodOrdersByFoodOrderIdQuery,
  listFoodOrdersByGroupIdQuery,
  testFoodOrdersByFoodOrderIdQuery
} from '../../helpers/ToastContextHelpers';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import {
  deleteSelection,
  updateFoodOrder,
  updateSelection
} from '../../graphql/mutations';
import {
  getModiferOptions,
  postOrder,
  updateOrderCheck
} from '../../helpers/toastApiCalls';

const ViewTabScreen = ({ navigation, route }, props) => {
  const { data, isGuest, guest } = route.params ?? {};
  const { user, setBottomTabHide, setUserData } =
    useContext(AppContext);

  const {
    tab,
    createOrder,
    clearTab,

    latestAWSPayload,
    setLatestAWSPayload,
    buildOrderObject,
    buildSelections,
    setGroupData,
    setSubmittedOrder
  } = useContext(ToastContext);

  const [waitingOnOthers, setWaitingOnOthers] =
    useState(false);

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

  useEffect(() => {
    const payload = {
      id: latestAWSPayload.id,
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone ?? ''
    };

    const updateAWSPayload = async () => {
      try {
        const { data } = await API.graphql(
          graphqlOperation(updateFoodOrder, {
            input: payload
          })
        );

        if (data) {
          console.log(
            'Food Order when updating on ViewTab',
            latestAWSPayload
          );

          setLatestAWSPayload({
            ...data.updateFoodOrder,
            paymentMethod: latestAWSPayload.paymentMethod
          });
        }
      } catch (error) {
        console.log('Error updating food order');
        console.log(error);
      }
    };

    if (user.name) {
      updateAWSPayload();
    }
  }, [user]);

  useFocusEffect(() => {
    const checkAuthState = async () => {
      Auth.currentAuthenticatedUser({ bypassCache: false })
        .then(user => {
          console.log('User Signed In');
          setUserData(user.attributes.email);
        })
        .catch(err => {
          console.log('User Not Signed In');
        });
    };

    if (!user.id.length > 0) {
      checkAuthState();
    }
  });

  const toast = useToast();
  const showWarning = {
    title: 'Please select payment type',
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
            Please select payment type.
          </Text>
        </Box>
      );
    }
  };

  const {
    selections,
    readyToSubmit,
    orderSubmitted,
    orderGuid,
    checkGuid
  } = latestAWSPayload;

  const color = useColorModeValue(
    'brand.dark',
    'brand.white'
  );

  const [isAllReady, setIsAllReady] = useState(false);

  const handleAddToExisting = async () => {
    setIsProcessing(true);

    console.log(
      'This order has already been submitted, so we just need to add the selections to the existing order/check'
    );

    const builtSelections = buildSelections(selections);

    try {
      const postToCheck = await updateOrderCheck(
        orderGuid,
        checkGuid,
        builtSelections
      );
      console.log('Post to Check Response', postToCheck);

      setSubmittedOrder(postToCheck);

      const selectionIdsToDelete =
        latestAWSPayload.selections.map(
          selection => selection.id
        );

      const { data: selectionDeleteRes } =
        await API.graphql({
          query: `mutation DeleteSelectionsById($ids: [ID]){
                          deleteSelectionsById(ids: $ids ) 
                            {
                              id
                            }
                        }`,
          variables: { ids: selectionIdsToDelete }
        });

      console.log(
        'Selection Delete Response',
        selectionDeleteRes
      );

      const { data: payloadRes } = await API.graphql(
        testFoodOrdersByFoodOrderIdQuery(
          latestAWSPayload.id
        )
      );

      console.log('AWS Payload Response', payloadRes);

      setLatestAWSPayload({
        ...payloadRes.listFoodOrders.items[0],
        paymentMethod: latestAWSPayload.paymentMethod
      });

      navigation.navigate('TabConfirmation', {
        data: payloadRes
      });
    } catch (error) {
      console.log('Error with posting selections to check');
      console.log(error);
      setIsProcessing(false);
    }
  };

  const handleSubmitTab = async () => {
    setIsProcessing(true);

    if (!latestAWSPayload.paymentMethod) {
      toast.show(showWarning);
      return;
    }
    try {
      const { data: groupOrdersRes } = await API.graphql({
        query: listFoodOrdersByGroupIdQuery(
          latestAWSPayload.groupId
        )
      });

      setLatestAWSPayload({
        ...groupOrdersRes.listFoodOrders.items.find(
          member => member.id === latestAWSPayload.id
        ),
        paymentMethod: latestAWSPayload.paymentMethod
      });

      if (groupOrdersRes.listFoodOrders.items.length <= 1) {
        // If not in a group, build and submit order
        console.log('Not in a group order');
        setWaitingOnOthers(false);

        // Submit Order

        console.log(
          'Build Order Object',
          buildOrderObject(latestAWSPayload)
        );

        postOrder(buildOrderObject(latestAWSPayload))
          .then(async res => {
            setSubmittedOrder(res);

            const selectionIdsToDelete =
              latestAWSPayload.selections.map(
                selection => selection.id
              );

            const { data: selectionDeleteRes } =
              await API.graphql({
                query: `mutation DeleteSelectionsById($ids: [ID]){
                          deleteSelectionsById(ids: $ids ) 
                            {
                              id
                            }
                        }`,
                variables: { ids: selectionIdsToDelete }
              });

            return res;
          })
          .then(async res => {
            console.log('Order Has Been Posted', res);

            console.log('Check Guid', res.checks[0].guid);

            const { data: foodOrderRes } =
              await API.graphql(
                graphqlOperation(updateFoodOrder, {
                  input: {
                    id: latestAWSPayload.id,
                    orderGuid: res.guid,
                    checkGuid: res.checks[0].guid,
                    orderSubmitted: true
                  }
                })
              );

            setLatestAWSPayload({
              ...foodOrderRes.updateFoodOrder,
              paymentMethod: latestAWSPayload.paymentMethod
            });

            // navigation.navigate('FoodMenuHome');
            navigation.navigate('TabConfirmation', {
              data: foodOrderRes
            });
          })

          .catch(error => {
            console.log('Error Posting Order');
            console.log(error);
          });
      } else {
        // If in a group
        // - Update readyToSubmit to true

        console.log('In a group order');

        let allReady = true;

        groupOrdersRes.listFoodOrders.items.forEach(
          member => {
            if (
              member.readyToSubmit === false &&
              member.id !== latestAWSPayload.id
            ) {
              allReady = false;
            }
          }
        );

        const { data: updatePayloadRes } =
          await API.graphql(
            graphqlOperation(updateFoodOrder, {
              input: {
                id: latestAWSPayload.id,
                readyToSubmit: true
              }
            })
          );

        console.log(
          'All Members Ready to Submit?',
          allReady
        );

        if (allReady) {
          // If all in group are readyToSubmit, build and submit all orders
          setWaitingOnOthers(false);
          console.log('Build and Submit All Orders');
          const builtGroupOrders =
            groupOrdersRes.listFoodOrders.items.map(
              order => {
                return {
                  order: buildOrderObject(order),
                  selections: order.selections,
                  foodOrderId: order.id
                };
              }
            );

          builtGroupOrders.forEach(order => {
            console.log('Submit Each Order');

            postOrder(order.order)
              .then(async res => {
                const selectionIdsToDelete =
                  order.selections.map(
                    selection => selection.id
                  );

                const { data: selectionsDeleteRes } =
                  await API.graphql({
                    query: `mutation DeleteSelectionsById($ids: [ID]){
                          deleteSelectionsById(ids: $ids ) 
                            {
                              id
                            }
                        }`,
                    variables: { ids: selectionIdsToDelete }
                  });

                return res;
              })
              .then(async res => {
                console.log('Order ID', order);

                const { data: foodOrderRes } =
                  await API.graphql(
                    graphqlOperation(updateFoodOrder, {
                      input: {
                        id: order.FoodOrderId,
                        orderGuid: res.guid,
                        checkGuid: res.checks[0].guid,
                        orderSubmitted: true
                      }
                    })
                  );

                if (
                  order.foodOrderId === latestAWSPayload.id
                ) {
                  setSubmittedOrder(res);

                  setLatestAWSPayload({
                    ...foodOrderRes.updateFoodOrder,
                    paymentMethod:
                      latestAWSPayload.paymentMethod
                  });
                }

                // navigation.navigate('FoodMenuHome');
                navigation.navigate('TabConfirmation', {
                  data: foodOrderRes
                });
              })
              .catch(error => {
                console.log('Error Posting Order');
                console.log(error);
              });
          });
        } else {
          // If all in group are not readyToSubmit, disable button and update text to state waiting on all to be ready
          console.log(
            'Waiting on Others to be Ready to Submit'
          );

          setWaitingOnOthers(true);
        }
      }
    } catch (error) {
      console.log(
        'Error getting all group order data',
        error
      );
      setIsProcessing(false);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const { data: selectionRes } = await API.graphql(
        graphqlOperation(updateSelection, {
          input: { id, quantity }
        })
      );

      const { data: payloadRes } = await API.graphql({
        query: listFoodOrdersByFoodOrderIdQuery(
          latestAWSPayload.id
        )
      });

      setLatestAWSPayload({
        ...payloadRes.listFoodOrders.items[0],
        paymentMethod: latestAWSPayload.paymentMethod
      });
    } catch (error) {
      console.log('Error updating quantity');
      console.log(error);
    }
  };

  const removeFromTab = async (id, tabQuantity) => {
    try {
      const { data: deleteRes } = await API.graphql(
        graphqlOperation(deleteSelection, { input: { id } })
      );

      const { data: payloadRes } = await API.graphql({
        query: listFoodOrdersByFoodOrderIdQuery(
          latestAWSPayload.id
        )
      });

      setLatestAWSPayload({
        ...payloadRes.listFoodOrders.items[0],
        paymentMethod: latestAWSPayload.paymentMethod
      });

      if (tabQuantity === 1) {
        navigation.goBack();
      }
    } catch (error) {
      console.log('Error Removing Selection');
      console.log(error);
    }
  };

  const ListFooterComponent = () => {
    return (
      <Box mb="20">
        <HStack
          justifyContent={'space-between'}
          borderTopWidth="2"
          borderBottomWidth="2"
          borderColor="brand.lightgrey"
          pt="3"
        >
          <Heading
            variant="subheader"
            fontSize="lg"
            textTransform={'uppercase'}
          >
            Subtotal
          </Heading>
          <Heading variant="subheader" fontSize="lg">
            {formatCurrency(
              getPriceOfTab(latestAWSPayload)
            )}
          </Heading>
        </HStack>
        <Pressable
          onPress={() =>
            navigation.navigate('ViewPaymentType', {
              user: user.id
                ? user
                : { name: guest.name, email: guest.email }
            })
          }
          isDisabled={!user.id}
          style={!user.id ? { opacity: 0.5 } : {}}
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
            <EditIcon size="md" />
          </HStack>
        </Pressable>
        <Text
          textAlign={'center'}
          mt="4"
          color={useColorModeValue(
            '#595959',
            'brand.lightgrey'
          )}
        >
          You will not be charged until you're ready to
          close your check.
        </Text>
      </Box>
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
      {data && data.userId === 0 && (
        <HStack
          backgroundColor={'brand.green'}
          alignItems={'flex-start'}
          width="100%"
          px="4"
          py="4"
        >
          <Box>
            <GiftIcon size="xs" />
          </Box>
          <VStack space="2" ml="2">
            <Text
              fontWeight="600"
              textTransform={'uppercase'}
            >
              {`YOU COULD EARN ${calcPoints(
                getPriceOfTab(latestAWSPayload)
              )} POINT${
                calcPoints(
                  getPriceOfTab(latestAWSPayload)
                ) > 1
                  ? 'S'
                  : ''
              }`}
            </Text>

            <Text>
              Sign Up or Log In to redeem your points
            </Text>
          </VStack>
        </HStack>
      )}

      <VStack px={4}>
        <FlatList
          data={selections}
          renderItem={item => (
            <TabViewMenuItem
              item={item}
              color={color}
              removeItem={removeFromTab}
              changeQty={updateQuantity}
              modifierOptions={modifierOptions}
              tabQuantity={
                latestAWSPayload.selections.length
              }
              goBack={navigation.goBack}
            />
          )}
          keyExtractor={(item, index) =>
            `${item.guid}-${index}`
          }
          ListFooterComponent={ListFooterComponent}
        />
      </VStack>

      {(user.id || isGuest) && (
        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          alignContent="center"
          px="4"
          pb="6"
        >
          {!user.id && (
            <Button
              variant="outline"
              position="relative"
              onPress={() =>
                navigation.navigate('Login', {
                  screen: 'UserLogin'
                })
              }
              isDisabled={waitingOnOthers}
              mb={3}
              style={{ borderColor: '#000' }}
            >
              <Text
                marginBottom="-4px"
                fontWeight="700"
                textTransform="uppercase"
                textAlignVertical="center"
                textAlign="center"
                color="brand.dark"
                py={2}
              >
                SIGN UP/LOG IN
              </Text>
            </Button>
          )}
          <Button
            variant="purple"
            position="relative"
            onPress={() =>
              !orderSubmitted
                ? handleSubmitTab()
                : handleAddToExisting()
            }
            isDisabled={
              waitingOnOthers ||
              !latestAWSPayload?.paymentMethod ||
              isProcessing
            }
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
          >
            {!isProcessing ? (
              <Text
                marginBottom="-4px"
                fontWeight="700"
                textTransform="uppercase"
                textAlignVertical="center"
                textAlign="center"
                color="brand.dark"
              >
                {waitingOnOthers
                  ? 'Waiting on others'
                  : !orderSubmitted
                  ? 'Place Order'
                  : 'Add to Order'}
              </Text>
            ) : (
              <HStack space="2" alignItems="center">
                <Spinner size="sm" color="brand.dark" />
                <Text
                  marginBottom="-4px"
                  fontWeight="700"
                  textTransform="uppercase"
                  textAlignVertical="center"
                  textAlign="center"
                  color="brand.dark"
                >
                  Processing
                </Text>
              </HStack>
            )}
          </Button>
        </Box>
      )}
      {!user.id && !isGuest && (
        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          alignContent="center"
          px="4"
          pb="6"
        >
          <Button
            variant="outline"
            position="relative"
            onPress={() =>
              navigation.navigate('ContinueAsGuest', {
                screenName: 'ViewTab'
              })
            }
            isDisabled={waitingOnOthers}
            mb={3}
            style={{ borderColor: '#000' }}
          >
            <Text
              marginBottom="-4px"
              fontWeight="700"
              textTransform="uppercase"
              textAlignVertical="center"
              textAlign="center"
              color="brand.dark"
              py={2}
            >
              Continue As Guest
            </Text>
          </Button>
          <Button
            variant="purple"
            position="relative"
            onPress={() =>
              navigation.navigate('Create An Account', {
                screen: 'SignUp',
                params: { isPayment: true }
              })
            }
            isDisabled={waitingOnOthers}
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
              Sign Up/Log In to place order
            </Text>
          </Button>
        </Box>
      )}
      <TabCloseAlertModal
        confirmOnPress={() => {
          clearTab();
          navigation.goBack();
        }}
        cancelOnPress={() => {}}
        confirmText={'Clear Tab'}
        cancelText={'Keep Tab Open'}
        headingText={'Clear Tab?'}
        bodyText={
          'Are you sure you want to clear your tab of all menu items?'
        }
      />
    </VStack>
  );
};

export default ViewTabScreen;
