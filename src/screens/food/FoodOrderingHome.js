import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import {
  Actionsheet,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Radio,
  ScrollView,
  Select,
  Text,
  useColorModeValue,
  useDisclose,
  useTheme,
  VStack
} from 'native-base';
import BrandGradientIcon from '../../components/SplashGradientIcon';
import darkKitchen from '../../../assets/images/4M-Logo-Kitchens-Logo-GradientBlk.png';
import lightKitchen from '../../../assets/images/4M-Logo-Kitchens-Logo-GradientWht.png';
import heroImage from '../../../assets/images/foodorderinghome.png';
import { ToastContext } from '../../helpers/ToastContext';
import { AppContext } from '../../helpers/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import {
  formatDate,
  formatDateToTime,
  verifyEmail
} from '../../helpers/formatStrings';

import { useFocusEffect } from '@react-navigation/native';
import DineInIcon from '../../../assets/icons/DineInIcon';
import PickUpIcon from '../../../assets/icons/PickUpIcon';
import InfoIcon from '../../../assets/icons/InfoIcon-v2';
import Banner from '../../components/Banner';
import EmergencyIcon from '../../../assets/icons/EmergencyIcon-v2';

import { API, graphqlOperation } from 'aws-amplify';
import { createFoodOrder } from '../../graphql/mutations';
import newUUID from '../../helpers/newUUID';
import { testFoodOrdersByFoodOrderIdQuery } from '../../helpers/ToastContextHelpers';
import {
  TAKE_OUT,
  TAKE_OUT_NAME,
  DINE_IN,
  DINE_IN_NAME
} from '../../constants/food';

/* NEED TO CLEANUP OPENING AND CLOSING OBJ WITHIN FUNCTIONS */

