import React from 'react';

import PropTypes from 'prop-types';

import { Box, Image } from 'native-base';

import Typography from 'src/components/Typography';

import CarImage from '../../../../../../assets/images/car-image.png';

const Banner = () => {
  return (
    <Box
      bg={{
        linearGradient: {
          colors: ['#202020', '#202020', '#FFFFFF'],
          start: [0, 0],
          end: [1, 0]
        }
      }}
      borderRadius="10px"
      width="237px"
      height="70px"
      p="13px"
    >
      <Image
        source={CarImage}
        position="absolute"
        right="0"
      />
      <Typography
        type="semi_bold_14_22_uppercase"
        color="#FFFFFF"
      >
        Need a ride?
      </Typography>
      <Typography
        type="normal_14_21"
        lineHeight="300"
        color="#FFFFFF"
      >
        We got you covered.
      </Typography>
    </Box>
  );
};

Banner.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};

export default Banner;
