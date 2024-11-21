import React, { useState, useEffect } from 'react';
import {
  Box,
  Image,
  ScrollView,
  Text,
  View
} from 'native-base';

import Carousel, {
  Pagination
} from 'react-native-snap-carousel';
import { getEntriesByType } from '../../helpers/contentfulApiCalls';

import RidesCarousel, {
  SLIDER_WIDTH,
  ITEM_WIDTH
} from '../../components/RidesCarousel';

import ridesBranding from '../../../assets/images/4m-rides-logo-black.jpg';

const RidesHome = ({ navigation, route }, props) => {
  const [ridesHomeIndex, setRidesHomeIndex] =
    React.useState(0);
  const ridesHomeCarousel = React.useRef(null);

  // Contentful
  const [contentfulRides, setContentfulRides] =
    useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const contentful = await getEntriesByType('Rides');
      const filtered = contentful.find(c => c.fields.apps);
      if (filtered) {
        setContentfulRides({
          apps: filtered.fields.apps,
          generalCopy: filtered.fields.copy
        });
      }
    };
    fetchEntries();
  }, []);

  return (
    <Box backgroundColor="white" height="100%" pt="5">
      <Box mx="auto" mt="5" mb="4">
        <Image source={ridesBranding} alt="4m" />
      </Box>
      <ScrollView>
        <Box mt={3}>
          <Text px="8" fontSize="16px">
            {contentfulRides?.generalCopy}
          </Text>
        </Box>
        <View px="4" pb="3">
          <Carousel
            layout="default"
            ref={ridesHomeCarousel}
            data={contentfulRides?.apps || []}
            renderItem={RidesCarousel}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={ridesHomeIndex =>
              setRidesHomeIndex(ridesHomeIndex)
            }
            useScrollView={true}
          />
          <Pagination
            dotsLength={contentfulRides?.apps?.length || 0}
            activeDotIndex={ridesHomeIndex}
            carouselRef={ridesHomeCarousel}
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
      </ScrollView>
    </Box>
  );
};

export default RidesHome;
