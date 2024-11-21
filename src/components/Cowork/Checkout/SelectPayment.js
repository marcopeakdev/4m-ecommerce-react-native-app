import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Pressable, View, Text } from 'native-base';

import CheckBoxIcon from '../../../../../assets/icons/CheckboxIcon';
import CardIcon from '../../../../../assets/icons/CardIcon';

const SelectPayment = props => {
  const { paymentType, Icon } = props;
  const onClickHandle = () => {};


  return (
    <Pressable
      onPress={onClickHandle}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pt="11px"
      pb="12px"
      borderBottomColor="#ABABAB"
      borderBottomWidth="1px"
    >
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <CheckBoxIcon  rounded />
        <Text ml="20px">{paymentType.title}</Text>
      </View>
      {Icon ? <Icon /> : <CardIcon />}
    </Pressable>
  );
};

SelectPayment.propTypes = {
  paymentType: PropTypes.object,
  Icon: PropTypes.any
};

export default SelectPayment;
