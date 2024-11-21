import React from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'native-base';

import Button from 'src/components/Button';

import CardIcon from '../../../../assets/icons/CardIcon';

const BookMembershipButton = props => {
  const { disabled } = props;
  const color = disabled ? '#FFFFFF' : '#202020';

  return (
    <Button
      {...props}
      h="48px"
      variant="purple"
      _disabled={{
        bg: 'brand.lightGrayOnBlack',
        opacity: 1,
        _text: { opacity: 0.4 }
      }}
    >
      <View
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <View flexDir="row" alignItems="center">
          <CardIcon color={color} />
          <Text
            ml="14px"
            fontSize="14.22px"
            lineHeight="12px"
            color={color}
          >
            Book Membership
          </Text>
        </View>
        <Text
          ml="14px"
          fontSize="14.22px"
          lineHeight="12px"
          color={color}
        >
          $50.00
        </Text>
      </View>
    </Button>
  );
};

BookMembershipButton.propTypes = {
  disabled: PropTypes.bool
};

export default BookMembershipButton;
