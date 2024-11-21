import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import PropTypes from 'prop-types';

const SvgComponent = ({ color, ...props }) => (
  <Svg
    width={27}
    height={28}
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M0 3.828v20.344h27V3.828H0Zm24.815 2.266V8.52H2.185V6.094h22.63ZM2.185 21.906v-10.25h22.63v10.25H2.185Z"
      fill={color || '#202020'}
    />
  </Svg>
);

SvgComponent.propTypes = {
  color: PropTypes.color
};

export default SvgComponent;
