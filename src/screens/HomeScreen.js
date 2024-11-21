import React, {
  useContext,
  useState,
  useEffect
} from 'react';

import {
  Box,
  Flex,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  useTheme,
  View
} from 'native-base';

import Carousel, {
  Pagination
} from 'react-native-snap-carousel';

import CarouselCard, {
  CARD_SLIDER_WIDTH,
  CARD_ITEM_WIDTH
} from '../components/CarouselCard';

import Tile from '../components/Tile';
import FoodLineContainer from '../components/FoodLineContainer';

import homeScreenKitchensTile from '../../assets/images/home-screen-kitchens-tile.jpg';
import homeScreenStaysTile from '../../assets/images/home-screen-stays-tile.jpg';
import coworkingLogoWhite from '../../assets/images/4m-coworking-logo-white.jpg';
import kitchensLogoBlack from '../../assets/images/4M-Logo-Kitchens-Logo-GradientBlk.png';
import ridesLogoBlack from '../../assets/images/4m-rides-logo-black.jpg';
import HouseIcon from '../../assets/icons/HomeIcon';
//import ConferenceRoom from '../../assets/images/ConferenceRoom.png';

import { getEntriesByType } from '../helpers/contentfulApiCalls';
import { getResources } from '../helpers/nexudusApiCalls';
import { ToastContext } from '../helpers/ToastContext';
import { AppContext } from '../helpers/AppContext';

