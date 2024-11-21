import {
  Box,
  Heading,
  Button,
  Text,
  VStack,
  View,
  HStack,
  Image,
  useColorModeValue,
  ScrollView,
  useToast,
  Spinner
} from 'native-base';

import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { Platform, StyleSheet } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import FoodLogo from '../../../assets/images/fallBackFoodLogo.png';
import FallbackImg from '../../../assets/images/4m-default-food-image.png';
import { ToastContext } from '../../helpers/ToastContext';
import {
  getModiferOptions,
  getModifers
} from '../../helpers/toastApiCalls';
import MinusIcon from '../../../assets/icons/MinusIcon';
import PlusIcon from '../../../assets/icons/PlusIcon';
import TabIcon from '../../../assets/icons/TabIcon';
import CancelIcon from '../../../assets/icons/CancelIcon';
import { AppContext } from '../../helpers/AppContext';
import { useFocusEffect } from '@react-navigation/native';
import { formatCurrency } from '../../helpers/formatStrings';
import { API, graphqlOperation } from 'aws-amplify';
import { createSelection } from '../../graphql/mutations';
import AllergenTags from '../../components/Food/AllergenTags';
import {
  listFoodOrdersByFoodOrderIdQuery,
  parseModifierOptionData,
  testFoodOrdersByFoodOrderIdQuery
} from '../../helpers/ToastContextHelpers';
import OrderOptionsBox from '../../components/Food/OrderOptionsBox';
import ImageHeaderScrollView, {
  TriggeringView
} from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 90;
const MAX_HEIGHT = 250;

let selectedOptionValues = [];

