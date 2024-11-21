import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { View, Actionsheet } from 'native-base';

import Button from 'src/components/Button';
import Calender from 'src/components/Calender';

import DateIcon from '../../../../assets/icons/DateIcon';

const DatePicker = ({ isOpen, setOpen, ...props }) => {
  const [selectedDay, setSelectedDay] = useState(
    props.selectedDay
  );

  const onSave = () => {
    props.setSelectedDay(selectedDay);
    setOpen(false);
  };

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={() => setOpen(false)}
    >
      <Actionsheet.Content>
        <View
          w="100%"
          flexDir="row"
          justifyContent="center"
          mt="12px"
        >
          <DateIcon />
        </View>
        <Calender {...{ selectedDay, setSelectedDay }} />
        <Button
          variant="purple"
          _text={{
            fontSize: '14.22px',
            color: '#202020'
          }}
          h="48px"
          mt="68px"
          maxW="339px"
          onPress={onSave}
          disabled={!selectedDay}
          _disabled={{
            bg: 'brand.lightGrayOnBlack',
            opacity: 1,
            _text: { opacity: 0.4 }
          }}
        >
          Save
        </Button>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

DatePicker.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func,
  selectedDay: PropTypes.string,
  setSelectedDay: PropTypes.any
};

export default DatePicker;
