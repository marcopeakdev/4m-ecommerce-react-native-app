import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { View } from 'native-base';

import Typography from 'src/components/Typography';
import SelectedDay from './SelectedDay';
import Day from './Day';

const DayView = props => {
  const { state, setDay, selectedDay } = props;

  const isSelectedDay = day => {
    const isSameDay = moment(day.timestamp).isSame(
      selectedDay,
      'day'
    );
    return isSameDay;
  };

  return (
    <View>
      <View flexDir="row">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(
          (day, index) => (
            <View
              key={index}
              w="48px"
              h="40px"
              alignItems="center"
              justifyContent="center"
            >
              <Typography type="semi_bold_14_12">
                {day}
              </Typography>
            </View>
          )
        )}
      </View>
      <View
        flexDir="row"
        alignItems="center"
        flexWrap="wrap"
        w="100%"
        maxW="337px"
        borderWidth="0.5px"
        borderColor="#E6E6E6"
      >
        {state?.monthDetails?.map((day, index) => {
          if (isSelectedDay(day) && day.month === 0) {
            return <SelectedDay day={day} key={index} />;
          }
          return (
            <Day key={index} day={day} setDay={setDay} />
          );
        })}
      </View>
    </View>
  );
};

DayView.propTypes = {
  state: PropTypes.object,
  selectedDay: PropTypes.string,
  setDay: PropTypes.func
};

export default DayView;
