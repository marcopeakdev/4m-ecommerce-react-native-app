import React from 'react';
import { Icon } from 'native-base';
import { Path, G, Rect } from 'react-native-svg';

const RightMessagingArrow = props => {
  return (
    <Icon
      viewBox="0 0 256 256"
      style={{
        height: 100,
        width: 100,
        position: 'absolute',
        right: 15,
        bottom: -15,
        zIndex: -1
      }}
    >
      <G
        fillRule="nonezero"
        scale={0.3}
        origin="100,185"
        transform="translate(-418.1, 0)"
      >
        <Path
          d="m945.86 348.19-199.51-201.24 199.51 1.2e-4z"
          fill={props.backgroundColor}
          stroke={props.backgroundColor}
          strokeWidth={100}
          strokeLinejoin="round"
        />
      </G>
    </Icon>
  );
};

export default RightMessagingArrow;
