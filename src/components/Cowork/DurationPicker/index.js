import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Actionsheet, Box, Text } from 'native-base';
import Button from 'src/components/Button';
import DurationIcon from '../../../../assets/icons/Duration';
import HourPickerCarousel from './HourPickerCarousel';
import { LinearGradient } from 'expo-linear-gradient';
import MinutePickerCarousel from './MinutePickerCarousel';

const DurationPicker = ({ isOpen, setOpen, ...props }) => {
  const [selectedDurationHours, setSelectedDurationHours] =
    useState(props.selectedDurationHours);

  const [
    selectedDurationMinutes,
    setSelectedDurationMinutes
  ] = useState(props.selectedDurationMinutes);

  const onSave = () => {
    props.setSelectedDurationHours(selectedDurationHours);
    props.setSelectedDurationMinutes(
      selectedDurationMinutes
    );
    setOpen(false);
  };

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={() => setOpen(false)}
    >
      <Actionsheet.Content p={'0'}>
        <DurationIcon />
        <Box
          w="100%"
          flexDir={'row'}
          h={'96'}
          justifyContent="center"
          alignItems={'center'}
          position="relative"
        >
          <HourPickerCarousel
            selectedDurationHours={selectedDurationHours}
            setSelectedDurationHours={
              setSelectedDurationHours
            }
          />
          <MinutePickerCarousel
            selectedDurationMinutes={
              selectedDurationMinutes
            }
            setSelectedDurationMinutes={
              setSelectedDurationMinutes
            }
          />
          <LinearGradient
            colors={['#9E81D2', '#4D8FFB']}
            start={{ x: 1, y: 0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={{
              height: 60,
              width: '100%',
              position: 'absolute',
              top: 138,
              zIndex: -1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box
              w={'98%'}
              backgroundColor="#fff"
              style={{ height: 53 }}
            ></Box>
          </LinearGradient>
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

DurationPicker.propTypes = {
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func
};

export default DurationPicker;
