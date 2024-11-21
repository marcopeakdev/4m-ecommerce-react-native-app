import React, { useEffect, useState } from 'react';
import {
  VStack,
  ScrollView,
  Box,
  Image,
  Text,
  View,
  Center,
  Flex,
  Pressable
} from 'native-base';
import {
  ActivityIndicator,
  Dimensions
} from 'react-native';
// import memberIcon from '../../../assets/images/memberIcon.svg';
import coworkLogo from '../../../assets/images/coworkLogo.png';
import mask from '../../../assets/images/mask.png';
import HorizontalCard, {
  SLIDER_WIDTH,
  ITEM_WIDTH
} from '../../components/HorizontalCard';
import Carousel, {
  Pagination
} from 'react-native-snap-carousel';
import CarouselCard, {
  CARD_SLIDER_WIDTH,
  CARD_ITEM_WIDTH
} from '../../components/CarouselCard';
import MemberIcon from '../../components/memberIcon';
import UserIcon from '../../components/UserIcon';
import DayPass from '../../components/dayPassImage';
import DedicatedSpace from '../../components/DedicatedSpace';
import {
  getPublicEvents,
  getResources
} from './../../helpers/nexudusApiCalls';
import { getMonthNameAndYear } from './../../constants/getDateTime';
import PropTypes from 'prop-types';

