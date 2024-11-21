import React from 'react';
import PropTypes from 'prop-types';

import { Pressable } from 'native-base';

import Typography from 'src/components/Typography';

const Day = props => {
  const { day, setDay } = props;
  return (
    <Pressable
      onPress={() => day.month === 0 && setDay(day)}
      maxW="48px"
      w="48px"
      h="40px"
      borderWidth="0.5px"
      borderColor="#E6E6E6"
      flexDir="row"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        type="light_14_21"
        style={{
          color: day.month !== 0 ? '#757575' : '#202020'
        }}
      >
        {day.date}
      </Typography>
    </Pressable>
  );
};

Day.propTypes = {
  day: PropTypes.any,
  setDay: PropTypes.func
};

export default Day;
