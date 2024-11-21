import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { View, Box, Image, Pressable } from 'native-base';

import DotIcon from '../../../assets/icons/Dot';

import { DesksArr } from './Constant';

const DeskCardItem = () => {
  const [activeImg, setActiveImg] = useState(1);

  const handlePagination = index => {
    setActiveImg(index);
  };

  return (
    <View w="100%" h={206} position="relative">
      <Image
        alt={'Desk Image'}
        source={DesksArr?.[activeImg]?.imgSource}
        resizeMode="cover"
        borderRadius={15}
        style={{
          filter:
            'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))'
        }}
        w="100%"
        h="100%"
      />
      <Box
        position="absolute"
        w="100%"
        bottom="0"
        h="74px"
        borderRadius="15px"
        flexDir="column"
        justifyContent="flex-end"
        bg={{
          linearGradient: {
            colors: ['#20202000', '#202020']
          }
        }}
      >
        <View
          flexDir="row"
          alignItems="flex-end"
          paddingBottom="15px"
          paddingLeft="10px"
        >
          {DesksArr?.map((_, index) => (
            <>
              <Pressable
                onPress={() => handlePagination(index)}
              >
                <DotIcon active={index === activeImg} />
              </Pressable>
              <View mx="3px" />
            </>
          ))}
        </View>
      </Box>
    </View>
  );
};

DeskCardItem.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};

export default DeskCardItem;
