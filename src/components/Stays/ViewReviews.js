import React from 'react';
import { View } from 'native-base';
import { Dimensions } from 'react-native';
import Carousel, {
  Pagination
} from 'react-native-snap-carousel';
import ReviewCard from './ReviewCard';

// export const CARD_SLIDER_WIDTH =
//   Dimensions.get('window').width - 30;
// export const CARD_ITEM_WIDTH = Math.round(CARD_SLIDER_WIDTH * 0.8);

export const CARD_SLIDER_WIDTH = Dimensions.get('window').width;
export const CARD_ITEM_WIDTH = Math.round(CARD_SLIDER_WIDTH * 0.7);

const ViewReviews = ({ data, index }) => {
  const resourcesCarousel = React.useRef(null);
  const [reviewIndex, setReviewIndex] = React.useState(0);

  return (
    <View key={index} px={3} pt={8}>
      <View>
        <Carousel
          layout="default"
          ref={resourcesCarousel}
          data={data}
          renderItem={ReviewCard}
          sliderWidth={CARD_SLIDER_WIDTH}
          itemWidth={CARD_ITEM_WIDTH}
          onSnapToItem={rIndex =>
            setReviewIndex(rIndex)
          }
          useScrollView={true}
          activeSlideAlignment="start"
        />
      </View>
      <Pagination
        dotsLength={data.length}
        activeDotIndex={reviewIndex}
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
  );
};

export default ViewReviews;
