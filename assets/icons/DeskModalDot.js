import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Circle } from 'react-native-svg';

const DotIcon = ({ active = false, width, height, fill, activeDotColor = "", ...props }) => {
  if (active) {
    return (
      <Svg
        width={18}
        height={18}
        fill="none"
        xmlns="https://www.w3.org/2000/svg"
        {...props}
      >
        <Circle
          cx={9}
          cy={9}
          r={9}
          fill={activeDotColor ? activeDotColor : '#202020'}
        />
      </Svg>
    );
  }
  return (
    <Svg
      width={width ? width : 14}
      height={height ? height : 14}
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={width ? width / 2 : 7} cy={height ? height / 2 : 7} r={width ? width / 2 : 7} fill={fill ? fill : "#ABABAB"} />
    </Svg>
  );
};

DotIcon.propTypes = {
  active: PropTypes.bool
};

export default DotIcon;
