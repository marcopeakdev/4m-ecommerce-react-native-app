import React, {
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';
import {
  Actionsheet,
  ScrollView,
  HStack,
  Heading,
  ChevronLeftIcon,
  Pressable,
  Text,
  useDisclose,
  Button,
  FormControl,
  Input,
  VStack,
  useColorModeValue,
  Box,
  Checkbox,
  Center,
  Spinner,
  FlatList,
  useToast,
  Toast
} from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GroupIcon from '../../../assets/icons/GroupIcon';
import TrashIcon from '../../../assets/icons/TrashIcon';
import { AppContext } from '../../helpers/AppContext';
import { ToastContext } from '../../helpers/ToastContext';
import {
  formatCurrency,
  verifyEmail
} from '../../helpers/formatStrings';

import { API, graphqlOperation } from 'aws-amplify';
import {
  createFoodOrder,
  createSelection,
  updateFoodOrder
} from '../../graphql/mutations';
import {
  listFoodOrders,
  listFoodOrdersByGroupId
} from '../../graphql/queries';
import TabViewMenuItem from '../../components/TabViewMenuItem';
import {
  getPriceOfAllTabs,
  getPriceOfTab,
  listFoodOrdersByGroupIdQuery
} from '../../helpers/ToastContextHelpers';
import CustomModal from '../../components/CustomModal';
import newUUID from '../../helpers/newUUID';

const GroupOrdering = ({ navigation, route }, props) => {
  const { setBottomTabHide } = useContext(AppContext);
  const { latestAWSPayload, setLatestAWSPayload } =
    useContext(ToastContext);

  const [groupMemberAdded, setGroupMemberAdded] =
    useState(0);

  const { isOpen, onOpen, onClose } = useDisclose();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickUpGroupTab, setPickUpGroupTab] =
    useState(false);

  const [groupData, setGroupData] = useState([]);
  const [singlePayeeData, setSinglePayeeData] = useState(
    []
  );

  const [isLoading, setIsLoading] = useState(true);
  const [removeModalIsOpen, setRemoveModalIsOpen] =
    useState(false);
  const [removedUserData, setRemovedUserData] = useState({
    id: '',
    userName: ''
  });

  const {
    userName,
    userEmail,
    groupId,
    singlePayee,
    tableGuid,
    diningOptionGuid,
    diningOptionName,
    orderTime
  } = latestAWSPayload;

  const toast = useToast();
  const toastRemoveMember = {
    title: 'Member removed',
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
            Member has been removed
          </Text>
        </Box>
      );
    }
  };

  const toastGuestRemoved = {
    title: 'Guest removed',
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
            You have been removed from the group by another
            member.
          </Text>
        </Box>
      );
    }
  };

  const toastErrorRemoving = {
    title: 'Error Removing',
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
            Something went wrong and we couldn't remove the
            group member.
          </Text>
        </Box>
      );
    }
  };

  useFocusEffect(() => {
    setBottomTabHide(true);
    return () => setBottomTabHide(false);
  });

  useEffect(async () => {
    try {
      const { data } = await API.graphql({
        query: listFoodOrdersByGroupIdQuery(groupId)
      });

      setGroupData(data.listFoodOrders);
      setSinglePayeeData(
        listSinglePayee(data.listFoodOrders)
      );

      setLatestAWSPayload({
        ...data.listFoodOrders.items.find(
          member => member.id === latestAWSPayload.id
        ),
        paymentMethod: latestAWSPayload.paymentMethod
      });

      /* console.log('All Orders', data.listFoodOrders.items); */

      setIsLoading(false);

      if (data.listFoodOrders.items.length <= 1) {
        onOpen();
      }
    } catch (error) {
      console.log(error);
    }
  }, [groupMemberAdded]);

  useFocusEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const { data } = await API.graphql({
          query: listFoodOrdersByGroupIdQuery(groupId)
        });

        setGroupData(data.listFoodOrders);
        setSinglePayeeData(
          listSinglePayee(data.listFoodOrders)
        );

        setLatestAWSPayload(
          data.listFoodOrders.items.find(
            member => member.id === latestAWSPayload.id
          )
        );
      } catch (error) {
        console.log(error);
      }
    }, 15000);

    return () => clearInterval(pollInterval);
  });

  const addInvitedGuest = async guest => {
    let foodOrders;

    try {
      const { data } = await API.graphql({
        query: listFoodOrdersByGroupIdQuery(groupId)
      });

      setGroupData(data.listFoodOrders);

      foodOrders = data.listFoodOrders.items;

      setSinglePayeeData(
        listSinglePayee(data.listFoodOrders)
      );

      setLatestAWSPayload(
        data.listFoodOrders.items.find(
          member => member.id === latestAWSPayload.id
        )
      );
    } catch (error) {
      console.log(error);
    }

    const userFoodOrder = foodOrders.find(
      order => order.id === latestAWSPayload.id
    );

    if (
      userFoodOrder &&
      userFoodOrder.groupId === latestAWSPayload.groupId
    ) {
      // Member of group, allow invite

      const payload = {
        userName: guest.fullName,
        userEmail: guest.email,
        tableGuid,
        diningOptionGuid,
        diningOptionName,
        groupId: groupId,
        inviteAccepted: false,
        singlePayee: false,
        readyToSubmit: false,
        orderSubmitted: false,
        orderTime
      };

      try {
        const { data: addMemberRes } = await API.graphql(
          graphqlOperation(createFoodOrder, {
            input: payload
          })
        );

        setGroupMemberAdded(groupMemberAdded + 1);

        clearInviteForm();

        /* const mockData = {
          name: 'Amaretto Sour',
          foodOrderId: addMemberRes.createFoodOrder.id,
          itemGuid: 'a3ed6981-65d7-4a00-9cb0-7a755ef17a56',
          itemGroupGuid:
            '3fdb84ba-9536-4044-9c32-072b4f9a8411',
          price: 14,
          quantity: 1
        };
  
        const { data: addMockSelectionRes } =
          await API.graphql(
            graphqlOperation(createSelection, {
              input: mockData
            })
          ); */
      } catch (error) {
        console.log('Error adding a group member');
        console.log(error);
      }
    } else {
      // Not member of group, display toast and update

      onClose();
      setLatestAWSPayload(userFoodOrder);
      setGroupData({ items: [userFoodOrder] });

      Toast.show(toastGuestRemoved);
    }
  };

  const listSinglePayee = data => {
    const singlePayees = data
      ? data.items.filter(member => member.singlePayee)
      : {};

    return singlePayees;
  };

  const onPress = (isFocused, key, name, actionSheet) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate({
        name: name,
        merge: true
      });
    }
    actionSheet && onClose();
  };

  const onLongPress = key => {
    navigation.emit({
      type: 'tabLongPress',
      target: key
    });
  };

  const handleNameChange = event => {
    const { text } = event.nativeEvent;
    setName(text);
  };

  const handleEmailChange = event => {
    const { text } = event.nativeEvent;
    setEmail(text);
  };

  const handlePhoneChange = event => {
    const { text } = event.nativeEvent;
    setPhone(text);
  };

  const clearInviteForm = () => {
    setName('');
    setEmail('');
    setPhone('');
  };

  const handlePickUpGroupTabChange = async () => {
    if (!pickUpGroupTab) {
      // User is checking the box, so we need to see if there is an existing singlePayee. If not, update this user's singlePayee to true

      try {
        const { data } = await API.graphql({
          query: listFoodOrdersByGroupIdQuery(groupId)
        });

        setGroupData(data.listFoodOrders);
        setSinglePayeeData(
          listSinglePayee(data.listFoodOrders)
        );

        if (listSinglePayee(data.listFoodOrders) < 1) {
          const { data } = await API.graphql(
            graphqlOperation(updateFoodOrder, {
              input: {
                id: latestAWSPayload.id,
                singlePayee: true
              }
            })
          );

          setPickUpGroupTab(true);

          setLatestAWSPayload({
            ...data.updateFoodOrder,
            paymentMethod: latestAWSPayload.paymentMethod
          });
        }
      } catch (error) {
        console.log(
          'Error handling pickup tab change',
          error
        );
        console.log(error);
      }
    } else {
      // User is unchecking the box, so we need to update the users singlePayee to false

      try {
        const { data } = await API.graphql(
          graphqlOperation(updateFoodOrder, {
            input: {
              id: latestAWSPayload.id,
              singlePayee: false
            }
          })
        );

        setPickUpGroupTab(false);

        setLatestAWSPayload({
          ...data.updateFoodOrder,
          paymentMethod: latestAWSPayload.paymentMethod
        });
      } catch (error) {
        console.log('Error updating food order');
        console.log(error);
      }
    }
  };

  const handleRemoveFromGroup = async () => {
    const { id, userName } = removedUserData;

    let foodOrders;

    try {
      const { data } = await API.graphql({
        query: listFoodOrdersByGroupIdQuery(groupId)
      });

      setGroupData(data.listFoodOrders);

      foodOrders = data.listFoodOrders.items;

      setSinglePayeeData(
        listSinglePayee(data.listFoodOrders)
      );

      setLatestAWSPayload(
        data.listFoodOrders.items.find(
          member => member.id === latestAWSPayload.id
        )
      );
    } catch (error) {
      console.log(error);
      console.log('error getting groupdata');
    }

    const userFoodOrder = foodOrders.find(
      order => order.id === latestAWSPayload.id
    );

    if (
      userFoodOrder &&
      userFoodOrder.groupId === latestAWSPayload.groupId
    ) {
      // Still a member of the group, proceed with deleting the target member

      const newGroupId = newUUID();

      try {
        const { data: updateRemovedUserFoodOrder } =
          await API.graphql(
            graphqlOperation(updateFoodOrder, {
              input: {
                id: id,
                groupId: newGroupId
              }
            })
          );

        toast.show(toastRemoveMember);

        const newGroupData = groupData.items.filter(
          member =>
            member.id !==
            updateRemovedUserFoodOrder.updateFoodOrder.id
        );

        setGroupData({ items: newGroupData });
      } catch (error) {
        console.log(error);
        console.log('Handle error here');
        Toast.show(toastErrorRemoving);
      }

      // still a member of the group and can delete
      // if yes, generate new / change the other members groupId
      // remove the newly removed member's data from the group data
    } else {
      // This user has been removed from the group first. Update latestAWSPayload / groupData and alert user to removal

      setLatestAWSPayload(userFoodOrder);
      setGroupData({ items: [userFoodOrder] });

      Toast.show(toastGuestRemoved);
    }

    setRemovedUserData({ id: '', userName: '' });
  };

  const GroupMember = props => {
    const {
      userName,
      inviteAccepted,
      singlePayee,
      id,
      selections
    } = props;

    /* console.log('Group Member Props', selections); */

    return (
      <Box
        py="3"
        borderBottomWidth="2"
        borderBottomColor={useColorModeValue(
          'brand.lightgray',
          'brand.mediumGrayOnWhite'
        )}
        mb="1"
      >
        <HStack
          space="3"
          px="3"
          mb="2"
          justifyContent="flex-start"
          width="100%"
        >
          <Pressable
            onPress={() => {
              setRemovedUserData({ id, userName });
              setRemoveModalIsOpen(!removeModalIsOpen);
            }}
          >
            <Center
              backgroundColor="brand.purple"
              borderRadius="full"
              p="1"
            >
              <TrashIcon size="xs" />
            </Center>
          </Pressable>
          <VStack
            justifyContent="center"
            pe="2"
            width="100%"
          >
            <HStack
              justifyContent="space-between"
              with="100%"
            >
              <Text
                bold
                fontWeight="900"
                fontSize="20"
                lineHeight="20"
              >
                {userName}
              </Text>
              {selections?.length > 0 && (
                <Text bold pr="6">
                  {formatCurrency(getPriceOfTab(props))}
                </Text>
              )}
            </HStack>

            {inviteAccepted ? (
              <VStack space="4" mt="4">
                {selections?.length > 0 ? (
                  selections.map((selection, index) => {
                    return (
                      <HStack
                        space="4"
                        justifyContent="space-between"
                        width="100%"
                        key={`${selection.id}`}
                      >
                        <HStack space="4">
                          <Box>
                            <Text bold>
                              {selection.quantity}x
                            </Text>
                          </Box>
                          <VStack>
                            <Text
                              textTransform="uppercase"
                              bold
                            >
                              {selection.name}
                            </Text>
                            {/* Map Through Modifiers if they exist <Text>Modifier 1</Text> */}
                          </VStack>
                        </HStack>
                        <Box>
                          <Text pr="6">
                            {formatCurrency(
                              selection.price *
                                selection.quantity
                            )}
                          </Text>
                        </Box>
                      </HStack>
                    );
                  })
                ) : (
                  <Text> No Selections</Text>
                )}
              </VStack>
            ) : (
              <Text>Invite pending</Text>
            )}
          </VStack>
        </HStack>
        {id === latestAWSPayload.id &&
          groupData?.items?.length > 1 &&
          singlePayeeData.length <= 1 && (
            <HStack
              space="3"
              px="4"
              py="4"
              backgroundColor="brand.green"
            >
              <Checkbox
                isChecked={pickUpGroupTab}
                value={pickUpGroupTab}
                onChange={() => {
                  handlePickUpGroupTabChange();
                  setPickUpGroupTab(!pickUpGroupTab);
                }}
                accessibilityLabel="Pick Up Group Tab"
              />

              <VStack space="2">
                <Text
                  fontWeight="800"
                  color="brand.white"
                  textTransform="uppercase"
                >
                  Pick Up Group Tab (
                  {formatCurrency(
                    getPriceOfAllTabs(groupData.items)
                  )}
                  )
                </Text>
                <Text color="brand.white">
                  This will take items for your entire group
                  and add them to your tab
                </Text>
              </VStack>
            </HStack>
          )}

        {id === latestAWSPayload.id &&
          groupData?.items?.length > 1 &&
          singlePayeeData.length > 1 && (
            <HStack
              space="4"
              px="4"
              py="4"
              backgroundColor="brand.blue"
            >
              <VStack space="2">
                <Text
                  fontWeight="800"
                  color="brand.white"
                  textTransform="uppercase"
                >
                  Your tab has been picked up
                </Text>
                <Text color="brand.white">
                  {singlePayeeData[0].userName} has elected
                  to pick up your tab.
                </Text>
              </VStack>
            </HStack>
          )}
      </Box>
    );
  };

  return (
    <VStack borderWidth={0} flex={1} safeArea>
      <HStack
        // width="100%"
        justifyContent="space-between"
        alignItems="flex-end"
        style={styles.header}
      >
        <HStack
          alignItems="flex-start"
          borderBottomColor="black"
        >
          <Pressable
            justifyContent="center"
            borderWidth={0}
            marginLeft={0}
            onPress={navigation.goBack}
          >
            <ChevronLeftIcon size="lg" />
          </Pressable>
          <Heading
            variant="header2"
            fontSize="lg"
            lineHeight="42px"
          >
            Group
          </Heading>
        </HStack>
        <HStack justifyContent="center">
          <TouchableOpacity
            accessibilityRole="button"
            ß
            accessibilityLabel="Invite"
            onPress={onOpen}
          >
            <Text color="brand.green" bold>
              Invite
            </Text>
          </TouchableOpacity>
        </HStack>
      </HStack>

      <Box px="4">
        {groupData?.items?.length > 1 ? (
          <>
            {groupData.items
              .filter(
                member =>
                  member.userName === userName &&
                  member.userEmail === userEmail
              )
              .map((member, index) => {
                return (
                  <GroupMember
                    {...member}
                    key={`groupmember-thisuser-${index}`}
                  />
                );
              })}
            {groupData.items
              .filter(
                member =>
                  member.userName !== userName &&
                  member.userEmail !== userEmail
              )
              .map((member, index) => {
                return (
                  <GroupMember
                    {...member}
                    key={`groupmember-${index}`}
                  />
                );
              })}
          </>
        ) : isLoading ? (
          <Spinner color="brand.green" size="lg" />
        ) : (
          <Text>
            You are currently not dining with anyone.
          </Text>
        )}
      </Box>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <ScrollView w={'100%'}>
            <VStack px={4} space={4} alignItems="center">
              <GroupIcon size="md" />
              <Text
                textAlign="center"
                fontSize={24}
                lineHeight={24}
                bold
              >
                Group Order
              </Text>
              <Text textAlign="center">
                To add to your group, provide their name and
                email address below:
              </Text>
            </VStack>
            <VStack space={6} p={4}>
              <FormControl>
                <FormControl.Label>
                  Their Full Name:
                </FormControl.Label>
                <Input
                  variant="ecomInput"
                  placeholder=""
                  value={name}
                  onChange={handleNameChange}
                  placeholderTextColor="brand.lightGrayOnBlack"
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  Their Email Address:
                </FormControl.Label>
                <Input
                  variant="ecomInput"
                  keyboardType="email-address"
                  placeholder=""
                  value={email}
                  type="email"
                  onChange={handleEmailChange}
                  placeholderTextColor="brand.lightGrayOnBlack"
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>
                  Their Phone Number:
                </FormControl.Label>
                <Input
                  variant="ecomInput"
                  keyboardType="phone-pad"
                  placeholder=""
                  value={phone}
                  type="number"
                  onChange={handlePhoneChange}
                  placeholderTextColor="brand.lightGrayOnBlack"
                />
              </FormControl>

              <Button
                variant="purple"
                _text={{ color: 'brand.dark' }}
                isDisabled={
                  name.length < 3 ||
                  !verifyEmail(email) ||
                  phone.length < 10
                }
                onPress={() =>
                  addInvitedGuest({
                    fullName: name,
                    email,
                    phone,
                    inviteAccepted: false,
                    singlePayee: false
                  })
                }
                _disabled={{
                  bg: 'brand.lightGrayOnBlack',
                  opacity: 1,
                  _text: { opacity: 0.4 }
                }}
              >
                Invite to Group
              </Button>
            </VStack>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
      <CustomModal
        headingText={`Are you sure you want to remove ${removedUserData.userName}?`}
        bodyText="Once removed, the other member will not have access to the group."
        confirmText={<Text>YES</Text>}
        isOpen={removeModalIsOpen}
        toggleIsOpen={() =>
          setRemoveModalIsOpen(!removeModalIsOpen)
        }
        confirmOnPress={handleRemoveFromGroup}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    elevation: 3,
    position: 'relative',
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    marginBottom: 20
  }
});

export default GroupOrdering;
