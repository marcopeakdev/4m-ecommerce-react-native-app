import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  Linking
} from 'react-native';

import {
  Box,
  View,
  HStack,
  Pressable,
  Heading,
  Text,
  Button,
  Image,
  Spinner,
  VStack
} from 'native-base';

import ImageHeaderScrollView, {
  TriggeringView
} from 'react-native-image-header-scroll-view';

// import ImageSlider from 'react-native-image-slider';
import { SliderBox } from 'react-native-image-slider-box';
import * as Animatable from 'react-native-animatable';
// import MapView, {
//   PROVIDER_GOOGLE
// } from 'react-native-maps';

import InfoWithIcon from '../../components/Stays/InfoWithIcon';
import CustomModal from '../../components/CustomModal';
import DotIcon from '../../../assets/icons/DeskModalDot';
import StaysDefaultImage from '../../../assets/images/staysDefaultImage.png';
import CancelIcon from '../../../assets/icons/Cancel';
// import MAP_STYLE from '../../constants/MapStyle';
import { getListingById } from '../../helpers/guestyApiCalls';
import { getEntryById } from '../../helpers/contentfulApiCalls';

export const IMAGE_WIDTH = Dimensions.get('window').width;

const MIN_HEIGHT = Platform.OS === 'ios' ? 130 : 90;
const MAX_HEIGHT = 350;

export const CARD_SLIDER_WIDTH =
  Dimensions.get('window').width;
export const CARD_ITEM_WIDTH = Math.round(
  CARD_SLIDER_WIDTH
);

const GUESTY_URL = 'https://prentice4m.guestybookings.com';

