import React, { useState } from 'react';

import {
  Text,
  View,
  Box,
  Pressable,
  Image
} from 'native-base';

import { Dimensions, StyleSheet } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { TouchableOpacity } from 'react-native-gesture-handler';

import DotIcon from '../../../assets/icons/DeskModalDot';
import StaysDefaultImage from '../../../assets/images/staysDefaultImage.png';

export const CARD_SLIDER_WIDTH =
  Dimensions.get('window').width;
export const CARD_ITEM_WIDTH =
  Math.round(CARD_SLIDER_WIDTH * 0.9) - 8;

const StayCard = ({ item, index, navigation }) => {
  const {
    pictures,
    nickname: title,
    prices: { basePrice: price, currency },
    bedrooms,
    beds,
    bathrooms,
    address: { full: location }
  } = item;

  const [activeImg, setActiveImg] = useState(1);
  return (
    <View key={index} style={styles.item} mt={3}>
      <Box
        shadow={4}
        position="relative"
        style={{ overflow: 'hidden' }}
      >
        <Box position="relative">
          <SliderBox
            images={
              pictures.map(p => p.original).splice(0, 3) ||
              []
            }
            sliderBoxHeight={210}
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
            firstItem={activeImg}
            ImageComponent={props => (
              <View
                style={[styles.customSlide]}
                position="relative"
                bg="rgba(0,0,0,0)"
              >
                {props?.source?.uri.length > 0 ? (
                  <Image
                    source={props.source}
                    alt={title}
                    borderRadius="10px"
                    width={CARD_ITEM_WIDTH}
                    height={'206px'}
                  />
                ) : (
                  <Image
                    source={StaysDefaultImage}
                    alt={title}
                    borderRadius="10px"
                    width={CARD_ITEM_WIDTH}
                    height={'206px'}
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
            currentImageEmitter={index =>
              setActiveImg(index)
            }
            circleLoop={true}
          />
          <Box
            position="absolute"
            w={CARD_ITEM_WIDTH}
            bottom="0px"
            h="76px"
            flexDir="column"
            justifyContent="flex-end"
            borderRadius="15px"
            zIndex="1"
            bg={{
              linearGradient: {
                colors: ['#00000000', '#000000']
              }
            }}
          >
            <View
              flexDir="row"
              alignItems="flex-end"
              justifyContent="flex-start"
              paddingBottom="10px"
              paddingLeft="10px"
            >
              {(
                pictures
                  .map(p => p.original)
                  .splice(0, 3) || []
              )?.map((_, index) => (
                <View key={index} mx="3px">
                  <Pressable
                    onPress={() => {
                      setActiveImg(index);
                    }}
                  >
                    <DotIcon
                      active={index === activeImg}
                      activeDotColor="#fff"
                    />
                  </Pressable>
                </View>
              ))}
            </View>
          </Box>
        </Box>
      </Box>
      <View flexDirection="column" mt={1}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ViewStaysHome', {
              id: item._id
            })
          }
        >
          <View
            flexDirection="row"
            justifyContent="space-between"
          >
            <Text
              fontSize="14.22px"
              textTransform="uppercase"
              letterSpacing="0.07em"
              fontWeight="500"
              _dark={{ color: 'white' }}
              _light={{ color: 'black' }}
              py="2"
              fontFamily="CodecPro-Bold"
            >
              {title}
            </Text>

            <Text
              fontSize="14.22px"
              textTransform="uppercase"
              letterSpacing="0.07em"
              fontWeight="500"
              _dark={{ color: 'white' }}
              _light={{ color: 'black' }}
              py="2"
              fontFamily="CodecPro-Bold"
            >
              ${price}&nbsp;{currency}/NIGHT
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          fontSize="14.22px"
          fontWeight="300"
          marginTop="6px"
          _dark={{ color: 'white' }}
          _light={{ color: 'black' }}
        >
          {bedrooms} bedrooms &bull; {beds} beds &bull;{' '}
          {bathrooms} bathrooms
        </Text>
        <Text
          fontSize="14.22px"
          fontWeight="300"
          marginTop="6px"
          _dark={{ color: 'white' }}
          _light={{ color: 'black' }}
        >
          {location}
        </Text>
      </View>
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    item: {
      marginBottom: 5,
      backgroundColor:
        props.color == 'white' ? 'white' : '#202020',
      borderRadius: 8
    },
    customImage: {
      width: 100,
      height: 100
    },
    customSlide: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

export default StayCard;
