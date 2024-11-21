import {
  Box,
  Flex,
  Pressable,
  Spacer,
  Text,
  View
} from 'native-base';
import React from 'react';
import DayPassIcon from '../../../assets/icons/DayPassIcon';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const DayPassCardWrapper = ({ item, index }) => {
  return <DayPassComponent {...{ item, index }} />;
};

const DayPassComponent = ({ item, index }) => {
  const navigation = useNavigation();

  const onSelect = () => {
    navigation.navigate('Terms', {
      checkoutType: 'OPEN_WORK'
    });
  };

  return (
    <Box
      py="12"
      my={'4'}
      w={'full'}
      rounded="2xl"
      flexDir="column"
      alignItems={'center'}
      shadow="2"
      backgroundColor={'white'}
    >
      <DayPassIcon />
      <Text py={2} fontSize={'20'} fontWeight="600">
        {item.title}
      </Text>
      <Text fontSize="14px">${item.price}</Text>
      <Flex
        alignItems={'center'}
        justifyContent="center"
        borderRadius={'md'}
        w="93px"
        h="22px"
        my={2}
        style={{ backgroundColor: '#ABABAB' }}
      >
        <Text fontSize="14px">{item.badgeTitle}</Text>
      </Flex>
      <Text textAlign={'center'} py="4" fontWeight="300">
        {item.description}
      </Text>
      <Box flexDir={'row'} alignItems="center">
        <Svg
          width={35}
          height={35}
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <Path
            d="M24.792 14.583a2.925 2.925 0 0 0 2.917-2.916V7.292a2.925 2.925 0 0 0-2.917-2.917H10.209a2.925 2.925 0 0 0-2.917 2.917v4.375a2.925 2.925 0 0 0 2.917 2.916h1.458V17.5h-1.458a2.925 2.925 0 0 0-2.917 2.917v10.208h2.917V26.25h14.583v4.375h2.917V20.417a2.925 2.925 0 0 0-2.917-2.917h-1.458v-2.917h1.458Zm-14.583-2.916V7.292h14.583v4.375H10.209Zm14.583 11.666H10.209v-2.916h14.583v2.916ZM20.417 17.5h-5.833v-2.917h5.833V17.5Z"
            fill="#202020"
          />
        </Svg>
        <Text ml={3} fontSize={14}>
          {item.otherDetail}
        </Text>
      </Box>
      <Pressable onPress={onSelect}>
        <Text
          fontSize={14}
          fontWeight={'500'}
          color={'#01AF8F'}
          mt={12}
        >
          SELECT THIS DAY PASS
        </Text>
      </Pressable>
    </Box>
  );
};

DayPassComponent.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};

DayPassComponent.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number
};

export default DayPassCardWrapper;
