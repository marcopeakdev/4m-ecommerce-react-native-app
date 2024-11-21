import React from 'react';
import { Icon, Text } from 'native-base';
import { Path, G } from 'react-native-svg';

export default InfoIcon = props => {
  const isHeader = props.isHeader ? props.isHeader : false;
  const scale = props.size === 'small' ? '.6' : '1';
  const fillColor = props.props?.color
    ? props.props.color
    : props.color
    ? props.color
    : '#202020';

  return (
    <>
      <Icon viewBox="0 0 256 256">
        <G
          fillRule="nonezero"
          fill="none"
          scale={scale}
          origin="100,100"
        >
          <Path
            d="M128,256A128,128,0,1,1,256,128,128.14,128.14,0,0,1,128,256Zm0-236.67A108.67,108.67,0,1,0,236.67,128,108.79,108.79,0,0,0,128,19.33Z"
            fill={`${fillColor}`}
          />
          <Path
            d="M 128.04 92.34
          m -11.55, 0
          a 11.55, 11.55 0 1, 0 23.1, 0
          a 11.55, 11.55 0 1, 0 -23.1, 0"
            fill={`${fillColor}`}
          />
          <Path
            d="M 118.5 116.71, 137.59 116.71, 137.59 175.21, 118.5 175.21"
            fill={`${fillColor}`}
          />
          <Path
            d="M 128.04 116.71 V 58.5 Z"
            fill={`${fillColor}`}
          />
        </G>
      </Icon>
      {isHeader && (
        <Text
          variant="bottomTab"
          mt={2}
          color={`${fillColor}`}
        >
          info
        </Text>
      )}
    </>
  );
};
