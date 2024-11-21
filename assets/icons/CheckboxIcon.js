import * as React from 'react';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  Path
} from 'react-native-svg';

import PropTypes from 'prop-types';

const SvgComponent = props => {
  const { active = false, rounded = false } = props;
  if (!active && rounded) {
    return (
      <Svg
        width={25}
        height={26}
        fill="none"
        xmlns="https://www.w3.org/2000/svg"
        {...props}
      >
        <Circle
          cx={12.5}
          cy={13}
          r={11.5}
          stroke="#202020"
          strokeWidth={2}
        />
      </Svg>
    );
  }
  if (rounded && active) {
    return (
      <Svg
        width={25}
        height={26}
        fill="none"
        xmlns="https://www.w3.org/2000/svg"
        {...props}
      >
        <Circle
          cx={12.5}
          cy={13}
          r={11.5}
          stroke="url(#a)"
          strokeWidth={2}
        />
        <Circle cx={12.5} cy={13} r={9.5} fill="#ABABAB" />
        <Defs>
          <LinearGradient
            id="a"
            x1={20.192}
            y1={7.231}
            x2={0}
            y2={22.615}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#9E81D2" />
            <Stop offset={1} stopColor="#4D8FFB" />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  }
  if (!rounded && active) {
    return (
      <Svg
        width={25}
        height={25}
        fill="none"
        xmlns="https://www.w3.org/2000/svg"
        {...props}
      >
        <Rect
          x={1}
          y={1}
          width={23}
          height={23}
          rx={4}
          stroke="url(#a)"
          strokeWidth={2}
        />
        <Path
          d="M7.707 12.793a1 1 0 0 0-1.414 1.414l1.414-1.414ZM12.5 19l-.707.707 1.014 1.014.601-1.302L12.5 19Zm6.908-12.58a1 1 0 0 0-1.816-.84l1.816.84ZM6.293 14.206l5.5 5.5 1.414-1.414-5.5-5.5-1.414 1.414Zm7.115 5.212 6-13-1.816-.838-6 13 1.816.838Z"
          fill="#202020"
        />
        <Defs>
          <LinearGradient
            id="a"
            x1={20.192}
            y1={6.731}
            x2={0}
            y2={22.115}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#9E81D2" />
            <Stop offset={1} stopColor="#4D8FFB" />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  }
  return (
    <Svg
      width={25}
      height={25}
      fill="none"
      xmlns="https://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={1}
        y={1}
        width={23}
        height={23}
        rx={4}
        stroke="#202020"
        strokeWidth={2}
      />
    </Svg>
  );
};

SvgComponent.propTypes = {
  active: PropTypes.bool,
  rounded: PropTypes.bool
};

export default SvgComponent;