const FoodOrderingHome = ({ navigation, route }, props) => {
  const { guid: selectedMenuGuid, isReward } =
    route.params ?? {};
  const { isOpen, onOpen, onClose } = useDisclose();
  const [diningOption, setDiningOption] = useState('');
  const [
    scheduledAvailableBlocks,
    setScheduledAvailableBlocks
  ] = useState(null);
  const [minimumStartTime, setMinimumStartTime] =
    useState(null);
  const [closingBanner, setClosingBanner] = useState(false);
  const [closedBanner, setClosedBanner] = useState(false);

  const {
    tables,
    setSelectedTable,
    setSelectedDiningOption,
    customerData,
    setCustomerData,
    setOrderTime,
    restaurant,
    diningOptions,
    openTimes,

    addItemToOrder,
    latestAWSPayload,
    setLatestAWSPayload
  } = useContext(ToastContext);
  const { user } = useContext(AppContext);

  useFocusEffect(() => {
    if (latestAWSPayload.hasOwnProperty('id')) {
      navigation.navigate('FoodMenuHome');
    }
  });

  useEffect(() => {
    setAvailableBlocks();

    const now = new Date();

    const closingSet = openTimes.closeTime.split(':');

    const closingObj = new Date(
      now.getFullYear(),
      now.getMonth(),
      closingSet[0] === '00'
        ? now.getDate() + 1
        : now.getDate(),
      closingSet[0],
      closingSet[1],
      0,
      0
    );

    const timeDiffInMinutes =
      (closingObj - now) / 1000 / 60;

    if (timeDiffInMinutes <= 60 && timeDiffInMinutes > 0) {
      // closing banner
      setClosingBanner(true);
      setClosedBanner(false);
    } else if (timeDiffInMinutes <= 0) {
      // closed banner
      setClosedBanner(true);
      setClosingBanner(false);
    } else {
      setClosingBanner(false);
      setClosedBanner(false);
    }
  }, [openTimes]);

  const { colors } = useTheme();
  const background = useColorModeValue(
    colors.brand.white,
    colors.brand.dark
  );
  const border = useColorModeValue(
    colors.brand.lightgray,
    colors.brand.darkgray
  );

  const setAvailableBlocks = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const closingSet = openTimes.closeTime.split(':');
    const closingObj = new Date(
      now.getFullYear(),
      now.getMonth(),
      closingSet[0] === '00'
        ? now.getDate() + 1
        : now.getDate(),
      closingSet[0],
      closingSet[1],
      0,
      0
    );

    const openingSet = openTimes.openTime.split(':');
    const openingObj = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      openingSet[0],
      openingSet[1],
      0,
      0
    );

    const minimumStart = new Date();

    if (openingObj.valueOf() > now.valueOf()) {
      // Order happening before opening
      minimumStart.setHours(openingObj.getHours());
      minimumStart.setMinutes(openingObj.getMinutes() + 30);
    } else {
      // Order happening after opening
      if (minutes < 30) {
        // minumum start time is +1 hour, 0 minutes
        // If accessing at 12:01, minimum start time would be 1pm
        minimumStart.setHours(hours + 1, 0, 0, 0);
      } else {
        // minimum start time is +1 hour, 30 minutes
        // If accessing at 12:45, minimum start time would be 1:30
        minimumStart.setHours(hours + 1, 30, 0, 0);
      }
    }

    setMinimumStartTime(minimumStart);

    const hoursRemaining =
      (closingObj - minimumStart) / 1000 / 60 / 60;

    const availableBlocks = hoursRemaining * 2;

    let returnedBlocks = [];

    for (let i = 0; i < availableBlocks + 1; i++) {
      const availableDate = new Date(minimumStart);
      availableDate.setMinutes(
        availableDate.getMinutes() + 30 * i
      );

      returnedBlocks.push({
        availableDate,
        formatedDate: formatDateToTime(availableDate)
      });
    }

    setScheduledAvailableBlocks(returnedBlocks);
  };

  const tablesArray = Object.entries(tables);
  const filteredDiningOptions = diningOptions.filter(
    option =>
      option.behavior === TAKE_OUT ||
      option.behavior === DINE_IN
  );

  const handleDiningOptionChoice = option => {
    setDiningOption(option);
    onOpen();
  };

  const handleStartOrderAWS = async (
    table,
    name,
    email,
    time
  ) => {
    // Dining Option guid
    const { guid: diningOptionGuid } =
      filteredDiningOptions.filter(
        option => option.behavior === diningOption
      )[0];

    // Time for order
    const timeForOrder =
      diningOption === DINE_IN ? new Date() : time;

    // Table for order
    let tableGuid = '';

    if (diningOption === DINE_IN) {
      // pass table if dine-in
      if (table) {
        const tableGUID = tablesArray.filter(
          tableItem => tableItem[1].name === table
        );

        tableGuid = tableGUID[0][1].guid;
      }
    }

    // Generate unique group id
    const groupId = newUUID();

    // Define Payload
    const payload = {
      diningOptionGuid: diningOptionGuid,
      diningOptionName: diningOption,
      tableGuid,
      userName: name,
      userEmail: email,
      groupId,
      orderTime: timeForOrder,
      orderSubmitted: false,
      inviteAccepted: true,
      singlePayee: false,
      readyToSubmit: false
    };

    try {
      const { data } = await API.graphql(
        graphqlOperation(createFoodOrder, {
          input: payload
        })
      );

      console.log(
        'AWS FoodOrder Data',
        data.createFoodOrder.id
      );

      try {
        setLatestAWSPayload({
          ...data.createFoodOrder,
          paymentMethod: latestAWSPayload.paymentMethod
        });
      } catch (error) {
        console.log('Error Setting Latest Payload');
        console.log(error);
      }

      onClose();
      navigation.navigate(
        'FoodMenuHome',
        selectedMenuGuid && isReward
          ? {
              selectTab: 'Reward',
              selectMenuId: selectedMenuGuid
            }
          : {}
      );
    } catch (error) {
      console.log(
        '### Problem Creating Initial Food Order'
      );
      console.log(error);
    }
  };

  const handleStartOrder = (table, name, time) => {
    const { entityType, guid } =
      filteredDiningOptions.filter(
        option => option.name === diningOption
      )[0];

    setSelectedDiningOption({
      entityType,
      guid,
      name: diningOption
    });

    let passingTable = {};

    let firstName;
    let lastName;

    // pass name

    if (name.indexOf(' ') <= 0) {
      firstName = name;
      lastName = 'Not Provided';
    } else {
      firstName = name.substring(0, name.indexOf(' '));
      lastName = name.substring(name.indexOf(' ') + 1);
    }

    setCustomerData({
      ...customerData,
      firstName,
      lastName
    });

    // pass dining
    if (diningOption === DINE_IN) {
      // pass table if dine-in
      if (table) {
        const tableGUID = tablesArray.filter(
          tableItem => tableItem[1].name === table
        );
        setSelectedTable({
          entityType: tableGUID[0][1].entityType,
          guid: tableGUID[0][1].guid,
          name: table
        });

        passingTable = {
          entityType: tableGUID[0][1].entityType,
          guid: tableGUID[0][1].guid,
          name: table
        };
      }

      setOrderTime(new Date());
    }

    if (diningOption === TAKE_OUT) {
      setOrderTime(time);
    }

    const timeForOrder =
      diningOption === DINE_IN ? new Date() : time;
  };

  const now = new Date();
  const closingSet = openTimes.closeTime.split(':');
  const closingObj = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    closingSet[0],
    closingSet[1],
    0,
    0
  );

  const openingSet = openTimes.openTime.split(':');
  const openingObj = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    openingSet[0],
    openingSet[1],
    0,
    0
  );

  const TypeActionSheet = props => {
    const {
      option,
      handleStartOrder,
      userName,
      userEmail,
      minimumStartTime,
      scheduledAvailableBlocks
    } = props;
    const { openTime, closeTime } = props.openTimes;
    const { colors } = useTheme();

    useEffect(() => {
      userName &&
        userName !== '' &&
        userName !== 'Guest' &&
        setName(userName);
      userEmail && userEmail !== '' && setEmail(userEmail);
    }, []);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [table, setTable] = useState('');
    const [pickUpSelection, setPickUpSelection] =
      useState('immediate');
    const [scheduledTime, setScheduledTime] =
      useState(null);

    useEffect(() => {
      setScheduledTime(minimumStartTime);
    }, [minimumStartTime]);

    const handleNameChange = event => {
      const { text } = event.nativeEvent;

      setName(text);
    };

    const handleEmailChange = event => {
      const { text } = event.nativeEvent;

      setEmail(text);
    };

    const handleScheduleButton = option => {
      setScheduledTime(option);
    };

    return (
      <Actionsheet
        isOpen={isOpen}
        onClose={onClose}
        size="full"
      >
        <Actionsheet.Content px={0}>
          <VStack space={4} mb={4} width="100%">
            <VStack px={4} space={4} alignItems="center">
              {option === DINE_IN ? (
                <DineInIcon size="md" />
              ) : (
                <PickUpIcon size="md" />
              )}
              <Text
                textAlign="center"
                fontSize={24}
                lineHeight={24}
                bold
              >
                {option === DINE_IN
                  ? DINE_IN_NAME
                  : TAKE_OUT_NAME}
              </Text>

              <Text textAlign="center">
                {option === DINE_IN
                  ? 'Please input your table number or scan the QR code at your table  to begin your Dine In order.'
                  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor, purus rhoncus volutpat sagittis.'}
              </Text>
            </VStack>
            {option === DINE_IN && (
              <VStack space={6} px={4}>
                <FormControl>
                  <FormControl.Label>
                    Full Name:
                  </FormControl.Label>
                  <Input
                    variant="ecomInput"
                    placeholder={
                      userName &&
                      userName !== '' &&
                      userName !== 'Guest'
                        ? userName
                        : ''
                    }
                    value={
                      userName &&
                      userName !== '' &&
                      userName !== 'Guest'
                        ? userName
                        : name
                    }
                    onChange={handleNameChange}
                    placeholderTextColor="brand.lightGrayOnBlack"
                  />
                </FormControl>
                {(!userEmail || userEmail === '') && (
                  <FormControl
                    isInvalid={
                      email.length !== 0 &&
                      !verifyEmail(email)
                    }
                  >
                    <FormControl.Label>
                      Email Address:
                    </FormControl.Label>
                    <Input
                      placeholder=""
                      onChange={handleEmailChange}
                      autoCapitalize="none"
                      value={email}
                      keyboardType={'email-address'}
                      variant={'ecomInput'}
                    />
                    <FormControl.ErrorMessage
                      _text={{ color: 'brand.dark' }}
                      backgroundColor="#FF8888"
                      p="3"
                      leftIcon={<EmergencyIcon size="xs" />}
                      _stack={{
                        space: 2,
                        alignItems: 'flex-start'
                      }}
                    >
                      Please enter a valid email address.
                    </FormControl.ErrorMessage>
                  </FormControl>
                )}
                <FormControl>
                  <FormControl.Label>
                    Select Table/Patio/Bar Seat Number:
                  </FormControl.Label>
                  <Select
                    variant="ecomSelect"
                    selectedValue={table}
                    placeholder=""
                    onValueChange={itemValue =>
                      setTable(itemValue)
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
                  isDisabled={
                    name.length < 3 ||
                    table === '' ||
                    !verifyEmail(email)
                  }
                  onPress={() =>
                    handleStartOrderAWS(
                      table,
                      name,
                      email,
                      null
                    )
                  }
                  _disabled={{
                    bg: 'brand.lightGrayOnBlack',
                    opacity: 1,
                    _text: { opacity: 0.4 }
                  }}
                >
                  Start Order
                </Button>
              </VStack>
            )}
            {option === TAKE_OUT && (
              <VStack space={6}>
                <FormControl px={4}>
                  <FormControl.Label>
                    Full Name:
                  </FormControl.Label>
                  <Input
                    variant="ecomInput"
                    placeholder={
                      userName &&
                      userName !== '' &&
                      userName !== 'Guest'
                        ? userName
                        : ''
                    }
                    value={
                      userName &&
                      userName !== '' &&
                      userName !== 'Guest'
                        ? userName
                        : name
                    }
                    onChange={handleNameChange}
                    placeholderTextColor="brand.lightGrayOnBlack"
                  />
                </FormControl>
                {(!userEmail || userEmail === '') && (
                  <FormControl
                    isInvalid={
                      email.length !== 0 &&
                      !verifyEmail(email)
                    }
                  >
                    <FormControl.Label>
                      Email Address:
                    </FormControl.Label>
                    <Input
                      placeholder=""
                      onChange={handleEmailChange}
                      autoCapitalize="none"
                      value={email}
                      keyboardType={'email-address'}
                      variant={'ecomInput'}
                    />
                    <FormControl.ErrorMessage
                      _text={{ color: 'brand.dark' }}
                      backgroundColor="#FF8888"
                      p="3"
                      leftIcon={<EmergencyIcon size="xs" />}
                      _stack={{
                        space: 2,
                        alignItems: 'flex-start'
                      }}
                    >
                      Please enter a valid email address.
                    </FormControl.ErrorMessage>
                  </FormControl>
                )}
                <HStack
                  width="100%"
                  justifyContent="space-between"
                  px={4}
                >
                  <VStack>
                    {/* Radio Group */}

                    <Radio.Group
                      value={pickUpSelection}
                      onChange={nextValue => {
                        setPickUpSelection(nextValue);
                      }}
                      _radio={{
                        my: 0.5,
                        ml: 1.5,
                        colorScheme: 'brandPurple',
                        _text: {
                          lineHeight: 15
                        }
                      }}
                    >
                      <Radio value="immediate" my={1}>
                        <Text pl={2}>Immediately:</Text>
                      </Radio>
                      <Radio value="schedule" my={1}>
                        <Text pl={2}>
                          Or scheduled for:
                        </Text>
                      </Radio>
                    </Radio.Group>
                  </VStack>
                  <VStack
                    justifyContent={'space-around'}
                    alignItems="flex-end"
                    my={1.5}
                  >
                    {/* Time Displays */}
                    {minimumStartTime &&
                    pickUpSelection === 'immediate' ? (
                      <Text
                        bold
                        textTransform={'uppercase'}
                        lineHeight={15}
                      >
                        Approx.{' '}
                        {formatDateToTime(minimumStartTime)}
                      </Text>
                    ) : (
                      <Text lineHeight={15}></Text>
                    )}

                    {scheduledTime &&
                    pickUpSelection === 'schedule' ? (
                      <Text
                        bold
                        textTransform={'uppercase'}
                        lineHeight={15}
                      >
                        {formatDateToTime(scheduledTime)}
                      </Text>
                    ) : (
                      <Text lineHeight={15}></Text>
                    )}
                  </VStack>
                </HStack>
                {scheduledTime && (
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    width="100%"
                  >
                    <LinearGradient
                      colors={[
                        colors.brand.orange,
                        colors.brand.purple
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        borderRadius: 50,
                        marginHorizontal: 16
                      }}
                    >
                      {scheduledAvailableBlocks && (
                        <Button.Group isAttached>
                          {scheduledAvailableBlocks.map(
                            (block, index) => {
                              return (
                                <Button
                                  flex={1}
                                  borderWidth="2"
                                  borderColor="brand.lightgray"
                                  backgroundColor={
                                    block.availableDate.toString() ===
                                      scheduledTime.toString() &&
                                    pickUpSelection !==
                                      'immediate'
                                      ? useColorModeValue(
                                          'brand.dark',
                                          'brand.white'
                                        )
                                      : useColorModeValue(
                                          'brand.white',
                                          'brand.dark'
                                        )
                                  }
                                  _text={{
                                    lineHeight: '15',
                                    py: 2,
                                    color:
                                      block.availableDate.toString() ===
                                        scheduledTime.toString() &&
                                      pickUpSelection !==
                                        'immediate'
                                        ? useColorModeValue(
                                            'brand.white',
                                            'brand.dark'
                                          )
                                        : useColorModeValue(
                                            'brand.dark',
                                            'brand.white'
                                          )
                                  }}
                                  key={`${block.hourOffset}-${block.halfHourOffset}-${index}`}
                                  onPress={() => {
                                    handleScheduleButton(
                                      block.availableDate
                                    );
                                    setPickUpSelection(
                                      'schedule'
                                    );
                                  }}
                                >
                                  {block.formatedDate}
                                </Button>
                              );
                            }
                          )}
                        </Button.Group>
                      )}
                    </LinearGradient>
                  </ScrollView>
                )}

                <Box px={4}>
                  <Button
                    variant="purple"
                    _text={{ color: 'brand.dark' }}
                    isDisabled={
                      name.length < 3 || !verifyEmail(email)
                    }
                    onPress={() =>
                      handleStartOrderAWS(
                        null,
                        name,
                        email,
                        scheduledTime
                      )
                    }
                    _disabled={{
                      bg: 'brand.lightGrayOnBlack',
                      opacity: 1,
                      _text: { opacity: 0.4 }
                    }}
                  >
                    Start Order
                  </Button>
                </Box>
              </VStack>
            )}
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    );
  };

  return (
    <VStack flex={1} space={6} justifyContent="flex-end">
      <Banner
        color="brand.orange"
        heading="Venue closes at 11:00PM"
        icon={<InfoIcon size="xs" />}
        show={closingBanner}
      />
      <Banner
        color="brand.orange"
        heading="Venue is closed"
        icon={<InfoIcon size="xs" />}
        show={closedBanner}
      />
      <Box
        position="absolute"
        height="100%"
        width="100%"
        z-Index={-2}
      >
        <Image source={heroImage} size="full" alt="4m" />
      </Box>
      <Box
        position="absolute"
        height="100%"
        width="100%"
        z-Index={-1}
        bg={{
          linearGradient: {
            colors: useColorModeValue(
              ['brand.white', 'brand.white', 'transparent'],
              ['brand.dark', 'brand.dark', 'transparent']
            ),
            start: [0.5, 1],
            end: [0.5, 0.6]
          }
        }}
      />

      <VStack space={6}>
        <VStack alignItems="center" space={2} px={4}>
          <Box width="65%">
            <Image
              source={useColorModeValue(
                darkKitchen,
                lightKitchen
              )}
              alt="4m"
              size={'xs'}
              width="100%"
              resizeMode="contain"
            />
          </Box>
          {/* <Text textAlign={'center'}>
            Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Tempor, purus rhoncus volutpat
            sagittis.
          </Text> */}
          <Link
            my="3"
            justifyContent={'center'}
            variant="green"
            onPress={() => {
              navigation.navigate(
                'FoodMenuHome',
                selectedMenuGuid && isReward
                  ? {
                      selectTab: 'Rewards',
                      selectMenuId: selectedMenuGuid
                    }
                  : {}
              );
            }}
          >
            View Menus
          </Link>
        </VStack>
        <HStack justifyContent="center" space={4} mb={4}>
          <Button
            variant="purple"
            width="45%"
            _text={{
              color: 'brand.dark'
            }}
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
            onPress={
              () => handleDiningOptionChoice(DINE_IN)
              /* navigation.navigate('TabConfirmation') */
            }
            /* Comment Out Below to Test Outside Normal Hours */
            // isDisabled={
            //   now > closingObj || now < openingObj
            // }
          >
            {DINE_IN_NAME}
          </Button>
          <Button
            variant="purple"
            width="45%"
            _text={{
              color: 'brand.dark'
            }}
            onPress={() =>
              handleDiningOptionChoice(TAKE_OUT)
            }
            isDisabled={
              scheduledAvailableBlocks &&
              scheduledAvailableBlocks?.length < 1
            }
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
          >
            {TAKE_OUT_NAME}
          </Button>
        </HStack>
      </VStack>
      <TypeActionSheet
        option={diningOption}
        handleStartOrder={handleStartOrder}
        userName={user.name}
        userEmail={user.email}
        openTimes={openTimes}
        scheduledAvailableBlocks={scheduledAvailableBlocks}
        minimumStartTime={minimumStartTime}
      />
    </VStack>
  );
};

export default FoodOrderingHome;
