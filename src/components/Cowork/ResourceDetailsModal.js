import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import DotIcon from '../../../assets/icons/DeskModalDot';
import {
  Modal,
  View,
  Image,
  Text,
  Pressable,
  ScrollView,
  Box,
  Flex
} from 'native-base';

import DeskImg from '../../../assets/images/conference-room.png';
import DestinationLocation from '../../../assets/images/4M_DestinationLocation.png';
import CancelIcon from '../../../assets/icons/Cancel';

import { DesksArr } from './Constant';

import Typography from 'src/components/Typography';
import Button from 'src/components/Button';
import ChairIcon from '../chair';
import WifiIcon from '../../../assets/icons/Wifi';
import TVIcon from '../../../assets/icons/TV';
import FlowerIcon from '../../../assets/icons/Flower';
import PaintingIcon from '../../../assets/icons/Painting';

import DatePicker from './DatePicker';
import DurationPicker from './DurationPicker';
import TimePicker from './TimePicker';
import Availability from './Availability';
import SelectButton from './SelectButton';
import availabilityTime from './availabilityTime';

const ResourceDetailsModal = ({
  showModal,
  setShowModal
}) => {
  const navigation = useNavigation();
  const [activeImg, setActiveImg] = useState(1);
  const [datePicker, setDatePicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [durationPicker, setDurationPicker] =
    useState(false);
  const [availableTime, setAvailableTime] = useState(
    availabilityTime
  );
  const [submitButton, setSubmitButton] = useState(true);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDurationHour, setSelectedDurationHours] =
    useState(null);
  const [
    selectedDurationMinutes,
    setSelectedDurationMinutes
  ] = useState(null);

  const handlePagination = index => {
    setActiveImg(index);
  };

  const openDatePicker = () => {
    setDatePicker(true);
  };

  const bookResource = () => {
    setShowModal(false);
    navigation.navigate('CoWorkCheckout', {
      checkoutType: 'RESERVE_CONFERENCE_ROOM'
    });
  };

  // This contains the logic to be implemented when the user selects the Start Time
  useEffect(() => {
    if (selectedTime) {
      let temp = availableTime.map(timeObject => {
        if (timeObject.id === selectedTime.id) {
          var newKey = Object.assign({}, timeObject);
          newKey.selected = true;
          return newKey;
        } else if (timeObject.selected) {
          timeObject.selected = false;
          return timeObject;
        }
        return timeObject;
      });
      setAvailableTime(temp);
    }
  }, [selectedTime]);

  // This contains the logic to be implemented when the user selects the Time Duration
  useEffect(() => {
    if (
      selectedDurationHour !== null &&
      selectedDurationMinutes !== null &&
      selectedTime
    ) {
      setSubmitButton(false);
      // This is how many boxes after the selected time box has to be filled
      let totalTurns = 2 * selectedDurationHour;
      let turnsFlag = false;
      let temp = availableTime.map(timeObject => {
        if (timeObject.id === selectedTime.id) {
          var newKey = Object.assign({}, timeObject);
          newKey.selected = true;
          turnsFlag = true;
          return newKey;
        }
        if (turnsFlag && totalTurns) {
          var newKey = Object.assign({}, timeObject);
          newKey.selected = true;
          totalTurns = totalTurns - 1;
          return newKey;
        }
        return timeObject;
      });
      setAvailableTime(temp);
    } else if (
      selectedDurationHour !== null &&
      selectedDurationMinutes !== null &&
      !selectedTime
    ) {
      setSelectedDurationHours(null);
      setSelectedDurationMinutes(null);
    }
  }, [selectedDurationHour, selectedDurationMinutes]);

  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      style={{
        height: Dimensions.get('window').height
      }}
      bgColor="#fff"
      propagateSwipe
    >
      <View bgColor="#fff" w="100%" h="100%">
        <DatePicker
          isOpen={datePicker}
          setOpen={setDatePicker}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />
        <TimePicker
          isOpen={timePicker}
          setOpen={setTimePicker}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <DurationPicker
          isOpen={durationPicker}
          setOpen={setDurationPicker}
          selectedDurationHour={selectedDurationHour}
          setSelectedDurationHours={
            setSelectedDurationHours
          }
          selectedDurationMinutes={selectedDurationMinutes}
          setSelectedDurationMinutes={
            setSelectedDurationMinutes
          }
        />
        <Pressable
          position="absolute"
          top="50px"
          right="20px"
          zIndex={2}
          onPress={() => setShowModal(false)}
        >
          <View
            w="27px"
            h="27px"
            backgroundColor="#20202080"
            rounded="14px"
            flexDir="row"
            alignItems="center"
            justifyContent="center"
          >
            <CancelIcon />
          </View>
        </Pressable>
        <View w="100%" h="276px" position="relative">
          <Image
            alt={'Desk Image'}
            source={DeskImg}
            resizeMode="cover"
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
            flexDir="column"
            justifyContent="flex-end"
            bg={{
              linearGradient: {
                colors: ['#ffffff00', '#ffffff']
              }
            }}
          >
            <View
              flexDir="row"
              alignItems="flex-end"
              justifyContent="flex-end"
              paddingBottom="15px"
              paddingRight="10px"
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
        <Box
          px="18px"
          flexDir="column"
          justifyContent="center"
          bg="white"
          minH="91px"
          style={{
            backgroundColor: '#ffffff',
            shadowColor: '#171717',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            elevation: 3
          }}
        >
          <View
            flexDir="row"
            justifyContent="space-between"
          >
            <Text
              fontSize="20.25px"
              lineHeight="28px"
              color="#202020"
              fontWeight="bold"
              maxW="70%"
            >
              Conference Room 10
            </Text>
            <Typography
              type="semi_bold_16_14_uppercase"
              letterSpacing="0.1em"
            >
              $50/hour
            </Typography>
          </View>
          <View
            flexDir="row"
            w="100%"
            justifyContent="space-between"
          >
            <View flexDir="row" w="60%">
              <Image
                alt="location Icon"
                source={DestinationLocation}
                resizeMode="contain"
                mt="4px"
              />
              <Text
                ml="6px"
                fontSize="14.22px"
                lineHeight="21px"
                color="#202020"
              >
                1919 S Industrial Hwy, Ann Arbor, MI 48104
              </Text>
            </View>
            <Typography
              type="semi_bold_16_14_uppercase"
              letterSpacing="0.1em"
            >
              5 Tokens
            </Typography>
          </View>
        </Box>
        <Modal.Body px="18px">
          <ScrollView pb="50px">
            <View>
              {/* Availability Section */}
              <View>
                <Text
                  fontSize="16px"
                  lineHeight="13.74px"
                  color="#202020"
                  fontWeight="extrabold"
                  letterSpacing="0.4em"
                  mb="8px"
                >
                  AVAILABILITY
                </Text>
                <Availability data={availableTime} />
              </View>
              <View
                flexDir="row"
                justifyContent="space-between"
                w="100%"
                mt={4}
                mb={8}
              >
                <SelectButton
                  onPress={openDatePicker}
                  selected={!!selectedDay}
                >
                  <Text>
                    {selectedDay
                      ? moment(selectedDay).format(
                          'ddd, MMM d'
                        )
                      : 'Date'}
                  </Text>
                </SelectButton>
                <SelectButton
                  onPress={() => setTimePicker(true)}
                  selected={selectedTime}
                >
                  <Text>
                    {selectedTime
                      ? selectedTime.time &&
                        selectedTime.isDay
                        ? selectedTime.time + ' am'
                        : selectedTime.time + ' pm'
                      : 'Start Time'}
                  </Text>
                </SelectButton>
                <SelectButton
                  onPress={() => setDurationPicker(true)}
                  selected={selectedDurationHour}
                >
                  <Text>
                    {selectedDurationHour
                      ? selectedDurationHour +
                        'hr ' +
                        selectedDurationMinutes +
                        'min'
                      : 'Duration'}
                  </Text>
                </SelectButton>
              </View>
              <Text
                fontSize="16px"
                lineHeight="13.74px"
                color="#202020"
                fontWeight="extrabold"
                letterSpacing="0.4em"
                mb="8px"
              >
                DESCRIPTION
              </Text>
              <Typography
                type="light_16_21"
                color="#202020"
                mb="8px"
              >
                Ultrices pulvinar dolor mauris tortor quis
                turpis egestas. Vulputate nulla elit a,
                imperdiet dui. Tincidunt ullamcorper diam
                tristique feugiat hendrerit quam.
              </Typography>
            </View>

            <View
              flexDir={'row'}
              justifyContent="space-between"
              alignItems={'center'}
              horizontal={true}
              w="100%"
              py="4"
            >
              <Flex flexDir={'column'} alignItems="center">
                <ChairIcon width={20} height={40} />
                <Text>6 Seats</Text>
              </Flex>
              <WifiIcon />
              <TVIcon />
              <FlowerIcon />
              <PaintingIcon />
            </View>
          </ScrollView>
        </Modal.Body>
        <View
          position="absolute"
          bottom="30px"
          px="18px"
          w="100%"
        >
          <Button
            variant="purple"
            h="48px"
            w="100%"
            _text={{
              fontSize: '14.22px',
              lineHeight: '12px'
            }}
            onPress={bookResource}
            disabled={submitButton}
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
          >
            Book Resource
          </Button>
        </View>
      </View>
    </Modal>
  );
};

ResourceDetailsModal.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.object
};

export default ResourceDetailsModal;
