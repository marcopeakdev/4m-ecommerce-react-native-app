import React from 'react';
import PropTypes from 'prop-types';

import { LinearGradient } from 'expo-linear-gradient';

import { Box } from 'native-base';

import Typography from 'src/components/Typography';

const SelectedDay = props => {
  const { day } = props;
  return (
    <LinearGradient
      colors={['#9E81D2', '#4D8FFB']}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={{
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: 48
      }}
    >
      <Box
        flexDir="row"
        justifyContent="center"
        alignItems="center"
        style={{
          height: 32,
          width: 40,
          textAlign: 'center',
          backgroundColor: '#000'
        }}
      >
        <Typography
          type="light_14_21"
          style={{ color: '#fff' }}
        >
          {day.date}
        </Typography>
      </Box>
    </LinearGradient>
  );
};

SelectedDay.propTypes = {
  day: PropTypes.any
};

export default SelectedDay;
