import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

const DotIcon = ({ active = false, ...props }) => {
  if (active) {
    return (
      <Svg
        width={12}
        height={12}
        fill="none"
        xmlns="https://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          d="M0 6a6 6 0 1 1 12 0A6 6 0 0 1 0 6Z"
          fill="#757575"
        />
      </Svg>
    );
  }
  return (
    <Svg
      width={8}
      height={8}
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M0 4a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
        fill="#fff"
      />
    </Svg>
  );
};

DotIcon.propTypes = {
  active: PropTypes.bool
};

export default DotIcon;
