import React from 'react';
import { Icon, Text } from 'native-base';
import { Path, G } from 'react-native-svg';

export default InboxIcon = props => {
  const isHeader = props.isHeader ? props.isHeader : false;
  const scale = props.size === 'small' ? '.6' : '1';
  const fillColor = props.props?.color
    ? props.props.color
    : props.color
    ? props.color
    : '#202020';

  return (
    <>
      <Icon viewBox="0 0 256 256" borderWidth={0}>
        <G
          fillRule="nonezero"
          fill="none"
          scale={scale}
          origin="100,100"
        >
          <Path
            d="M255.82,62.37c0-26.15-20-47.42-44.65-47.42H44.64C20,15,0,36.22,0,62.37V166.66c0,26.15,20,47.43,44.64,47.43H162.15l27.14,27,33.63-.25L172,190.19H44.64c-11.44,0-20.75-10.55-20.75-23.53V62.37c0-13,9.31-23.53,20.75-23.53H211.17c11.44,0,20.75,10.56,20.75,23.53l.19,105.89a22.44,22.44,0,0,1-13.43,20.54l9.6,21.88A46.32,46.32,0,0,0,256,168.26Z"
            fill={`${fillColor}`}
          />
          <Path
            d="M 79.06 116.75
          m -15.88, 0
          a 15.88, 15.88 0 1, 0 31.76, 0
          a 15.88, 15.88 0 1, 0 -31.76, 0"
            fill={`${fillColor}`}
          />
          <Path
            d="M 127.23 116.75
          m -15.88, 0
          a 15.88, 15.88 0 1, 0 31.76, 0
          a 15.88, 15.88 0 1, 0 -31.76, 0"
            fill={`${fillColor}`}
          />
          <Path
            d="M 175.39 116.75
          m -15.88, 0
          a 15.88, 15.88 0 1, 0 31.76, 0
          a 15.88, 15.88 0 1, 0 -31.76, 0"
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
          inbox
        </Text>
      )}
    </>
  );
};
