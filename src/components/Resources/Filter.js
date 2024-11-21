import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';

import { Pressable, Box } from 'native-base';

import Typography from '../Typography';

import CloseFilterIcon from '../../../assets/icons/CloseFilterIcon';

const Filter = ({
  title,
  selected,
  removeFilter,
  addFilter
}) => {
  if (selected) {
    return (
      <LinearGradient
        colors={['#9E81D2', '#4D8FFB']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={{
          height: 32,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          marginRight: 10
        }}
      >
        <Box
          py="8px"
          px="12px"
          flexDir="row"
          alignItems="center"
          mx="2px"
          style={{
            width: '97.5%',
            height: 28,
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: '14px'
          }}
        >
          <Typography type="normal_14_16" mr="10px">
            {title}
          </Typography>
          <Pressable onPress={() => removeFilter(title)}>
            <CloseFilterIcon />
          </Pressable>
        </Box>
      </LinearGradient>
    );
  }
  return (
    <Pressable
      borderWidth="1px"
      rounded="24px"
      mr="10px"
      py="8px"
      px="12px"
      onPress={() => addFilter(title)}
    >
      <Typography type="normal_14_16">{title}</Typography>
    </Pressable>
  );
};

Filter.propTypes = {
  title: PropTypes.title,
  selected: PropTypes.bool,
  removeFilter: PropTypes.func,
  addFilter: PropTypes.func
};

export default Filter;
