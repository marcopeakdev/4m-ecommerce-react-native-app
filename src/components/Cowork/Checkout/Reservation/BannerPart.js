import React, { useState, useRef } from 'react';
import { Dimensions } from 'react-native';

import { View } from 'native-base';

import Carousel, {
  Pagination
} from 'react-native-snap-carousel';

import Banner from '../ReservationCards/utils/Banner';

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = 237;
const data = [
  {
    title: ' Need a ride?',
    content: 'We got you covered.'
  },
  { title: ' Need a ride?', content: 'We got you covered.' }
];

const BannerPart = () => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View mt="20px" p="18px" pb="24px">
      <Carousel
        layout="default"
        ref={ref}
        data={data}
        renderItem={Banner}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={eventsIndex =>
          setActiveIndex(eventsIndex)
        }
        useScrollView={true}
        activeSlideAlignment="start"
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        carouselRef={ref}
        dotContainerStyle={{
          marginHorizontal: 5
        }}
        dotStyle={{
          width: 23,
          height: 7,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity={0.3}
        inactiveDotScale={0.7}
        tappableDots={true}
      />
    </View>
  );
};

export default BannerPart;
