import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';

import { LinearGradient } from 'expo-linear-gradient';

import Button from 'src/components/Button';
import DropdownIcon from '../../../assets/icons/Dropdown';

const SelectButton = props => {
  const { children, selected, ...remProps } = props;

  if (selected) {
    return (
      <LinearGradient
        colors={['#9E81D2', '#4D8FFB']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1.0 }}
        style={{
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          marginRight: 10,
          maxWidth: '33%'
        }}
      >
        <Button
          h="28px"
          mx="2px"
          py="0"
          color="#202020"
          variant="outline"
          borderWidth="0"
          endIcon={
            <Icon as={DropdownIcon} name="dropdown" />
          }
          {...remProps}
          style={{
            backgroundColor: '#e6dff3',
            borderRadius: '13px',
            maxWidth: '96%'
          }}
        >
          {children}
        </Button>
      </LinearGradient>
    );
  }
  return (
    <Button
      h="32px"
      w={'auto'}
      maxWidth="33%"
      py="0"
      borderColor="#202020"
      color="#202020"
      variant="outline"
      endIcon={<Icon as={DropdownIcon} name="dropdown" />}
      {...remProps}
    >
      {children}
    </Button>
  );
};

SelectButton.propTypes = {
  children: PropTypes.any,
  selected: PropTypes.bool
};

export default SelectButton;
