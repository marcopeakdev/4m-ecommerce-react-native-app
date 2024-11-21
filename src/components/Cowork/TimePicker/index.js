import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Actionsheet, Box, Text } from 'native-base';
import Button from 'src/components/Button';
import StartTimeIcon from '../../../../assets/icons/StartTime';
import { LinearGradient } from 'expo-linear-gradient';
import TimePickerCarousel from './TimePickerCarousel';

const TimePicker = ({ isOpen, setOpen, ...props }) => {
  const [selectedTime, setSelectedTime] = useState(
    props.selectedTime
  );

  const onSave = () => {
    props.setSelectedTime(selectedTime);
    setOpen(false);
  };

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={() => setOpen(false)}
    >
      <Actionsheet.Content p={'0'}>
        <StartTimeIcon />
        <Box
          w="100%"
          h={'96'}
          justifyContent="center"
          position="relative"
        >
          <TimePickerCarousel
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
          <LinearGradient
            colors={['#FAFAFA', '#FFFFFF00']}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            style={{
              height: 140,
              width: 180,
              position: 'absolute',
              zIndex: 1,
              left: 145,
              top: 0
            }}
          />
          <LinearGradient
            colors={['#FAFAFA', '#FFFFFF00']}
            start={{ x: 0.0, y: 1.0 }}
            end={{ x: 0.0, y: 0.0 }}
            style={{
              height: 140,
              width: 180,
              position: 'absolute',
              zIndex: 1,
              left: 145,
              bottom: 0
            }}
          />
        </Box>
        <Button
          variant="purple"
          _text={{
            fontSize: '14.22px',
            color: '#202020'
          }}
          onPress={onSave}
          h="48px"
          maxW="339px"
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

TimePicker.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func
};

export default TimePicker;
