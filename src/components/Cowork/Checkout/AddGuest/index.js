import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { View, Actionsheet, Text } from 'native-base';

import Input from 'src/components/Input';
import Button from 'src/components/Button';

import GuestIcon from '../../../../../assets/icons/GuestIcon';

const schema = {
  email: Yup.string().email().required(),
  name: Yup.string().required()
};

const AddGuest = ({ open, setOpen }) => {
  const [values, setValues] = useState({});
  const [isValid, setIsValid] = useState(false);

  const onChange = (fieldName, text) => {
    setValues({ ...values, [fieldName]: text });
    onValidate();
  };

  const onValidate = async () => {
    const isValid = await Yup.object()
      .shape(schema)
      .isValid({ ...values });
    setIsValid(isValid);
  };

  return (
    <Actionsheet
      isOpen={open}
      onClose={() => setOpen(false)}
    >
      <View
        bgColor="#FFFFFF"
        position="absolute"
        bottom="0"
        w="100%"
        roundedTop="30px"
        px="18px"
        py="36px"
      >
        <View
          flexDir="row"
          justifyContent="center"
          mb="12px"
        >
          <GuestIcon />
        </View>
        <Text
          textAlign="center"
          color="#202020"
          fontSize="20.25px"
          fontWeight="600"
          lineHeight="28px"
          mb="8px"
        >
          Add Guests
        </Text>
        <Text
          fontSize="14.22"
          lineHeight="21px"
          color="#202020"
          fontWeight="400"
          textAlign="center"
        >
          Please fill out the information below to invite
          guests to join you.
        </Text>
        <View mt="12px">
          <Input
            label="Name"
            labelStyles={{ color: '#202020' }}
            containerProps={{ marginBottom: '12px' }}
            bgColor="#E6E6E6"
            inputBorderColor="#202020"
            inputBorderWidth="3px"
            style={{ color: '#202020' }}
            onChangeText={text => onChange('name', text)}
            validation={schema.name}
            value={values.name}
          />
          <Input
            label="Email"
            labelStyles={{ color: '#202020' }}
            bgColor="#E6E6E6"
            inputBorderColor="#202020"
            inputBorderWidth="3px"
            style={{ color: '#202020' }}
            onChangeText={text => onChange('email', text)}
            validation={schema.email}
            value={values.email}
          />
          <Button
            variant="purple"
            h="48px"
            mt="88px"
            _text={{
              color: '#202020',
              fontSize: '14.22px',
              lineHeight: '12px'
            }}
            disabled={!isValid}
            _disabled={{
              bg: 'brand.lightGrayOnBlack',
              opacity: 1,
              _text: { opacity: 0.4 }
            }}
          >
            Invite Guest
          </Button>
        </View>
      </View>
    </Actionsheet>
  );
};

AddGuest.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
};

export default AddGuest;
