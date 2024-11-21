import React from 'react';
import PropsTypes from 'prop-types';

import { View, Pressable } from 'native-base';

import Typography from 'src/components/Typography';

import { monthMap } from '../utils';

import ChecvronIcon from '../../../../assets/icons/Chevron';

const MonthHandler = props => {
  const { monthHandler, state } = props;

  const getMonth = month =>
    monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

  const onPrevMonth = () => {
    monthHandler(-1);
  };

  const onNextMonth = () => {
    monthHandler(1);
  };

  return (
    <View
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Pressable
        flexDir="row"
        alignItems="center"
        justifyContent="center"
        borderColor="#202020"
        borderWidth="1px"
        w="27px"
        h="27px"
        rounded="14px"
        onPress={onPrevMonth}
      >
        <ChecvronIcon />
      </Pressable>
      <Typography
        type="bold_20_28"
        letterSpacing="0.05em"
        pt="17px"
        pb="18px"
      >
        {getMonth(state.month)} {state.year}
      </Typography>
      <Pressable
        flexDir="row"
        alignItems="center"
        justifyContent="center"
        onPress={onNextMonth}
        borderColor="#202020"
        borderWidth="1px"
        w="27px"
        h="27px"
        rounded="14px"
        style={{
          transform: [{ rotate: '180deg' }]
        }}
      >
        <ChecvronIcon />
      </Pressable>
    </View>
  );
};

MonthHandler.propTypes = {
  state: PropsTypes.any,
  monthHandler: PropsTypes.func
};

export default MonthHandler;