const MenuItemTemplate = ({ navigation, route }, props) => {
  const { setBottomTabHide } = useContext(AppContext);

  const [optionsData, setOptionsData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(
    []
  );
  const [addedPrice, setAddedPrice] = useState(0);
  const [isFetching, setFetching] = useState(false);
  const [isRequiredSatisfied, setIsRequiredSatisfied] =
    useState(true);

  const toast = useToast();
  const tabAddItem = {
    title: 'Item Added to Tab!',
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
            Item Added to Tab!
          </Text>
        </Box>
      );
    }
  };

  useFocusEffect(() => {
    setBottomTabHide(true);

    return () => setBottomTabHide(false);
  });

  const {
    payload,
    contentful,

    foodLineData
  } = route.params;

  const { latestAWSPayload, setLatestAWSPayload } =
    useContext(ToastContext);

  const isActiveOrder =
    latestAWSPayload.hasOwnProperty('id');

  const {
    description,
    image,
    itemTags,
    modifierGroupReferences: itemModifierGroupReferences,
    name,
    price,
    guid
  } = payload.item;

  /* console.log('Payload Item', payload.item); */
  const { group: groupGUID } = payload;
  const { groupImage } = payload;

  const [qty, setQty] = useState(1);

  const handleQuantityChange = type => {
    if (type === '-' && qty > 1) {
      setQty(qty - 1);
    }

    if (type === '+') {
      setQty(qty + 1);
    }
  };

  const handleAddToTabAWS = async () => {
    const awsPayload = {
      name,
      foodOrderId: latestAWSPayload.id,
      itemGuid: guid,
      itemGroupGuid: groupGUID,
      price: payload.item.price + addedPrice,
      quantity: qty,
      modifiers: JSON.stringify(selectedOptionValues)
    };

    try {
      const { data: createRes } = await API.graphql(
        graphqlOperation(createSelection, {
          input: awsPayload
        })
      );

      console.log('Create Selection Response', createRes);

      const { data: payloadRes } = await API.graphql(
        testFoodOrdersByFoodOrderIdQuery(
          latestAWSPayload.id
        )
      );

      console.log('AWS Payload Response', payloadRes);

      setLatestAWSPayload({
        ...(payloadRes.listFoodOrders.items[0] ?? {}),
        paymentMethod: latestAWSPayload.paymentMethod
      });

      /* toast.show(tabAddItem);*/
      selectedOptionValues = [];
      navigation.goBack();
    } catch (error) {
      console.log('Error Creating Selection');
      console.log(error);
      selectedOptionValues = [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      const data = await getModifers();
      const options = await getModiferOptions();
      let groupData = itemModifierGroupReferences.map(
        id => {
          const item = data[id];
          item.modifierOptionsData =
            item.modifierOptionReferences.map(
              optId => options[optId]
            );
          return item;
        }
      );
      setOptionsData(groupData);
      setFetching(false);
    };
    selectedOptionValues = [];
    fetchData();
  }, []);

  const handleSelectOption = useCallback(
    (item, checked, isCheckbox, optionGuid) => {
      let options = Object.assign([], selectedOptionValues);
      if (isCheckbox) {
        const existIndex = options.findIndex(
          opt => opt.selectionId === item.guid
        );
        if (existIndex > -1) {
          options.splice(existIndex, 1);
        }
        if (checked) {
          options.push({
            modifierGuid: optionGuid,
            selectionId: item.guid,
            id: optionGuid,
            value: item.value
          });
        }
      } else {
        const existIndex = options.findIndex(
          opt => opt.modifierGuid === optionGuid
        );
        if (existIndex > -1) {
          options.splice(existIndex, 1);
        }
        if (checked) {
          options.push({
            modifierGuid: optionGuid,
            selectionId: item.guid,
            id: optionGuid,
            value: item.value
          });
        }
      }
      setSelectedOptions([...options]);
      selectedOptionValues = options;

      let priceValues = options.map(item => item.value);
      if (priceValues) {
        const result = priceValues.reduce(
          (total, val) => total + val,
          0
        );
        setAddedPrice(result);
      }
    },
    [selectedOptions.length]
  );

  const navTitleView = useRef(null);

  const colorMode = useColorModeValue(
    'brand.dark',
    'brand.white'
  );

  return (
    <VStack flex={1} safeAreaBottom>
      <ImageHeaderScrollView
        disableHeaderGrow
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <>
            <Image
              h="250"
              w="100%"
              alt="4m"
              source={
                contentful &&
                contentful?.fields?.photo?.fields?.file?.url
                  ? {
                      uri:
                        'https:' +
                        contentful?.fields?.photo?.fields
                          ?.file?.url
                    }
                  : FallbackImg
              }
              resizeMode={'cover'}
            />
          </>
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Pressable
              alignItems="center"
              justifyContent="center"
              borderWidth={0}
              marginRight={4}
              p={2}
              onPress={() => {
                navigation.goBack();
              }}
              position="absolute"
              right={20}
              top={60}
            >
              <CancelIcon size="23px" color="white" />
            </Pressable>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View
            style={styles.navTitleView}
            ref={navTitleView}
          >
            <HStack
              w="100%"
              justifyContent={'space-between'}
              alignItems="center"
              bg="white"
              px={5}
              py="10"
            >
              <Box flex="3">
                <Heading variant="header1" fontSize="md">
                  {name}
                </Heading>
              </Box>
              {isActiveOrder ? (
                <HStack
                  flex="2"
                  justifyContent={'flex-end'}
                  alignItems="center"
                  space="2"
                  mb="3"
                >
                  <Pressable
                    onPress={() => {
                      handleQuantityChange('-');
                    }}
                  >
                    <MinusIcon
                      size="29px"
                      color={
                        qty > 1 ? colorMode : '#ABABAB'
                      }
                    />
                  </Pressable>
                  <Text
                    fontSize="23.04px"
                    lineHeight="20px"
                    fontWeight="400"
                    mt={1}
                    mx={2}
                    fontFamily="CodecPro-Bold"
                  >
                    {qty}
                  </Text>
                  <Pressable
                    onPress={() => {
                      handleQuantityChange('+');
                    }}
                  >
                    <PlusIcon
                      size="29px"
                      color={colorMode}
                    />
                  </Pressable>
                </HStack>
              ) : (
                <Box justifyContent={'center'}>
                  <Text
                    marginBottom="-4px"
                    fontWeight="400"
                    textTransform="uppercase"
                    textAlignVertical="center"
                    textAlign="center"
                    color="brand.dark"
                    fontSize="14.22px"
                    lineHeight="12.21px"
                    fontFamily="CodecPro-Bold"
                  >
                    {`${formatCurrency(
                      price + addedPrice
                    )}`}
                  </Text>
                </Box>
              )}
            </HStack>
          </Animatable.View>
        )}
      >
        <VStack
          flex={1}
          // mt={5}
          px={4}
          pt={5}
          justifyContent="space-between"
          zIndex={9}
          position="relative"
        >
          <ScrollView style={{ overflow: 'visible' }}>
            <HStack
              w="100%"
              justifyContent={'space-between'}
              alignItems="center"
            >
              {/* Environment badge */}
              <Box
                position="relative"
                /* top="-60px" */
                zIndex={10}
                mr="4"
              >
                <Pressable
                  onPress={() => {
                    navigation.navigate(
                      'FoodLineTemplate',
                      foodLineData
                    );
                  }}
                >
                  <Image
                    h="74"
                    w="74"
                    alt="4m"
                    source={
                      groupImage
                        ? { uri: groupImage }
                        : FoodLogo
                    }
                    resizeMode={'cover'}
                    borderRadius={74}
                  />
                </Pressable>
              </Box>
              {/* Heading */}

              <Box flex="3">
                <TriggeringView
                  style={{ marginTop: 0 }}
                  onHide={() => {
                    navTitleView.current.fadeInUp(100);
                  }}
                  onDisplay={() => {
                    navTitleView.current.fadeOutDown(100);
                  }}
                ></TriggeringView>
                <Heading
                  variant="header1"
                  fontSize="lg"
                  fontFamily="CodecPro-Bold"
                  fontWeight="600"
                  lineHeight="24.82px"
                >
                  {name}
                </Heading>
                {!isActiveOrder && (
                  <Box justifyContent={'center'}>
                    <Text
                      marginBottom="-4px"
                      fontWeight="400"
                      textTransform="uppercase"
                      textAlignVertical="center"
                      textAlign="left"
                      color="brand.dark"
                      fontSize="14.22px"
                      lineHeight="12.21px"
                      fontFamily="CodecPro-Bold"
                    >
                      {`${formatCurrency(
                        price + addedPrice
                      )}`}
                    </Text>
                  </Box>
                )}
              </Box>
            </HStack>

            {/* Incrementor */}
            {isActiveOrder && (
              <HStack
                flex="2"
                justifyContent={'center'}
                alignItems="center"
                space="2"
                my="5"
              >
                <Pressable
                  onPress={() => {
                    handleQuantityChange('-');
                  }}
                >
                  <MinusIcon
                    size="29px"
                    color={
                      qty > 1
                        ? useColorModeValue(
                            'brand.dark',
                            'brand.white'
                          )
                        : '#ABABAB'
                    }
                  />
                </Pressable>
                <Text
                  fontSize="23.04px"
                  lineHeight="20px"
                  fontWeight="400"
                  mt={1}
                  mx={2}
                  fontFamily="CodecPro-Bold"
                >
                  {qty}
                </Text>
                <Pressable
                  onPress={() => {
                    handleQuantityChange('+');
                  }}
                >
                  <PlusIcon
                    size="29px"
                    color={useColorModeValue(
                      'brand.dark',
                      'brand.white'
                    )}
                  />
                </Pressable>
              </HStack>
            )}
            <VStack>
              {description ? (
                <Text fontSize="16px" lineHeight="21px">
                  {description}
                </Text>
              ) : null}
              <AllergenTags data={itemTags} />
            </VStack>
            {optionsData.map(option => {
              return (
                <OrderOptionsBox
                  guid={option.guid}
                  title={option.name}
                  description={option.description}
                  items={parseModifierOptionData(
                    option.modifierOptionsData
                  )}
                  key={'option-' + option.guid}
                  isRequired={
                    option.requiredMode === 'OPTIONAL' ||
                    option.requiredMode ===
                      'OPTIONAL_FORCE_SHOW'
                      ? false
                      : true
                  }
                  setIsRequiredSatisfied={
                    setIsRequiredSatisfied
                  }
                  isCheckbox={option.isMultiSelect}
                  onSelect={handleSelectOption}
                />
              );
            })}
            {isFetching && (
              <View
                justifyContent="center"
                alignItems="center"
                my={3}
              >
                <Spinner />
              </View>
            )}
            <Text
              fontSize="14px"
              fontWeight="300"
              lineHeight="23px"
              textAlign="center"
              my={8}
              mx={4}
            >
              Ask your concierge about menu items that are
              cooked to order or served raw. Consuming raw
              or undercooked meats, poultry, seafood,
              shellfish, or eggs may increase your risk of
              food borne illness.
            </Text>
          </ScrollView>
        </VStack>
      </ImageHeaderScrollView>
      {isActiveOrder && (
        <Box
          position="absolute"
          bottom="0"
          left="0"
          w="100%"
          alignContent="center"
          px="5"
          pb="6"
        >
          <Button
            variant="purple"
            position="relative"
            paddingTop="3"
            paddingBottom="3"
            onPress={handleAddToTabAWS}
            isDisabled={!isRequiredSatisfied || isFetching}
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
          >
            <HStack
              justifyContent={'space-between'}
              space="10"
            >
              <HStack alignItems={'center'} space="2">
                <TabIcon color="brand.dark" size="30px" />
                <Text
                  marginBottom="-4px"
                  fontWeight="500"
                  textTransform="uppercase"
                  textAlignVertical="center"
                  textAlign="center"
                  color="brand.dark"
                  fontSize="14.22px"
                  lineHeight="12.21px"
                  fontFamily="CodecPro-Bold"
                >
                  Add to Tab
                </Text>
              </HStack>
              <Box justifyContent={'center'}>
                <Text
                  marginBottom="-4px"
                  fontWeight="400"
                  textTransform="uppercase"
                  textAlignVertical="center"
                  textAlign="center"
                  color="brand.dark"
                  fontSize="14.22px"
                  lineHeight="12.21px"
                  fontFamily="CodecPro-Bold"
                >
                  {`${formatCurrency(
                    price * qty + addedPrice * qty
                  )}`}
                </Text>
              </Box>
            </HStack>
          </Button>
        </Box>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    zIndex: 1
  },
  imageTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 100,
    padding: 30,
    paddingLeft: 40,
    backgroundColor: 'transparent',
    fontSize: 24,
    textTransform: 'uppercase'
  },
  navTitleView: {
    minHeight: MIN_HEIGHT,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    opacity: 0,
    zIndex: 5
  }
});

export default MenuItemTemplate;