const CoworkHome = ({ navigation }) => {
  const businessEventsCarousel = React.useRef(null);
  const [businessEventsIndex, setBusinessEventsIndex] =
    React.useState(0);
  const resourcesCarousel = React.useRef(null);
  const [resourcesIndex, setResourcesIndex] =
    React.useState(0);
  const nonBusinessEventsCarousel = React.useRef(null);
  const [
    nonBusinessEventsIndex,
    setNonBusinessEventsIndex
  ] = React.useState(0);
  const newsCarousel = React.useRef(null);
  const [newsIndex, setNewsIndex] = React.useState(0);
  const [businessEvents, setBusinessEvents] = useState([]);
  const [nonBusinessEvents, setNonBusinessEvents] =
    useState([]);
  const [resources, setResources] = useState([]);
  const [fetchingPublicEvents, setFetchingEvents] =
    useState(false);
  const [fetchingResources, setFetchingResources] =
    useState(false);

  const carouselData = [
    {
      title: 'News',
      body: 'Ut tincidunt tincidunt erat to to too',
      date: 'Feb 19, 2022',
      imgUrl: 'https://place-hold.it/100'
    },
    {
      title: 'News',
      body: 'Aenean ut eros et nisl',
      date: 'Feb 19, 2022',
      imgUrl: 'https://place-hold.it/100'
    },
    {
      title: 'News',
      body: 'Aenean ut eros et nisl',
      date: 'Feb 19, 2022',
      imgUrl: 'https://place-hold.it/100'
    }
  ];

  useEffect(() => {
    const fetchPublicEvents = async () => {
      setFetchingResources(true);
      const events = await getPublicEvents();
      setFetchingResources(false);
      let business = [];
      let nonBusiness = [];
      if (events?.length) {
        for (let event of events) {
          const startDateTime = getMonthNameAndYear(
            event.StartDate
          );
          const endDateTime = getMonthNameAndYear(
            event.EndDate
          );
          event.color = 'white';
          event.title = event.Name;
          event.day = startDateTime.dayName;
          event.date = `${startDateTime.monthShortNanme} ${startDateTime.day}, ${startDateTime.year}`;
          event.time = `${startDateTime.hours}:${startDateTime.minutes} - ${endDateTime.hours}:${endDateTime.minutes}${endDateTime.ampm}`;
          event.imgUrl = 'https://place-hold.it/300';
          if (
            event?.EventCategories?.length &&
            event?.EventCategories[0]?.Title === 'Business'
          ) {
            business.push(event);
          } else {
            nonBusiness.push(event);
          }
        }
      }
      business = business.splice(0, 3);
      nonBusiness = nonBusiness.splice(0, 3);
      setBusinessEvents([...business]);
      setNonBusinessEvents([...nonBusiness]);
    };
    fetchPublicEvents();
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      setFetchingEvents(true);
      let resources = await getResources();
      setFetchingEvents(false);
      if (resources?.length) {
        resources = resources.splice(0, 3);
        for (let resource of resources) {
          const startDateTime = getMonthNameAndYear(
            resource.UpdatedOn
          );
          resource.color = 'white';
          resource.title = resource.Name;
          resource.day = startDateTime.dayName;
          resource.date = `${startDateTime.monthShortNanme} ${startDateTime.day}, ${startDateTime.year}`;
          resource.time = `${startDateTime.hours}:${startDateTime.minutes}${startDateTime.ampm}`;
          resource.imgUrl = 'https://place-hold.it/300';
        }
      }
      setResources([...(resources || [])]);
    };
    fetchResources();
  }, []);

  return (
    <VStack space={4} bgColor="white">
      <Box
        w="100%"
        h="120px"
        bg="white"
        rounded="md"
        shadow={3}
      >
        {(fetchingPublicEvents || fetchingResources) && (
          <View
            style={{
              position: 'absolute',
              zIndex: 8,
              flex: 1,
              top: Dimensions.get('window').height * 0.5,
              alignSelf: 'center'
            }}
          >
            <ActivityIndicator color="#000" />
          </View>
        )}
        <View
          flexDir="row"
          w="100%"
          mt="5"
          h="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            h="60%"
            w="60%"
            alt={'coworkLogo'}
            source={coworkLogo}
            resizeMode="contain"
          />
        </View>
      </Box>
      <ScrollView mb="40">
        <View>
          <Pressable
            onPress={() =>
              navigation.navigate('Membership')
            }
          >
            <VStack mt="16px" space={4} alignItems="center">
              <Center
                w="339px"
                h="20"
                bg="white"
                rounded="xl"
                shadow={2}
                justifyContent="space-between"
                alignItems="center"
                flexDir="row"
                px={4}
              >
                <View>
                  <UserIcon />
                </View>
                <View justifyContent="space-around" h="12">
                  <Text
                    fontWeight="bold"
                    letterSpacing="0.05em"
                    fontSize="20.25px"
                    pt="2"
                  >
                    Not A Member Yet?
                  </Text>
                  <Text color="#01AF8F" fontWeight="bold">
                    VIEW MEMBERSHIPS
                  </Text>
                </View>
                <View>
                  <MemberIcon />
                </View>
              </Center>
            </VStack>
          </Pressable>
          <Center mt="16px">
            <Pressable
              onPress={() =>
                navigation.navigate('Membership', {
                  dayPassScreen: true
                })
              }
            >
              <DayPass />
            </Pressable>
          </Center>
          {/* Buisness events */}
          {/* {businessEvents.length && (
            <View px="4" pt="4" bgColor="#ffffff">
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-end"
                mb="2"
              >
                <Text
                  textTransform="uppercase"
                  letterSpacing="0.4em"
                  bold
                >
                  Business Events
                </Text>
                <Pressable onPress={() => {}}>
                  <Text
                    color="brand.green"
                    textTransform="uppercase"
                    letterSpacing="0.025em"
                    bold
                  >
                    View All
                  </Text>
                </Pressable>
              </Flex>
              <View>
                <Carousel
                  layout="default"
                  ref={businessEventsCarousel}
                  data={businessEvents}
                  renderItem={CarouselCard}
                  sliderWidth={CARD_SLIDER_WIDTH}
                  itemWidth={CARD_ITEM_WIDTH}
                  onSnapToItem={eventIndex =>
                    setBusinessEventsIndex(eventIndex)
                  }
                  useScrollView={true}
                  activeSlideAlignment="start"
                />
              </View>
              <Pagination
                dotsLength={businessEvents.length}
                activeDotIndex={businessEventsIndex}
                carouselRef={businessEventsCarousel}
                dotStyle={{
                  width: 20,
                  height: 7,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotOpacity={0.3}
                inactiveDotScale={0.6}
                tappableDots={true}
              />
            </View>
          )} */}

          {/* Book resourses */}
          {resources.length ? (
            <View px="4" pt="4" bgColor="#ffffff">
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-end"
                mb="2"
              >
                <Text
                  textTransform="uppercase"
                  letterSpacing="0.4em"
                  bold
                >
                  Book a resource
                </Text>
                <Pressable
                  onPress={() => {
                    navigation.navigate('Resources');
                  }}
                >
                  <Text
                    color="brand.green"
                    textTransform="uppercase"
                    letterSpacing="0.025em"
                    bold
                  >
                    View All
                  </Text>
                </Pressable>
              </Flex>
              <View>
                <View>
                  <Carousel
                    layout="default"
                    ref={resourcesCarousel}
                    data={resources}
                    renderItem={CarouselCard}
                    sliderWidth={CARD_SLIDER_WIDTH}
                    itemWidth={CARD_ITEM_WIDTH}
                    onSnapToItem={bookIndex =>
                      setResourcesIndex(bookIndex)
                    }
                    useScrollView={true}
                    activeSlideAlignment="start"
                  />
                </View>
                <Pagination
                  dotsLength={resources.length}
                  activeDotIndex={resourcesIndex}
                  carouselRef={resourcesCarousel}
                  dotStyle={{
                    width: 20,
                    height: 7,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)'
                  }}
                  inactiveDotOpacity={0.3}
                  inactiveDotScale={0.6}
                  tappableDots={true}
                />
              </View>
            </View>
          ) : (
            <></>
          )}

          {/* Non Buisness events */}
          {/* {nonBusinessEvents.length && (
            <View px="4" pt="4" bgColor="#ffffff">
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                alignItems="flex-end"
                mb="2"
              >
                <Text
                  textTransform="uppercase"
                  letterSpacing="0.3em"
                  bold
                >
                  Non Business Events
                </Text>
                <Pressable onPress={() => {}}>
                  <Text
                    color="brand.green"
                    textTransform="uppercase"
                    letterSpacing="0.025em"
                    bold
                  >
                    View All
                  </Text>
                </Pressable>
              </Flex>

              <View>
                <Carousel
                  layout="default"
                  ref={nonBusinessEventsCarousel}
                  data={nonBusinessEvents}
                  renderItem={CarouselCard}
                  sliderWidth={CARD_SLIDER_WIDTH}
                  itemWidth={CARD_ITEM_WIDTH}
                  onSnapToItem={eventIndex =>
                    setNonBusinessEventsIndex(eventIndex)
                  }
                  useScrollView={true}
                  activeSlideAlignment="start"
                />
              </View>
              <Pagination
                dotsLength={nonBusinessEvents.length}
                activeDotIndex={nonBusinessEventsIndex}
                carouselRef={nonBusinessEventsCarousel}
                dotStyle={{
                  width: 20,
                  height: 7,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotOpacity={0.3}
                inactiveDotScale={0.6}
                tappableDots={true}
              />
            </View>
          )} */}

          {/* Happening This Month */}
          {/* {carouselData?.length && (
            <View pt="8" bg="#ffffff">
              <Text
                px="4"
                pb="3"
                textTransform="uppercase"
                letterSpacing="0.4em"
                bold
              >
                {`What's happening?`}
              </Text>
              <View>
                <View
                  h="80px"
                  mt="1"
                  style={{
                    paddingLeft: 35
                  }}
                >
                  <Carousel
                    layout="default"
                    ref={newsCarousel}
                    data={carouselData}
                    renderItem={HorizontalCard}
                    sliderWidth={SLIDER_WIDTH * 0.999}
                    itemWidth={ITEM_WIDTH}
                    onSnapToItem={eventsIndex =>
                      setNewsIndex(eventsIndex)
                    }
                    useScrollView={true}
                    activeSlideAlignment="start"
                  />
                </View>
                <Pagination
                  dotsLength={carouselData.length}
                  activeDotIndex={newsIndex}
                  carouselRef={newsCarousel}
                  dotStyle={{
                    width: 20,
                    height: 7,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.92)'
                  }}
                  inactiveDotOpacity={0.3}
                  inactiveDotScale={0.6}
                  tappableDots={true}
                />
              </View>
            </View>
          )} */}
          <Center>
            <DedicatedSpace />
          </Center>
        </View>
      </ScrollView>
    </VStack>
  );
};

CoworkHome.propTypes = {
  navigation: PropTypes.object
};
export default CoworkHome;