import md5 from 'md5';
import {
  CommonActions,
  useFocusEffect
} from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const HomeScreen = ({ navigation, route }, props) => {
  const { isPayment } = route.params ?? {};
  const [coworkIndex, setCoworkIndex] = useState(0);

  // Contentful
  const [contentfulFoodLines, setContentfulFoodLines] =
    useState(null);

  const [contentfulRides, setContentfulRides] =
    useState(null);

  const [resources, setResources] = useState([]);

  const formatImage = async img => {
    let imgUrl;
    const blob = new Blob([img], { type: 'image/png' });
    const reader = new FileReader();
    reader.onLoad = () => (imgUrl = reader.result);
    await reader.readAsDataURL(blob);
    //return imgUrl;
    return URL.createObjectURL(imgUrl);
  };

  useEffect(async () => {
    try {
      const foodLine = await getEntriesByType('foodLine');
      setContentfulFoodLines(foodLine);
    } catch (error) {
      console.log('Error getting Food Lines');
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      let resources = await getResources();
      if (resources?.length) {
        for (let resource of resources) {
          resource.textColor = 'white';
          resource.title = resource.Name;
          //resource.imgUrl = resource.image ? `data:image/png;base64,${await formatImage(resource.image)}` : 'https://place-hold.it/300';
          resource.imgUrl = 'https://place-hold.it/300';
        }
      }
      setResources([...(resources || [])]);
    } catch (error) {
      console.log('Error getting Resources');
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const fetchEntries = async () => {
        const rides = await getEntriesByType('Rides');
        const filteredRides = rides.find(
          c => c.fields.apps
        );
        if (filteredRides) {
          setContentfulRides({
            apps: filteredRides.fields.apps
          });
        }
      };
      fetchEntries();
    } catch (error) {
      console.log('Error getting Rides');
      console.log(error);
    }
  }, []);

  const coworkingCarousel = React.useRef(null);

  const { menus } = useContext(ToastContext);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const checkAuthState = async () => {
      Auth.currentAuthenticatedUser({ bypassCache: false })
        .then(user => {
          console.log('User Signed In');
        })
        .catch(err => {
          console.log('User Not Signed In');
        });
    };

    if (!user.id.length > 0) {
      checkAuthState();
    }
  }, []);

  useEffect(() => {
    if (user.id && isPayment) {
      navigation.navigate('Account', {
        screen: 'PaymentMethods',
        params: { isPayment }
      });
    }
  }, []);

  return (
    <ScrollView safeArea>
      {/* Sign-in Banner */}
      {user.id == '' && (
        <Pressable
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Flex
            flexDirection="row"
            bg="brand.orange"
            pt="10"
            pb="5"
            px="2"
          >
            <Box mr="3">
              <HouseIcon size="sm" color="black" />
            </Box>
            <Box mr="10">
              <Text bold>Start earning points today!</Text>
              <Text>
                Sign Up or Log In to start earning points on
                your purchases
              </Text>
            </Box>
          </Flex>
        </Pressable>
      )}

      {/* Tiles */}
      <View
        px="2"
        flexDirection="row"
        justifyContent="center"
        pt="10"
        pb="2"
        bg="#ffffff"
      >
        <Tile
          image={homeScreenKitchensTile}
          text="FOOD ORDERING"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Food' }]
            })
          }
          flex="1"
          padding="1"
          pb="3"
        />
        <Tile
          image={homeScreenStaysTile}
          text="RENTALS"
          onPress={() => navigation.navigate('Stays')}
          flex="1"
          padding="1"
          pb="3"
        />
      </View>

      {/* Coworking */}
      {/* <View bgColor="#202020" p="4">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mb="4"
        >
          <Image source={coworkingLogoWhite} alt="4m" />
          <Pressable
            onPress={() => navigation.navigate('Cowork')}
          >
            <Text color="brand.green" bold mt="3">
              Rent A Space
            </Text>
          </Pressable>
        </Flex>

        <View pb="3">
          <Carousel
            layout="default"
            ref={coworkingCarousel}
            data={resources}
            renderItem={CarouselCard}
            sliderWidth={CARD_SLIDER_WIDTH}
            itemWidth={CARD_ITEM_WIDTH}
            onSnapToItem={coworkIndex =>
              setCoworkIndex(coworkIndex)
            }
            useScrollView={true}
          />
          <Pagination
            dotsLength={resources.length}
            activeDotIndex={coworkIndex}
            carouselRef={coworkingCarousel}
            dotStyle={{
              width: 20,
              height: 7,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
            inactiveDotOpacity={0.3}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
      </View> */}

      {/* kitchens */}
      <View p="4" bgColor="#ffffff">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          mb="2"
        >
          <Image source={kitchensLogoBlack} alt="4m" />
          <Pressable
            onPress={() => navigation.navigate('Food')}
          >
            <Text color="brand.green" bold>
              Order Food
            </Text>
          </Pressable>
        </Flex>

        <ScrollView pt="3" horizontal={true}>
          <HStack>
            {menus
              ?.filter(menu => menu[1].name === 'Bar 19')
              .map(menu => {
                return (
                  <Pressable
                    mr="4"
                    onPress={() => {
                      navigation.navigate('Food', {
                        screen: 'FoodLineTemplate',
                        params: {
                          payload: menu[1],
                          contentful:
                            contentfulFoodLines.filter(
                              content =>
                                content.fields.menuGuid ===
                                menu[1].guid
                            ),
                          previous: 'Home'
                        }
                      });
                    }}
                    key={menu[1].guid}
                  >
                    <FoodLineContainer
                      key={menu[1].guid}
                      image={menu[1].image}
                      name={menu[1].name}
                      resizeMode="cover"
                      borderRadius={8}
                    />
                  </Pressable>
                );
              })}
            {menus
              ?.filter(menu => menu[1].name !== 'Bar 19')
              .map((menu, index) => {
                return (
                  <Pressable
                    mr="4"
                    onPress={() => {
                      navigation.navigate('Food', {
                        screen: 'FoodLineTemplate',
                        params: {
                          payload: menu[1],
                          contentful:
                            contentfulFoodLines.filter(
                              content =>
                                content.fields.menuGuid ===
                                menu[1].guid
                            ),
                          previous: 'Home'
                        }
                      });
                    }}
                    key={menu[1].guid}
                  >
                    <FoodLineContainer
                      image={menu[1].image}
                      name={menu[1].name}
                      resizeMode="cover"
                      borderRadius={8}
                    />
                  </Pressable>
                );
              })}
          </HStack>
        </ScrollView>
      </View>

      {/* Rides */}
      <View p="4" bgColor="#ffffff">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          mb="4"
        >
          <Image source={ridesLogoBlack} alt="4m" />
          <Pressable
            onPress={() => navigation.navigate('Rides')}
          >
            <Text color="brand.green" bold>
              Hail A Ride
            </Text>
          </Pressable>
        </Flex>

        <Flex pb="3">
          {contentfulRides?.apps.map((app, index) => {
            return (
              <Pressable
                onPress={() => navigation.navigate('Rides')}
                mb="5"
                key={index}
              >
                <Image
                  source={{
                    uri:
                      'https:' +
                      app.fields.card.fields.file.url
                  }}
                  alt={app.fields.title}
                  w="100%"
                  h="100px"
                />
              </Pressable>
            );
          })}
        </Flex>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