const ViewStaysHome = ({ navigation, route }, props) => {
  const [showBookModal, setShowBookModal] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [listingInfo, setListingInfo] = useState({});
  const [extraInfo, setExtraInfo] = useState({});

  const navTitleView = useRef(null);

  useEffect(() => {
    const getListingData = async () => {
      setFetching(true);
      const listing = await getListingById(route.params.id);
      setFetching(false);

      if (listing) {
        setListingInfo(listing);
        setActiveImg(1);
      }
    };
    getListingData();
  }, []);

  useEffect(() => {
    const getExtraInfo = async () => {
      const result = await getEntryById(
        '4tNE8CX6iDla2wmCRyTug8'
      );

      setExtraInfo(result.data);
    };

    getExtraInfo();
  }, []);

  if (!listingInfo) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: 'center', alignItems: 'center' }
        ]}
      >
        <Spinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageHeaderScrollView
        disableHeaderGrow
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        fadeOutForeground
        renderHeader={() => (
          <View>
            <SliderBox
              images={
                listingInfo?.pictures
                  ?.map(p => p.original)
                  .splice(0, 3) || []
              }
              sliderBoxHeight={350}
              onCurrentImagePressed={index =>
                navigation.navigate('ViewStaysHome', {
                  id: item._id
                })
              }
              dotColor="#FFEE58"
              inactiveDotColor="#90A4AE"
              dotStyle={{
                width: 15,
                height: 15,
                borderRadius: 15,
                marginHorizontal: 10,
                padding: 0,
                margin: 0
              }}
              ImageComponent={props => (
                <View
                  style={[styles.customSlide]}
                  position="relative"
                  bg="rgba(0,0,0,0)"
                >
                  {props?.source?.uri.length > 0 ? (
                    <Image
                      source={props.source}
                      alt={listingInfo?.nickname}
                      width={CARD_ITEM_WIDTH}
                      height={'350px'}
                    />
                  ) : (
                    <Image
                      source={StaysDefaultImage}
                      alt={listingInfo?.nickname}
                      width={CARD_ITEM_WIDTH}
                      height={'350px'}
                    />
                  )}
                </View>
              )}
              LoaderComponent={() => <View></View>}
              paginationBoxStyle={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                opacity: 0
              }}
              circleLoop={true}
              autoplay={true}
            />
          </View>
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Pressable
              position="absolute"
              top="50px"
              right="20px"
              zIndex={-1}
              onPress={() => navigation.goBack()}
            >
              <View
                w="27px"
                h="27px"
                backgroundColor="#20202080"
                rounded="14px"
                flexDir="row"
                alignItems="center"
                justifyContent="center"
              >
                <CancelIcon />
              </View>
            </Pressable>
            <View
              position="absolute"
              bottom="0px"
              width="100%"
            >
              <Box
                w="100%"
                h="76px"
                flexDir="column"
                justifyContent="flex-end"
                zIndex="1"
                bg={{
                  linearGradient: {
                    colors: ['#ffffff00', '#ffffff']
                  }
                }}
              >
                <View
                  flexDir="row"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  paddingBottom="10px"
                  paddingRight="10px"
                >
                  {listingInfo?.pictures
                    ?.map(p => p.original)
                    .splice(0, 3)
                    ?.map((_, index) => (
                      <View key={index} mx={1}>
                        <Pressable
                          onPress={() =>
                            setActiveImg(index)
                          }
                        >
                          <DotIcon
                            active={index === activeImg}
                          />
                        </Pressable>
                        <View mx="3px" />
                      </View>
                    ))}
                </View>
              </Box>
              <HStack
                style={styles.headerTitleStyle}
                width="100%"
                alignItems="center"
                justifyContent="space-between"
                bg="white"
              >
                <VStack>
                  <Heading fontSize="md">
                    {listingInfo?.nickname}
                  </Heading>
                  <Text
                    fontSize="14.22px"
                    fontWeight="400"
                    lineHeight="16px"
                    fontFamily="CodecPro-Light"
                  >
                    {listingInfo?.address?.full}
                  </Text>
                  <Text
                    fontSize="14.22px"
                    fontWeight="400"
                    mt={3}
                    lineHeight="16px"
                    fontFamily="CodecPro-Bold"
                  >
                    ${listingInfo?.prices?.basePrice}&nbsp;
                    {listingInfo?.prices?.currency}/NIGHT
                  </Text>
                </VStack>
              </HStack>
            </View>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View
            style={styles.navTitleView}
            ref={navTitleView}
          >
            <View
              style={styles.headerTitleStyle}
              mt={4}
              width="100%"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              bg="white"
              height="200px"
            >
              <HStack>
                <VStack>
                  <Heading
                    fontSize="md"
                    fontFamily="CodecPro-Bold"
                  >
                    {listingInfo?.nickname}
                  </Heading>
                  <Text
                    fontSize="14.22px"
                    fontWeight="400"
                    lineHeight="16px"
                  >
                    {listingInfo?.address?.full}
                  </Text>
                  <Text
                    fontSize="14.22px"
                    fontWeight="400"
                    lineHeight="16px"
                    mt={3}
                    fontFamily="CodecPro-Bold"
                  >
                    ${listingInfo?.prices?.basePrice}&nbsp;
                    {listingInfo?.prices?.currency}/NIGHT
                  </Text>
                </VStack>
              </HStack>
            </View>
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={{ marginTop: 20, height: 10 }}
          onHide={() => {
            navTitleView.current.fadeInUp(50);
          }}
          onDisplay={() => {
            navTitleView.current.fadeOut(50);
          }}
          topOffset={-100}
        ></TriggeringView>
        <View padding={3} paddingBottom={38}>
          <InfoWithIcon data={listingInfo} />
          {!listingInfo?.publicDescription?.summary &&
          !listingInfo?.publicDescription?.space &&
          !listingInfo?.publicDescription?.space &&
          !listingInfo?.publicDescription?.access &&
          !listingInfo?.publicDescription?.neighborhood &&
          !listingInfo?.publicDescription?.transit &&
          !listingInfo?.publicDescription?.notes &&
          !listingInfo?.publicDescription
            ?.houserules ? null : (
            <View mt={2}>
              <Heading mt={2} mb={3} fontSize="md">
                DESCRIPTION
              </Heading>
              {listingInfo?.publicDescription?.summary && (
                <Text
                  fontSize="16px"
                  mb={3}
                  lineHeight="21px"
                  fontWeight="300"
                >
                  {listingInfo?.publicDescription?.summary}
                </Text>
              )}
              {listingInfo?.publicDescription?.space && (
                <>
                  <Heading mt={2} mb={3} fontSize="xs">
                    ABOUT THE SPACE
                  </Heading>
                  <Text
                    fontSize="16px"
                    mb={3}
                    lineHeight="21px"
                    fontWeight="300"
                  >
                    {listingInfo?.publicDescription?.space}
                  </Text>
                </>
              )}
              {listingInfo?.publicDescription?.access && (
                <>
                  <Heading mt={2} mb={3} fontSize="xs">
                    ACCESS
                  </Heading>
                  <Text
                    fontSize="16px"
                    mb={3}
                    lineHeight="21px"
                    fontWeight="300"
                  >
                    {listingInfo?.publicDescription?.access}
                  </Text>
                </>
              )}
              {listingInfo?.publicDescription
                ?.neighborhood && (
                <>
                  <Heading mt={2} mb={3} fontSize="xs">
                    THE NEIGHBORHOOD
                  </Heading>
                  <Text
                    fontSize="16px"
                    mb={3}
                    lineHeight="21px"
                    fontWeight="300"
                  >
                    {
                      listingInfo?.publicDescription
                        ?.neighborhood
                    }
                  </Text>
                </>
              )}
              {listingInfo?.publicDescription?.transit && (
                <>
                  <Heading mt={2} mb={3} fontSize="xs">
                    TRANSIT
                  </Heading>
                  <Text
                    fontSize="16px"
                    mb={3}
                    lineHeight="21px"
                    fontWeight="300"
                  >
                    {
                      listingInfo?.publicDescription
                        ?.transit
                    }
                  </Text>
                </>
              )}
              {listingInfo?.publicDescription?.notes && (
                <>
                  <Heading mt={2} mb={3} fontSize="xs">
                    ADDITIONAL NOTES
                  </Heading>
                  <Text
                    fontSize="16px"
                    mb={3}
                    lineHeight="21px"
                    fontWeight="300"
                  >
                    {listingInfo?.publicDescription?.notes}
                  </Text>
                </>
              )}
              {listingInfo?.publicDescription
                ?.houseRules && (
                <>
                  <Heading mt={2} mb={3} fontSize="xs">
                    HOUSE RULES
                  </Heading>
                  <Text
                    fontSize="16px"
                    mb={3}
                    lineHeight="21px"
                    fontWeight="300"
                  >
                    {
                      listingInfo?.publicDescription
                        ?.houseRules
                    }
                  </Text>
                </>
              )}
            </View>
          )}

          {/* <MapView
            style={styles.mapView}
            provider={PROVIDER_GOOGLE}
            customMapStyle={MAP_STYLE}
            region={{
              latitude: listingInfo?.address?.lat ?? 0,
              longitude: listingInfo?.address?.lng ?? 0,
              latitudeDelta: 0,
              longitudeDelta: 0.005
            }}
          /> */}
          <View mt={3}>
            <Text
              mt={2}
              mb={3}
              style={styles.description}
              fontWeight="700"
            >
              {extraInfo?.name}
            </Text>
            <Text
              fontSize="16px"
              lineHeight="21px"
              fontWeight="300"
              pb="7"
            >
              {extraInfo?.description
                ?.split('.jpg)')[1]
                ?.trim()}
            </Text>
          </View>
        </View>
      </ImageHeaderScrollView>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        alignContent="center"
        px="8"
        pb="4"
      >
        <Button
          variant="purple"
          position="relative"
          paddingTop="4"
          paddingBottom="4"
          onPress={() => setShowBookModal(true)}
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
            BOOK NOW
          </Text>
        </Button>
      </Box>
      <CustomModal
        headingText="Continue to booking?"
        bodyText="You will be redirected to prentice4m.guestybookings.com"
        confirmText={<Text>YES</Text>}
        isOpen={showBookModal}
        toggleIsOpen={() =>
          setShowBookModal(!showBookModal)
        }
        confirmOnPress={() => {
          Linking.openURL(GUESTY_URL).catch(err =>
            console.log("Couldn't load page", err)
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover'
  },
  title: {
    fontSize: 20
  },
  titleContainer: {
    flex: 1,
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  headerTitleStyle: {
    paddingHorizontal: 17,
    paddingVertical: 4,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    elevation: 3,
    zIndex: 9
  },
  imageTitle: {
    color: '#202020',
    fontWeight: '600',
    backgroundColor: 'transparent',
    fontStyle: 'normal'
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 20 : 5,
    opacity: 0
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent'
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 13.74,
    letterSpacing: 6
  },
  // mapView: {
  //   width: Dimensions.get('window').width,
  //   height: Dimensions.get('window').height * 0.3,
  //   marginLeft: -12
  // },
  customSlide: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ViewStaysHome;
