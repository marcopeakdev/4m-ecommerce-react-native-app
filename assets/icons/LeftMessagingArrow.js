import React from 'react';
import { Icon } from 'native-base';
import { Path, G, Rect } from 'react-native-svg';

const LeftMessagingArrow = props => {
  return (
    <Icon
      viewBox="0 0 256 256"
      style={{
        height: 100,
        width: 100,
        position: 'absolute',
        left: 15,
        bottom: -15,
        zIndex: -1
      }}
    >
      <G
        fillRule="nonezero"
        scale={0.3}
        origin="-100,185"
        transform="translate(-418.1, 0)"
      >
        <Path
          d="m 746.34838,348.19347 199.51201,-201.24036 -199.51213,1.2e-4 z"
          fill={props.backgroundColor}
          stroke={props.backgroundColor}
          strokeWidth={100}
          strokeLinejoin="round"
        />
      </G>
    </Icon>
  );
};

export default LeftMessagingArrow;
