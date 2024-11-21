import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import {
  ActivityIndicator,
  Dimensions
} from 'react-native';
import {
  Box,
  Text,
  Image,
  Pressable,
  View,
  ScrollView
} from 'native-base';
import mask from '../../../assets/images/mask.png';
import MembershipCardWrapper, {
  CARD_SLIDER_WIDTH,
  CARD_ITEM_WIDTH
} from '../../components/MembershipCard';
import Carousel, {
  Pagination
} from 'react-native-snap-carousel';
import MemberRecives from '../../components/MemberRecives';
import PropTypes from 'prop-types';

import { getPlans } from './../../helpers/nexudusApiCalls';
import DayPassCardWrapper from '../../components/Cowork/DayPassComponent';
import { AppContext } from '../../helpers/AppContext';
import { Auth } from 'aws-amplify';
import { useFocusEffect } from '@react-navigation/native';

const Membership = ({ route, navigation }) => {
  const { user } = useContext(AppContext);

  useFocusEffect(() => {
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
  });

  const dayPassScreen = route.params?.dayPassScreen
    ? true
    : false;

  const [plans, setPlans] = useState([]);

  const getDayScreenPlans = () => {
    const dayScreenPlans = [
      {
        title: 'No Work',
        price: '25',
        badgeTitle: 'By the Day',
        description:
          'Get access to work at Venue in the community area for the day',
        otherDetail: 'Open Work Space for coworking'
      },
      {
        title: 'Open Work',
        price: '25',
        badgeTitle: 'By the Day',
        description:
          'Get access to work at Venue in the community area for the day',
        otherDetail: 'Open Work Space for coworking'
      }
    ];
    setPlans(dayScreenPlans);
  };

  useEffect(() => {
    if (!dayPassScreen) {
      getMemberShipPlans();
    } else {
      getDayScreenPlans();
    }
  }, []);

  const [membershipIndex, setmembershipIndex] = useState(0);
  const membershipCarousel = React.useRef(null);
  const [fetchingApi, setFetchingApi] = useState(false);

  const getMemberShipPlans = async () => {
    setFetchingApi(true);
    const data = await getPlans();
    setPlans(data?.PricePlans || []);
    setFetchingApi(false);
  };

  return (
    <View bgColor="white" minH="full">
      {fetchingApi && (
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
      <Box
        w="100%"
        h="120px"
        bg="white"
        rounded="md"
        shadow={3}
      >
        <View
          flexDir="row"
          w="100%"
          mt="5"
          h="100%"
          alignItems="center"
          justifyContent="space-around"
        >
          <Pressable onPress={navigation.goBack}>
            <Image
              h="5"
              w="5"
              alt={'name'}
              source={mask}
              resizeMode="contain"
            />
          </Pressable>
          <Text
            fontSize="24"
            pt="2"
            fontWeight="extrabold"
            mr="6"
          >
            {dayPassScreen ? 'Day Passes' : 'Memberships'}
          </Text>
          {user.id === '' && (
            <Pressable
              onPress={() =>
                navigation.navigate('Login', {
                  screen: 'UserLogin',
                  params: {
                    isCowork: true
                  }
                })
              }
            >
              <Text
                bold
                color="#01AF8F"
                mt="2"
                textTransform="uppercase"
              >
                Log In
              </Text>
            </Pressable>
          )}
        </View>
      </Box>
      <ScrollView mb="20">
        <>
          <View w="100%" flex={1} justifyContent="center">
            <View
              mt="4"
              flexDirection="row"
              justifyContent="center"
            >
              <Carousel
                layout="default"
                ref={membershipCarousel}
                data={plans}
                renderItem={
                  dayPassScreen
                    ? DayPassCardWrapper
                    : MembershipCardWrapper
                }
                sliderWidth={CARD_SLIDER_WIDTH}
                itemWidth={CARD_ITEM_WIDTH}
                onSnapToItem={membershipIndex =>
                  setmembershipIndex(membershipIndex)
                }
                useScrollView={true}
              />
            </View>
            <Pagination
              dotsLength={plans.length}
              activeDotIndex={membershipIndex}
              carouselRef={membershipCarousel}
              dotStyle={{
                width: 20,
                height: 7,
                borderRadius: 5,
                marginHorizontal: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.92)',
                padding: 0
              }}
              containerStyle={{
                alignSelf: 'center',
                margin: 0,
                padding: 0
              }}
              inactiveDotOpacity={0.3}
              inactiveDotScale={0.6}
              tappableDots={true}
            />
          </View>
          <View>
            <MemberRecives
              dayPass={dayPassScreen ? true : false}
            />
          </View>
        </>
      </ScrollView>
    </View>
  );
};

Membership.propTypes = {
  navigation: PropTypes.object
};

export default Membership;
