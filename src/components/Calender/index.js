import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import { View } from 'native-base';

import MonthHandler from './MonthHandler';
import DayView from './DayView';

import { getMonthDetails } from './utils';

const Calender = ({ selectedDay, setSelectedDay }) => {
  const date = new Date();
  const [state, setState] = useState({
    year: date.getFullYear(),
    month: date.getMonth(),
    monthDetails: getMonthDetails(
      date.getFullYear(),
      date.getMonth()
    )
  });
  const monthHandler = increment => {
    let year = state.year;
    let month = state.month + increment;
    if (month === -1) {
      month = 11;
      year -= 1;
    } else if (month === 12) {
      month = 0;
      year += 1;
    }
    const payload = {
      year,
      month,
      monthDetails: getMonthDetails(state?.year, month)
    };
    setState({ ...state, ...payload });
  };

  const setDay = day => {
    setSelectedDay(day.timestamp);
  };
  return (
    <View>
      <MonthHandler
        monthHandler={monthHandler}
        state={state}
      />
      <DayView
        state={state}
        setDay={setDay}
        selectedDay={selectedDay}
      />
    </View>
  );
};

Calender.propTypes = {
  selectedDay: PropTypes.string,
  setSelectedDay: PropTypes.any
};

export default Calender;
