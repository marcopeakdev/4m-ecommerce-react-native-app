import React from 'react';
import { View, Text, ScrollView } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';


const Availability = ({ data }) => {
  return (
    <View position="relative" my="4">
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF00']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={{
          height: 72,
          width: 86,
          position: 'absolute',
          zIndex: 1,
          left: -18
        }}
      />
      <LinearGradient
        colors={['#FFFFFF00', '#FFFFFF']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={{
          height: 72,
          width: 86,
          position: 'absolute',
          zIndex: 1,
          right: -18
        }}
      />
      <ScrollView
        flexDir={'row'}
        horizontal={true}
        w="100%"
      >
        {data?.map(
          ({ time, selected, isDay }, index) => (
            <View
              key={index}
              borderColor="#595959"
              borderLeftWidth={'2'}
              bg={selected ? '#01AF8F' : 'coolGray.100'}
              w="52px"
              h={'72px'}
              justifyContent="flex-end"
              alignItems={'center'}
              py={'2'}
            >
              <View>
                <Text fontWeight={'bold'}>{time} </Text>
                <Text textAlign={'center'}>{isDay ? 'am' : 'pm'}</Text>
              </View>
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default Availability;
